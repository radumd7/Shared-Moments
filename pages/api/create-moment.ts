import { NextApiRequest, NextApiResponse } from "next";
//@ts-ignore
import clientPromise from "../../lib/mongodb";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { user, filename, title, anonymus } = req.body;
    if(req.method !== "POST"){
        res.status(400).send("Invalid method. Try again.");
    }else{
        //@ts-ignore
        const client = await clientPromise;
        const post = client.db('example1').collection('moments').insertOne(
            {
                title,
                image: `https://momentsapp.s3.eu-central-1.amazonaws.com/${filename}`,
                uploadedBy: {
                    name: user.name,
                    avatar: user.image,
                    email: user.email
                },
                dateCreated: Date.now(),
                anonymus
            }
        )
        res.status(200).send("Post created.");
    };
};