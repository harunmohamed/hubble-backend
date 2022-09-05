import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connect = async () => {
    try {
      mongoose.connect(process.env.MONGO, (err) => {
        if(err) console.log(err) 
        else console.log("mongdb is connected");
       });
    } catch (error) {
      throw error;
    }
};

export default connect;