import mongoose from "mongoose";

const connectDB = async () => {


    mongoose.connection.on('connected',()=>{
        console.log("DB is connected Successfully...");
        
    })

  await mongoose.connect(`${process.env.MONGODB_URL}`);
};

export default connectDB;
