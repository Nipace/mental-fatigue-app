// routes/fatigueRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json({
      fatigueLimit: user.fatigueLimit,
      studySessions: user.studySessions,
      breakTime: user.breakTime,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id/limit", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { fatigueLimit: req.body.fatigueLimit },
      { new: true }
    );
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
