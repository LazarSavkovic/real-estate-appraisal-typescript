import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { ResponseFuncs, FlatType } from "../../../utils/types"
import Flat from "../../../models/Flat"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error })

  // GRAB ID FROM req.query (where next stores params)
  const {
    query: { id, userid },
  } = req

  // Potential Responses for /todos/:id
  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        await connect() // connect to database
        const flat = await Flat.findOne({_id: id, author: userid})
        if (!flat) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json(flat)
      } catch (error) {
        if (error instanceof Error) {
        res.status(400).send(error.message)
        }
      }
    },
    // RESPONSE PUT REQUESTS
    PUT: async (req: NextApiRequest, res: NextApiResponse) => {
      
      try {
        await connect() // connect to database
        const flat = await Flat.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!flat) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json(flat)
      } catch (error) {
        if (error instanceof Error) {
        res.status(400).send(error.message)
        }
      }
    },
    // RESPONSE FOR DELETE REQUESTS
    DELETE: async (req: NextApiRequest, res: NextApiResponse<FlatType>) => {
      await connect() // connect to database
      res.json(await Flat.findByIdAndRemove(id).catch(catcher))
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