import { NextApiRequest, NextApiResponse } from "next";
import { SharedMomentsS3 } from '../../lib/s3config';
export default async function UploadImage( req: NextApiRequest, res:NextApiResponse ) {
    const { filename } = req.body;
    if( req.method !== "POST" ){
        res.status(400).send("Invalid request method. Try again.");
    }else{
        if(!filename){
            res.status(400).send("No file has been selected.");
        }else{
            const post = await SharedMomentsS3.createPresignedPost(
                {
                    Bucket: process.env.S3_BUCKET_NAME,
                    Fields: {
                        key: filename,
                    },
                    Expires: 60,
                    
                }
            );
            res.status(200).json(post);
        };
    };
};