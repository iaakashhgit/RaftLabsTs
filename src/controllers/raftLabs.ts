import RaftLabsSchema from "../models/raftLabsModel";
import Redis from "../helper/redis";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";

const raftLabsCreate = async (req: Request, res: Response) => {
  try {
    const { name, age, address } = req.body;
    const obj = {
      _id: uuidv4(),
      name,
      age,
      address,
    };
    const response = await new RaftLabsSchema(obj).save();
    return res
      .status(200)
      .json({ message: "Data Created successfully", data: response });
  } catch (error) {
    console.log("raftLabsCreate error: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getData = async (req: Request, res: Response) => {
    try {
        let { email } = req.body
        const redis = new Redis();
        let userData;
        let dataRedis = await redis.get(email);
        console.log("\n\n1st time redis data = = = =  = ", dataRedis)
        if (!dataRedis) {
            userData = await RaftLabsSchema.findOne({ email }, { password: 0 }).sort({ _created_at: -1 })
            redis.set(email, JSON.stringify(userData))
        }
        let data = dataRedis ? JSON.parse(dataRedis) : userData
        return res.status(200).json({ data: data })
    } catch (error) {
        console.log("getData: error", error)
    }
}

const updateData = async (req: Request, res: Response) => {
    try {
        let body = req.body
        if (body.searchId) {
            await RaftLabsSchema.updateOne({ _id: body.searchId }, { $set: { Location: body.location } })
            return res.status(200).json({ message: "Document updated successfully" });
        }
    } catch (error) {
        console.log("updateData error:", error)
    }
}

const deleteData = async (req: Request, res: Response) => {
    try {
        const deleteId = req.query._id
        const deletedData = await RaftLabsSchema.findByIdAndDelete(deleteId)
        if (!deletedData) {
            return res.status(404).json({ message: "Data not found" });
        }
        console.log("Deleted data:", deletedData);
        return res.status(200).json({ message: "Document deleted successfully" })
    } catch (error) {
        console.log("deleteData error:", error)
        return res.status(500).json({ error: "Failed to delete data" })
    }
};

const getAllData = async (req: Request, res: Response) => {
    try { 
        let {pageNumber, limit} = req.body ; 
        let skip = (pageNumber - 1) * limit 
        let getData = await RaftLabsSchema.aggregate([
            {
                $match: {
                    age : {$gte : 24}
                }
            },
            {
              $sort : {
                    _created_at : -1
                }
            },  
            {
                $skip : skip 
            },
            {
                $limit :limit ? limit : 5
            },
            {
                $project : {
                    _id : 0
                }
            }
        ]);
        return res.status(200).json({ message: "data", getData })

    } catch (error) {
        console.log("getAllData error: ",error)
    }
}

export default { raftLabsCreate, getData, updateData, deleteData, getAllData };
