import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
import { SharedMomentsS3 } from '../../lib/s3config';

export default async function DeleteMoment( req, res ) {
    if(req.method === 'POST'){
        const { _id, filename } = req.body
        const client = await clientPromise;
        await client.db('example1').collection('moments').findOneAndDelete({_id : ObjectId(_id)})
        await SharedMomentsS3.deleteObject({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: filename
        }).promise();
        res.status(200).send("Moment deleted");
    }else{
        res.status(400).send("Invalid method. Try again.");
    };
};