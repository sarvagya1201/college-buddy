import  prisma  from "../models/prismaClient.js";

// GET /api/courses?dept=ECE&courseType=Open Elective
export const getAllCourses = async (req, res) => {
  try {
    const { dept, courseType, offeredIn } = req.query;

    const courses = await prisma.course.findMany({
      where: {
        AND: [
          dept ? { department: { code: dept } } : {},
          courseType ? { courseType } : {},
          offeredIn ? { offeredIn: { has: offeredIn } } : {}
        ],
      },
      include: {
        department: true,
        professor: true,
        reviews: true,
      },
    });

    const formatted = courses.map(course => {
      const reviewCount = course.reviews.length;
      const avgRatings = reviewCount
        ? {
            material: average(course.reviews.map(r => r.materialRating)),
            grading: average(course.reviews.map(r => r.gradingRating)),
            attendance: average(course.reviews.map(r => r.attendanceRating)),
            prof: average(course.reviews.map(r => r.profRating)),
            overall: average(course.reviews.map(r => r.overallRating)),
          }
        : null;

      return {
        ...course,
        ratings: avgRatings,
        reviewCount,
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching courses" });
  }
};

// GET /api/courses/:id
export const getCourseById = async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: req.params.id },
      include: {
        department: true,
        professor: true,
        reviews: {
          include: { user: true },
        },
      },
    });
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Error getting course" });
  }
};

// POST /api/courses
export const createCourse = async (req, res) => {
  try {
    const {
      name,
      code,
      departmentCode,
      professorEmail,
      courseType,
      offeredIn,
    } = req.body;

    const department = await prisma.department.findUnique({
      where: { code: departmentCode },
    });
    if (!department) return res.status(404).json({ error: "Dept not found" });

    const professor = await prisma.professor.findUnique({
      where: { email: professorEmail },
    });
    if (!professor) return res.status(404).json({ error: "Prof not found" });

    const course = await prisma.course.create({
      data: {
        name,
        code,
        courseType,
        offeredIn,
        departmentId: department.id,
        professorId: professor.id,
      },
    });

    res.status(201).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating course" });
  }
};

// helper
const average = (nums) =>
  nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
export const getCourseDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        department: true,
        professor: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Calculate average ratings
    const total = course.reviews.length;
    let sumMaterial = 0,
        sumGrading = 0,
        sumAttendance = 0,
        sumProf = 0;

    course.reviews.forEach((rev) => {
      sumMaterial += rev.materialRating;
      sumGrading += rev.gradingRating;
      sumAttendance += rev.attendanceRating;
      sumProf += rev.profRating;
    });

    const averageRatings = total
      ? {
          materialRating: +(sumMaterial / total).toFixed(2),
          gradingRating: +(sumGrading / total).toFixed(2),
          attendanceRating: +(sumAttendance / total).toFixed(2),
          profRating: +(sumProf / total).toFixed(2),
          overall: +(
            (sumMaterial + sumGrading + sumAttendance + sumProf) /
            (4 * total)
          ).toFixed(2),
        }
      : null;

    res.status(200).json({
      ...course,
      averageRatings,
    });
  } catch (err) {
    console.error("Error fetching course:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};