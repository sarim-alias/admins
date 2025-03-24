import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

// Signup.
export const signup = async (req, res) => {
    try {
      const { username, email, password, gender, termsAccepted } = req.body;
  
      if (!termsAccepted) {
        return res.status(400).json({ message: "You must accept the terms and conditions" });
      }
  
      const user = await User.findOne({username});
  
      if (user) {
        return res.status(400).json({error:"Username already exists"})
      }
  
      // Hash Password.
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // https://avatar-placeholder.iran.liara.run/
      const boyProfilePic  = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
  
      // Create user.
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        termsAccepted
      });
      await newUser.save();
      res.status(201).json({ message: "Signup successful! Please log in to continue." });

    } catch (error) {
      console.log("Error in signup controller", error.message);
      res.status(500).json({error:"Internal server error"});
    }
};

// Login.
export const login =  async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user by email.
      const user = await User.findOne({email});
      if (!user) {
        return res.status(400).json({ error: "User not found. Please sign up." });
      }

      // Check password.
      const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
      if (!isPasswordCorrect) {
        return res.status(400).json({error: "Invalid email or password"});
      }
  
      generateTokenAndSetCookie(user._id, res);
  
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
        gender: user.gender,
        profilePic: user.profilePic
      }); 
    } catch (error) {
      console.log("Error in login controller", error.message);
      res.status(500).json({error:"Internal server error"});
    }
};

export const logout = (req, res) => {
    try {
      res.cookie("jwt","", {maxAge:0});
      res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
      console.log("Error in logout controller", error.message);
      res.status(500).json({error:"Internal server error"});
    }
};