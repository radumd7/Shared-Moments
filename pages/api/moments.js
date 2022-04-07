import clientPromise from "../../lib/mongodb";

export default async function Moments( req, res ) {
    const client = await clientPromise;
    const moments = await client.db('example1').collection('moments').find({},{
        projection:{
          _id: 0
        }
      }).sort({
        dateCreated: -1
      }).toArray();
    res.status(200).json(moments);
};