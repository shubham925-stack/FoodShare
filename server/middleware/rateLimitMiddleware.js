const rateLimit = require("express-rate-limit");

// Global API Limiter
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: "Too many requests. Please try again after 15 minutes."
    }
});

// Login Limiter
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: "Too many login attempts. Please try again after 15 minutes."
    }
});

// Register Limiter
const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: "Too many registrations. Please try again later."
    }
});

// Donation Limiter
const donationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: "Donation limit exceeded. Please try again later."
    }
});

// Claim Limiter
const claimLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: "Too many claim requests. Please try again later."
    }
});

module.exports = {
    globalLimiter,
    loginLimiter,
    registerLimiter,
    donationLimiter,
    claimLimiter
};