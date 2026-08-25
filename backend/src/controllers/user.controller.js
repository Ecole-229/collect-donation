const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
      const { name, email, password } = req.body;

      console.log("verify 1");

      const exsitingUser = await User.findOne({ email });

      if(exsitingUser) {
        return res.status(400).json({ message: "Email already used !"});
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({message: "User registered successfully!", user: newUser, userId: newUser._id});
    
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error!"})
    }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exsitingUser = await User.findOne({ email });

    if (!exsitingUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (!exsitingUser.status) {
      return res.status(403).json({ message: "User is disabled!"});
    }

    const isPasswordMatch = await bcrypt.compare(password, exsitingUser.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Identifiant invalid!"})
    }

    const token = jwt.sign(
      { id: exsitingUser._id,
        role: exsitingUser.role
      },
      process.env.JWT_SECRET,
      { 
        expiresIn: '24h'
      }
    )

    res.status(200).json({message: "Login successfully!", token, user: { 
      id: exsitingUser._id,
      role: exsitingUser.role,
      name: exsitingUser.name
    }});

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error!"})
    }
}

exports.displayAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({users});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Internal server error!"})
  }
}