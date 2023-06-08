import express from "express";

const router = express.Router();

import careRecipientsController from "../controllers/careRecipientsController";
import eventsController from "../controllers/eventsController";

router.get("/care-recipients", careRecipientsController.findAll);

router.get(
  "/care-recipients/:care_recipient_id",
  careRecipientsController.findOneById
);

router.get(
  "/events/:care_recipient_id",
  eventsController.getAllObservationEventsByCareRecipientId
);

export default router;
