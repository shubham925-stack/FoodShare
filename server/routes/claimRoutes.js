const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    createClaim,
    getRestaurantClaims,
    getNGOClaims,
    acceptClaim,
    rejectClaim,
} = require("../controllers/claimController");
router.post(
    "/:id",
    authMiddleware,
    roleMiddleware("NGO"),
    createClaim
);
router.get(
    "/restaurant",
    authMiddleware,
    roleMiddleware("Restaurant"),
    getRestaurantClaims
);
router.get(
    "/ngo",
    authMiddleware,
    roleMiddleware("NGO"),
    getNGOClaims
);
router.patch(
    "/:id/accept",
    authMiddleware,
    roleMiddleware("Restaurant"),
    acceptClaim
);
router.patch(
    "/:id/reject",
    authMiddleware,
    roleMiddleware("Restaurant"),
    rejectClaim
);

module.exports = router;