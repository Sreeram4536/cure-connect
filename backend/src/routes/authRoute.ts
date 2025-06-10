import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authRouter = express.Router();

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
   async (req, res) => {
    try {
        const user = req.user as any;
  
        // Check if the user is blocked
        if (user.isBlocked) {
          return res.redirect(
            `${process.env.GOOGLE_REDIRECT_URL}?error=blocked`
          );
        }
  
        // Generate JWT token
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET!,
          { expiresIn: "1d" }
        );
  
        // Redirect to the frontend with the token
        res.redirect(`${process.env.GOOGLE_REDIRECT_URL}?token=${token}`);
      } catch (error) {
        console.error("Error in Google callback:", error);
        res.redirect(`${process.env.GOOGLE_REDIRECT_URL}?error=server_error`);
      }
  }
);

export default authRouter;