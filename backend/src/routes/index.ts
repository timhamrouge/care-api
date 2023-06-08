import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("hello tim");
});

export default router;
