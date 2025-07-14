import supabase from "../utils/storageClient.js";
import prisma from "../models/prismaClient.js";
import { v4 as uuidv4 } from "uuid";
import XLSX from "xlsx";

// -------------------------------------
// 📄 Upload Notes (for students)
// -------------------------------------
export const uploadNote = async (req, res) => {
  try {
    const file = req.file;
    const { title, courseId } = req.body;

    if (!file || !title || !courseId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const fileName = `${uuidv4()}_${file.originalname}`;
    const { error } = await supabase.storage
      .from("notes")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return res.status(500).json({ error: "Upload failed" });
    }

    const fileUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/notes/${fileName}`;

    const note = await prisma.note.create({
      data: {
        title,
        fileUrl,
        uploadedBy: { connect: { id: req.user.userId } },
        course: { connect: { id: courseId } },
      },
    });

    res.status(201).json({ message: "Note uploaded successfully", note });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// -------------------------------------
// 📊 Upload Admin Excel (Departments, Courses, Professors)
// -------------------------------------

export const uploadDataFromExcel = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ error: "Only admin can upload data" });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const workbook = XLSX.read(file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawRows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    for (const row of rawRows) {
      const instructorName = row["Instructor name"]?.trim();
      const professorEmail = row["Professor Email"]?.trim().toLowerCase();
      const courseCode = row["Course Code"]?.trim();
      const courseName = row["Course Name"]?.trim();
      const departmentName = row["Department Name"]?.trim();
      const departmentCode = row["Department"]?.trim();

      // Skip incomplete rows
      if (!instructorName || !professorEmail || !courseCode || !courseName || !departmentName || !departmentCode) {
        console.warn("⚠️ Skipping incomplete row:", row);
        continue;
      }

      // 1. Upsert Department
// First check: Does any department exist with this name OR code?
let department = await prisma.department.findFirst({
  where: {
    OR: [
      { name: departmentName },
      { code: departmentCode.toLowerCase() }
    ]
  }
});

if (department) {
  // Optional: update name or code if needed (e.g., normalization)
  department = await prisma.department.update({
    where: { id: department.id },
    data: {
      name: departmentName,
      code: departmentCode.toLowerCase()
    }
  });
} else {
  // Safe to create since both are unique
  department = await prisma.department.create({
    data: {
      name: departmentName,
      code: departmentCode.toLowerCase()
    }
  });
}


      // 2. Upsert Professor
      const professor = await prisma.professor.upsert({
        where: { email: professorEmail },
        update: {},
        create: {
          name: instructorName,
          email: professorEmail,
          departmentId: department.id,
        },
      });

      // 3. Upsert Course
      await prisma.course.upsert({
        where: { code: courseCode },
        update: {},
        create: {
          name: courseName,
          code: courseCode,
          courseType: "OE", // default since not provided in Excel
          offeredIn: ["monsoon"], // default fallback
          departmentId: department.id,
          professorId: professor.id,
        },
      });
    }

    res.status(200).json({ message: "✅ Data uploaded successfully!" });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};