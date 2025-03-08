import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(201).json({
      success: false,
      message: "Please login to access this resource",
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid token, please login again",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Please login to access this resource",
    });
  }
};


export default userAuth;