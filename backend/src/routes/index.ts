import express from "express";

const router = express.Router();

import careRecipientsController from "../controllers/careRecipientsController";

router.get("/care-recipients", careRecipientsController.findAll);

router.get(
  "/care-recipients/:care_recipient_id",
  careRecipientsController.findOneById
);

export default router;
