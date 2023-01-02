// import dbConnect from "../../../lib/dbConnect"
import { connect } from "../../../utils/connection"
import User from "../../../models/User"
import {hash} from 'bcryptjs'

export default async function handler(req, res){
    await connect()
    const { method } = req

    if(method === 'POST'){

        if(!req.body) return res.status(404).json({success: false, error: 'Does not have form data'})
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(422).json({success: false, message: 'Korisnik vec postoji'});

        User.create({username, email, password: await hash(password, 12)}, function(err, data){
            if(err) return res.status(404).json({ err });
            return res.status(201).json({status: true, user: data, success: true})
        })
    } else {
        res.status(500).json({ success: false, message: 'HTTP method not valid, only POST accepted' })
    }
}