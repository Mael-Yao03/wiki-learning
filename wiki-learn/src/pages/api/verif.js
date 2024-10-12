import connectToDatabase from "../../../config/database";
import User from "../../../models/user";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    await connectToDatabase();

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
