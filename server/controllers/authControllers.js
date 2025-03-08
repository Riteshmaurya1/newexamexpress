import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemialer.js";
import SubjectModel from "../models/subjectModel.js";

// Register code is here
export const register = async (req, res) => {
  // Check if user already exists
  const { name, email, password, cityName, collageName } = req.body;

  // checking the user is correctlly enter all
  //field or not if not then if condition is showing the error
  if (!name || !email || !password) {
    return res.status(200).json({
      success: false,
      message: "Please fill in all fields",
    });
  }

  try {
    // Find user is exiting or not by using find one method in mongoose
    const existingUser = await userModel.findOne({ email });

    // For checking if user is Already exists..
    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "User Already Exists",
      });
    }
    // Convert password in to hashed password.
    const hashedPassword = await bcrypt.hash(password, 10);

    // For a new User Creation's
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      cityName,
      collageName,
    });
    await user.save();

    // it is process to genrates code.
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    }); // 7 days

    // making cookies for the user which is redirect to the his account.
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    // Sending welcome email to the user
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to ExamExpres 🎉 - Your Ultimate Study Resource",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h1 style="color: #2B3499; text-align: center; margin-bottom: 30px;">Welcome to ExamExpres! 🎉</h1>
  
        <p>Dear ${name},</p>
  
        <p>We are thrilled to have you on board our platform, where your academic success is our top priority. At ExamExpress, we strive to provide you with the best resources to help you excel in your studies.</p>
  
        <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h3 style="color: #2B3499; margin-top: 0;">Here's what you can expect from ExamExpress:</h3>
          <ol style="margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 10px;"><strong>Access to Previous Exam Papers:</strong><br>
            Practice with a wide range of past exam papers to sharpen your skills.</li>
            
            <li style="margin-bottom: 10px;"><strong>Comprehensive Lectures and Documentation:</strong><br>
            Explore detailed lectures and subject documentation to deepen your understanding.</li>
            
            <li style="margin-bottom: 10px;"><strong>User-Friendly Interface:</strong><br>
            Easily navigate through our platform to find the resources you need.</li>
            
            <li><strong>Regular Updates:</strong><br>
            Stay ahead with our regularly updated content to ensure you have the most relevant information.</li>
          </ol>
        </div>
  
        <h3 style="color: #2B3499; margin-bottom: 15px;">Getting Started:</h3>
        <ol style="margin: 0; padding-left: 20px;">
          <li style="margin-bottom: 10px;"><strong>Log In:</strong><br>
          Use your credentials to log in to your ExamExpress account.</li>
          
          <li style="margin-bottom: 10px;"><strong>Explore:</strong><br>
          Browse through our extensive archive of exam papers and lectures.</li>
          
          <li><strong>Engage:</strong><br>
          Join our community, ask questions, and share your knowledge with fellow students.</li>
        </ol>
  
        <!-- Login Button -->
        <div style="text-align: center; margin: 25px 0;">
          <a href="https://www.examexpress.com/login" style="background-color: #2B3499; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">
            Log In to ExamExpress
          </a>
        </div>
  
        <p style="margin: 25px 0;">We are committed to helping you achieve your academic goals and are here to support you every step of the way. If you have any questions or need assistance, please do not hesitate to contact our support team at <a href="mailto:examexpres@gmail.com" style="color: #2B3499; text-decoration: none;">examexpres@gmail.com</a>.</p>
  
        <p>Once again, welcome to ExamExpres! Let's embark on this journey towards academic excellence together.</p>
  
        <div style="border-top: 1px solid #e0e0e0; margin-top: 30px; padding-top: 20px;">
          <p style="margin: 0;">Best Regards,<br>
          <strong>The ExamExpres Team</strong></p>
        </div>
      </div>
    `,
    };
    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      success: true,
      message: "Successfully created...",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// this is login form....
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter both email and password",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please create an account.",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid password.",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Enable for the localhost host render
    // Set the token cookie
    // res.cookie("token", token, {
    //   httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    //   secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
    //   sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // Allow cross-site cookies in production
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    // });

    // Enable for the web host at render
    res.cookie("token", token, {
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
      secure: true, // Required for HTTPS
      sameSite: "none", // Required for cross-origin requests
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });
    return res.status(200).json({
      success: true,
      message: "Successfully logged in.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// logout code is here......
export const logout = async (req, res) => {
  try {
    // CLearing cookies & token from the browser
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.status(200).json({
      success: true,
      message: "Successfuly logout...",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify otp via email which is send on the registered email.
export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);

    if (user.isAccountVerified) {
      return res.status(400).json({
        success: false,
        message: "Your account is already verified.",
      });
    }
    // Generate OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 2 * 60 * 1000; // 5 minutes from now
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verify Your Email",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #4CAF50; text-align: center;">Verify Your Email Address</h2>
          <p>Hello,</p>
          <p>Thank you for signing up! To complete your registration, please verify your email address by entering the OTP (One-Time Password) below:</p>
          
          <div style="background: #f4f4f4; padding: 10px; border-radius: 5px; text-align: center; margin: 20px 0;">
            <h3 style="margin: 0; font-size: 24px; color: #4CAF50;">${otp}</h3>
          </div>
    
          <p>This OTP is valid for <strong>2 minutes</strong>. If you did not request this, please ignore this email.</p>
          
          <p>For security reasons, do not share this OTP with anyone. If you have any questions or need assistance, feel free to contact our support team at <a href="mailto:examexpres@gmail.com">examexpres@gmail.com</a>.</p>
          
          <p>Best regards,<br>ExamExpres</p>
          
          <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <p style="text-align: center; font-size: 12px; color: #777;">
            This is an automated message. Please do not reply directly to this email.
          </p>
        </div>
      `,
    };
    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      success: true,
      message: "OTP sent successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// verify otp at website
