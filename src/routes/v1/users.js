import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    return res.json({ message: "Users route" });
});

export default router;