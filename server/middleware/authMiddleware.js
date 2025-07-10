import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const JWT_SECRET = process.env.JWT_SECRET; // 🔥 Move this here!

  if (!JWT_SECRET) {
    console.error("JWT_SECRET not defined in middleware");
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { userId, role }
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
