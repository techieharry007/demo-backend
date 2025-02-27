import mongoose from "mongoose";
const url =
  process.env.DB_URL;
const connectToMongo = async () => {
  await mongoose
    .connect(url, {
      
    })
    .then((res) => {
      console.log("mongodb connected");
    })
    .catch((err) => {
      console.log(err, "error");
    });
};

export default connectToMongo