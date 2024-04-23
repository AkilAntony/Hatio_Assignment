
import mongoose from "mongoose";

const ConnectDatabase = ()=> {
    try {
        mongoose.connect(process.env.DB);
        console.log("Database Connected");
    }
    catch(err) {
        console.log(err);
        console.log('Could not connect to Database');
    }
}

export default ConnectDatabase;
