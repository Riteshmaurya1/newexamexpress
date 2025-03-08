import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(200).json({
        success: false,
        message: "Please Create an account first.",
      });
    }
    

    return res.status(200).json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        isAccountVerified: user.isAccountVerified,// <---
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user data",
    });
  }
};
