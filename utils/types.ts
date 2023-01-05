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
  price: Number,
  price_by_surface?: Number,
  image?: String,
  subtitle_places?: String[],
  features?: String[],
  sq_mt: Number,
  floor: Number,
  rooms: Number,
  short_description: String,
  title: String,
  date?: String,
  lat: Number,
  long: Number,
}

export interface FlatType {
  author: mongoose.Schema.Types.ObjectId,
  location: String,
  value?: Number,
  image?: String,
  sq_mt: Number,
  rooms: Number,
  floor: Number,
  short_description: String,
  title: String,
  date?: String,
  geometry: {
    coordinates: Number[]
  }
}

export interface UserType {
  username: String,
  email: String,
  password: String
}