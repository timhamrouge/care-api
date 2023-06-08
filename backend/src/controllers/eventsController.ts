import { Request, Response } from "express";
import Event from "../models/event";
import Caregiver from "../models/caregiver";
import { Op } from "sequelize";

const eventController = {
  getAllObservationEventsByCareRecipientId: async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      const queryResult = await Event.findAndCountAll({
        where: {
          care_recipient_id: req.params.care_recipient_id,
          event_type: {
            [Op.like]: "%observation%",
            [Op.not]: "no_medication_observation_received",
          },
        },
        order: [["timestamp", "DESC"]],
        include: [
          {
            model: Caregiver,
            attributes: ["id", "first_name", "last_name"],
            required: false,
          },
        ],
      });

      // implement pagination

      return res.status(200).send({
        total: queryResult.count,
        observations: queryResult.rows,
      });
    } catch (err: any) {
      res.status(500).send();
    }
  },
};

export default eventController;
