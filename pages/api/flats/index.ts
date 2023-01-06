import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { FlatType, ResponseFuncs } from "../../../utils/types"
import  Flat from "../../../models/Flat"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error })

  // Potential Responses
  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req: NextApiRequest, res: NextApiResponse<FlatType[] | void>) => {
      await connect() // connect to database
      res.json(await Flat.find({}).catch(catcher))
    },
    // RESPONSE POST REQUESTS
    POST: async (req: NextApiRequest, res: NextApiResponse<FlatType>) => {
      await connect() // connect to database
      res.json(await Flat.create(req.body).catch(catcher))
    },
  }

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method]
  if (response) response(req, res)
  else res.status(400).json({ error: "No Response for This Request" })
}

export default handler

export const config = {
    api: {
      externalResolver: true,
    },
  }