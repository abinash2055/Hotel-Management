import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "Hospital-Management",
    }).then(() => {
        console.log("MongoDB Connected Successfully....");
    }).catch((err) => {
        console.log(`Database Connection Error: ${err}`)
    });
}

