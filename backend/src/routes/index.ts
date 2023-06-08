import express from "express";

const router = express.Router();

import careRecipientsController from "../controllers/careRecipientsController";
import eventsController from "../controllers/eventsController";

router.get("/care-recipients", careRecipientsController.findAll);

router.get(
  "/care-recipients/:care_recipient_id",
  careRecipientsController.findOneById
);

// not a RESTful route name but everything we're querying is coming from the
// events table so just trying to make the routes make sense in terms of naming
// them after what they're returning
router.get(
  "/observations/:care_recipient_id",
  eventsController.getAllObservationEventsByCareRecipientId
);

export default router;
