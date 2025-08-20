import rateLimit from "express-rate-limit";

export const deviceRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
  keyGenerator: (req) => req.user?.id || req.ip,
});
