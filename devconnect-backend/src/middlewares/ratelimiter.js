import ratelimit from "express-rate-limit";

export const loginLimiter = ratelimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: {
        message: "Too many login attempts from this IP, please try again after 15 minutes",
    }
});

export const signupLimiter = ratelimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // limit each IP to 10 requests per windowMs
    message: {
        message: "Too many signup attempts from this IP, please try again after an hour",
    }
})