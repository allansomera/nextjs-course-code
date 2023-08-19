import dbConnect from "@lib/utils/dbConfig";
import Event from "../../../models/eventsModel";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addTest(req, res) {
  try {
    console.log("CONNECTING TO MONGO");
    await dbConnect();
    console.log("CONNECTED TO MONGO");

    console.log("CREATING DOCUMENT");
    const event = await Event.create(req.body);
    console.log("CREATED DOCUMENT");

    res.json({ event });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
