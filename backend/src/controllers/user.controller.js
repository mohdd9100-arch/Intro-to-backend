import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body ?? {};

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedEmail = email.toLowerCase();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const user = await User.create({
      username,
      email: normalizedEmail,
      password,
    });
    return res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "User already exists!" });
    }
    return res.status(500).json({
      message: "Internal Server error",
      error: error.message,
    });
  }
};

const loginUser = async( req,res) =>{
  try{

    //checking if the user already exists
    const {email,password} = req.body;

    const user = await User.findOne({
      email: email.toLowerCase()
    });
    
    if(!user) return res.status(400).json({
      message:"User not found"
    });

    //compare passwords 
    const isMatch =await user.comparePassword(password);
    if(!isMatch) return res.status(400).json({
      message: "Invalid credentials"
    })

    res.status(200).json({
      message: "User Logged in",
      user : {
        id : user._id,
        email : user.email,
        username :user.username
      }
    })

  } catch(error) {

    res.status(500).json({
      message : "Internal Server Error"
    })

  }
}

const logoutuser = async (req,res) =>{
  try {
     const { email } = req.body ?? {};

     const user =await User.findOne({
      email
     });

     if(!user) return res.status(404).json({
      message : "User not found"
     });

     res.status(200).json({
      message: "Logout successful"
     });

  } catch (error) {
    res.status(500).json({
      messsage :"Internal Server Error",error
    });
  }
}

export{ registerUser, loginUser, logoutuser
};
