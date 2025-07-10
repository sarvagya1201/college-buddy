import supabase from "../utils/storageClient.js";
import prisma from "../models/prismaClient.js";
import { v4 as uuidv4 } from "uuid";

export const uploadNote = async (req, res) => {
  try {
    const file = req.file;
    const { title, courseId } = req.body;

    // Only required fields
    if (!file || !title || !courseId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Upload to Supabase
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

    // Save to DB (only valid fields)
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
