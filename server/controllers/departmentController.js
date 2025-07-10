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
export const getAllDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany();
    res.json(departments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching departments" });
  }
};

