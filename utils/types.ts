import { formToJSON } from 'axios'
import mongoose from 'mongoose'


// Interface to defining our object of response functions
export interface ResponseFuncs {
  GET?: Function
  POST?: Function
  PUT?: Function
  DELETE?: Function
}

// Interface to define our Todo model on the frontend
export interface TodoType {
  _id?: number
  item: string
  completed: boolean
}


export interface AptType {
  price: number,
  price_by_surface?: number,
  image?: string,
  subtitle_places?: string[],
  features?: string[],
  sq_mt: number,
  floor?: number,
  rooms: number,
  short_description: string,
  title: string,
  date?: string,
  lat: number,
  long: number,
  _id?: mongoose.Types.ObjectId,
}

export interface FlatType {
  author?: mongoose.Types.ObjectId,
  _id?: mongoose.Types.ObjectId,
  location: string,
  value?: number,
  image?: string,
  sq_mt: number,
  rooms: number,
  floor: number,
  short_description: string,
  title: string,
  date?: string,
  geometry?: {
    coordinates: number[]
  }
}

export interface UserType {
  username: string,
  email: string,
  password: string,
  _id?: mongoose.Schema.Types.ObjectId,
}

export interface Session {
  expires: string,
  user: {
    email: string,
    image: string,
    name: string,
    _id: string
  }
}


// forms 

export interface AptFormErrors {
  title? : string,
  price? : string,
  short_description?:string,
  sq_mt?: string,
  rooms?: string,
  floor?: string,
  lat?: string,
  long?: string
}

export interface FlatFormErrors {
  title? : string,
  location? : string,
  short_description?:string,
  sq_mt?: string,
  rooms?: string,
  floor?: string
}

