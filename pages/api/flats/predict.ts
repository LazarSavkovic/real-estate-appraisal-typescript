import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { FlatType, ResponseFuncs } from "../../../utils/types"
import Flat from "../../../models/Flat"
import mongoose from "mongoose"
import getPriceForFlat from '../../../utils/neural_network/predict_prices'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error })

  // Potential Responses
  const handleCase: ResponseFuncs = {
 
    // RESPONSE POST REQUESTS
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      console.log('predicting')
      await connect() // connect to database
      try {
        const fullLocation = req.body.location + ", Beograd, Srbija";
        const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

        console.log('here we are')
        const geocodingRequestUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${fullLocation}.json?limit=1&access_token=${mapboxToken}`
        const response = await fetch(geocodingRequestUrl)
        const geoData = await response.json()
// console.log('geodata is ' + geoData)
        const flat = new Flat(req.body);
        // console.log('flat is ' + flat)
        flat.geometry = geoData.features[0].geometry;
        // console.log('flat is ' + flat)
        flat.value = Math.round(getPriceForFlat(flat));
        console.log('flat is ' + flat)

        res.status(201).json(flat)
      } catch (error) {
        if(error instanceof Error) {
        res.status(400).send(error.message)
        }
      }
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