import S3 from 'aws-sdk/clients/s3';
export const SharedMomentsS3 = new S3({
    region: process.env.S3_REGION,
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});