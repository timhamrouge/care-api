import { Request, Response } from "express";
import Event from "../models/event";
import Caregiver from "../models/caregiver";
import { Op } from "sequelize";

const eventsController = {
  // doing it this way will only allow us to view observations for the 2
  // care recipients that we have a record of in that table. there are events
  // with a 3rd unique care recipient id in the table but we have no way of
  // passing it to the front end to query the events table with unless we get
  // really hacky
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

      const { page = 1, perPage = 5 } = req.query;
      const offset = (+page - 1) * +perPage;

      return res.status(200).send({
        total: queryResult.count,
        observations: queryResult.rows.slice(offset, offset + +perPage),
        pages: Math.ceil(queryResult.rows.length / +perPage),
      });
    } catch (err: any) {
      res.status(500).send();
    }
  },
};

export default eventsController;
