import connectToDatabase from "../../../config/database";
import User from "../../../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  await connectToDatabase();

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, {
    expiresIn: '2h',
  });
  
 
  res.status(200).json({ token });
}
