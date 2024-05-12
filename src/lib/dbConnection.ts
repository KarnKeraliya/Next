import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {//void means we cannot know which type of data returns

  if(connection.isConnected){
    console.log("database is already connected");
    return
  }
  
  try {
    const response = await mongoose.connect(process.env.MONGO_URI || "", {})
    connection.isConnected = response.connections[0].readyState
    console.log("database is connected", response.connection);
    
  } catch (error) {
    console.log("database connection failed");
    process.exit(1)
  }


}

export default dbConnect