export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.status(400).json({
      success: false,
      message: "Missing Details..",
    });
  }
  try {
    const user = await userModel.findById(userId);

    // If user not found
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "User not found.",
      });
    }

    // If OTP is not send, return error
    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is invalid.",
      });
    }

    // If otp is expired then this code is executed
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP is Expired.",
      });
    }

    // updating the database data
    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    // sending response to user email is verified
    return res.status(200).json({
      success: true,
      message: "Account verified successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// user Authenticated or not
export const isAuthenticated = async (req, res) => {
  try {
    return res.status(201).json({
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Password reset otp
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required.",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }
    // Generate OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 5 * 60 * 1000; // 5 minutes from now
    await user.save();

    // Send OTP via email and verify your otp
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP for reseting your password is ${otp}.
       Please use this OTP to proceed with reseting your password.`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      success: true,
      message: "OTP sent to your email.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Reset User Password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  // Provied email and OTP are required for updating new password
  if (!email || !otp || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Email, OTP and new password are required.",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }
    // Check if OTP has expired
    if (user.resetOtpExpireAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    // for valid OTP, update the user password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();

    return res.status(201).json({
      success: true,
      message: "Password has been reset successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/********************************** For Subject : 1 **********************************/
export const createSubjectData = async (req, res) => {
  const {
    branch,
    semester,
    subjectName,
    unitNumber,
    unitName,
    unitNotes,
    unitQuestions,
    VideoLink,
  } = req.body;
  // Check if required fields are present
  if (!branch || !semester || !subjectName) {
    return res.status(200).json({ error: "Data is not found." });
  }
  // Convert subjectName to lowercase
  const lowercaseSubjectName = subjectName.toLowerCase();
  const lowercaseBranch = branch.toLowerCase();
  const lowercaseunitName = unitName.toLowerCase();
  // Check if the subject already exists (case-insensitive)
  const existingSubject = await SubjectModel.findOne({
    unitNumber,
    unitName: lowercaseunitName,
  });
  if (existingSubject) {
    return res.status(200).json({ error: "Subject already exists." });
  }
  // Create a new subject with lowercase subjectName
  const subject = new SubjectModel({
    branch: lowercaseBranch,
    semester,
    subjectName: lowercaseSubjectName, // Save in lowercase
    unitNumber,
    unitName: lowercaseunitName,
    unitNotes,
    unitQuestions,
    VideoLink,
  });
  try {
    await subject.save();
    res.status(201).json({ message: "Subject created successfully", subject });
  } catch (error) {
    res.status(400).json({ error: "Error creating subject: " + error.message });
  }
};

// User Data for the Dashboard Users Access
export const usersDashboard = async (req, res) => {
  try {
    const users = await userModel.find(); // Fetch all users

    if (!users || users.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No Users Found",
      });
    }

    // Map through users and return necessary data
    const userData = users.map((user) => ({
      name: user.name,
      email: user.email,
      cityName: user.cityName, // Access cityName from the user object
      collageName: user.collageName, // Access collageName from the user object
      isAccountVerified: user.isAccountVerified,
      _id: user._id,
    }));

    return res.status(200).json({
      success: true,
      userData, // Return array of user data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user data",
    });
  }
};

// Delete a specific user by ID
export const deleteUsers = async (req, res) => {
  try {
    const { email } = req.params;

    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete the user
    await userModel.deleteOne({ email });

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting user",
    });
  }
};

// Export the dashboardData function
export const dashboardData = async (req, res) => {
  const dashboardData = {
    success: true,
    totalSubjects: 22,
    totalUsers: 150,
    timeSpent: "45 Hour",
    pageViews: 784,
  };
  res.json(dashboardData);
};

// Upadting Subject Data
export const updateSubject = async (req, res) => {
  const { id } = req.params; // Get subject ID from URL params

  const {
    subjectName,
    unitNumber,
    unitName,
    unitNotes,
    unitQuestions,
    VideoLink,
  } = req.body; // Get updated fields from request body

  try {
    // Find the subject by ID
    const subject = await SubjectModel.findById(id);

    // If subject not found, return an error
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    // Update the subject fields
    if (subjectName) subject.subjectName = subjectName;
    if (unitNumber) subject.unitNumber = unitNumber;
    if (unitName) subject.unitName = unitName;
    if (unitNotes) subject.unitNotes = unitNotes;
    if (unitQuestions) subject.unitQuestions = unitQuestions;
    if (VideoLink) subject.VideoLink = VideoLink;

    // Save the updated subject
    await subject.save();

    res.status(200).json({
      success: true,
      message: "Subject updated successfully",
      data: subject, // Return the updated subject
    });
  } catch (error) {
    console.error("Error updating subject:", error);
    res.status(500).json({
      success: false,
      message: "Error updating subject",
      error: error.message,
    });
  }
};

//  For deleteing subject data from the frontend
export const deleteSubject = async (req, res) => {
  const { id } = req.params;
  try {
    const subject = await SubjectModel.findById(id);
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }
    await SubjectModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting subject:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting subject",
      error: error.message,
    });
  }
};
