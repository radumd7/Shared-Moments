import { NextApiRequest, NextApiResponse } from "next";
//@ts-ignore
import clientPromise from "../../lib/mongodb";

export default async function ( req: NextApiRequest, res: NextApiResponse ) {
    if(req.method === 'GET'){
        const email = req.query.email;
        if(email){
            //@ts-ignore
            const client = await clientPromise;
            const moments = await client.db('example1').collection('moments').find({
                "uploadedBy.email": email
            }).sort({dateCreated:-1}).toArray();
            res.status(200).json(moments);
        }else{
            res.status(400).send("No email provided");
        };
    }else{
        res.status(400).send("Invalid method. Try again.")
    }
};