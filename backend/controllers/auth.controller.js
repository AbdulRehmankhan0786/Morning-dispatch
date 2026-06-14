import bcryptjs from "bcryptjs"
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"

// ================= SIGNUP =================

export const signup = async (req, res) => {

  try {

    const { username, email, password } = req.body

    // CHECK EMPTY FIELDS

    if (!username || !email || !password) {

      return res.status(400).json({
        message: "All fields are required",
      })

    }

    // CHECK EXISTING USER

    const existingUser =
      await User.findOne({ email })

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists",
      })

    }

    // HASH PASSWORD

    const hashedPassword =
      bcryptjs.hashSync(password, 10)

    // CREATE USER

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })

    // SAVE USER

    await newUser.save()

    res.status(201).json({
      success: true,
      message: "Signup successful",
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }

}

// ================= SIGNIN =================

export const signin = async (req, res) => {

  try {

    const { email, password } = req.body

    if (!email || !password) {

      return res.status(400).json({
        message: "All fields are required",
      })

    }

    const validUser =
      await User.findOne({ email })

    if (!validUser) {

      return res.status(404).json({
        message: "User not found",
      })

    }

    const validPassword =
      bcryptjs.compareSync(
        password,
        validUser.password
      )

    if (!validPassword) {

      return res.status(400).json({
        message: "Wrong credentials",
      })

    }

    // JWT TOKEN

    const token = jwt.sign(
      {
        id: validUser._id,
        isAdmin: validUser.isAdmin,
      },

      process.env.JWT_SECRET || "secretkey"
    )

    // REMOVE PASSWORD

    const { password: pass, ...rest } =
      validUser._doc

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "lax",
      })
      .json(rest)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: error.message,
    })

  }

}

// ================= GOOGLE LOGIN =================

export const google = async (req, res) => {

  try {

    const {
      email,
      name,
      profilePhotoUrl,
    } = req.body

    const user =
      await User.findOne({ email })

    // EXISTING USER

    if (user) {

      const token = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },

        process.env.JWT_SECRET || "secretkey"
      )

      const { password, ...rest } =
        user._doc

      return res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          sameSite: "lax",
        })
        .json(rest)

    }

    // NEW USER

    const generatedPassword =
      Math.random().toString(36).slice(-8)

    const hashedPassword =
      bcryptjs.hashSync(
        generatedPassword,
        10
      )

    const newUser = new User({

      username:
        name.toLowerCase().split(" ").join("") +
        Math.random().toString(9).slice(-4),

      email,

      password: hashedPassword,

      profilePicture: profilePhotoUrl,

    })

    await newUser.save()

    const token = jwt.sign(
      {
        id: newUser._id,
        isAdmin: newUser.isAdmin,
      },

      process.env.JWT_SECRET || "secretkey"
    )

    const { password, ...rest } =
      newUser._doc

    return res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "lax",
      })
      .json(rest)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: error.message,
    })

  }

}