import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, 
		httpOnly: false, 
		sameSite: "strict",
		secure: process.env.NODE_ENV !== "development",
	});
	return token;
};

export default generateTokenAndSetCookie;