// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI as string;
// console.log(MONGODB_URI);

// if (!MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI environment variable in .env.local");
// }

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// let cached = (global as any).mongoose;

// if (!cached) {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   cached = (global as any).mongoose = { conn: null, promise: null };
// }

// async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default dbConnect;

import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Mongodb connected");
    return true;
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
