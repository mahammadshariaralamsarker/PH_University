import mongoose from "mongoose";
import config from './app/config/index';
import app from "./app";

async function Main() {
    try {
        await mongoose.connect(config.database_url as string)
        app.listen(config.port,()=>{
            console.log(`app running port ${config.port}`);
        })
    } catch (error) {
        console.log(error);
    }
}


Main();