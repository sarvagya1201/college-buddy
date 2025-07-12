// controllers/departmentController.js
import prisma from "../models/prismaClient.js";

export const createDepartment = async (req, res) => {
  const { code, name } = req.body;

  try {
    const existing = await prisma.department.findUnique({ where: { code } });
    if (existing) {
      return res.status(400).json({ error: "Department code already exists" });
    }

    const dept = await prisma.department.create({
      data: { code, name },
    });

    res.status(201).json(dept);
  } catch (err) {
    console.error("Error creating department:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
// UPDATE department
export const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name, code } = req.body;

  try {
    const updated = await prisma.department.update({
      where: { id },
      data: { name, code },
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating department" });
  }
};
// DELETE department
export const deleteDepartment = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.department.delete({ where: { id } });
    res.json({ message: "Department deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting department" });
  }
};
export const getAllDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany();
    res.json(departments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching departments" });
  }
};
// GET /api/departments/:code/courses
export const getCoursesByDepartmentCode = async (req, res) => {
  const { code } = req.params;

  try {
    const department = await prisma.department.findUnique({
      where: { code },
    });

    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    const courses = await prisma.course.findMany({
      where: { departmentId: department.id },
      select: {
        id: true,
        name: true,
        code: true,
      },
    });

    res.json(courses);
  } catch (err) {
    console.error("Error fetching courses by department code:", err);
    res.status(500).json({ error: "Error fetching courses" });
  }
};


