import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({
        success: false,
        message: "Not a authorized user login again",
      });
    }

    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = decoded_token.id;

    next();
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

export default authMiddleware;
