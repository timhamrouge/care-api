import { Request, Response } from "express";
import CareRecipient from "../models/careRecipient";

const careRecipientsController = {
  findAll: async (_req: Request, res: Response): Promise<Response | void> => {
    try {
      const careRecipients = await CareRecipient.findAll();
      return res.status(200).send({
        data: careRecipients,
      });
    } catch (err: any) {
      res.status(500).send();
    }
  },
  findOneById: async (
    _req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      const careRecipient = await CareRecipient.findOne();
      return res.status(200).send({
        data: careRecipient,
      });
    } catch (err: any) {
      res.status(500).send();
    }
  },
};

export default careRecipientsController;
