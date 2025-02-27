import "express-async-errors";
import "dotenv/config"; // Must be imported at the very beginning
import express from "express";
import globalErrorHandler from "./middleware/errormiddleware";
import cors from "cors";
import connectToMongo from "./config/db";
import routeHandler from "./middleware/routerHandler/routerHandler";
import { createServer } from "http";
import router from "./routes/authRoutes";
import crudRoutes from './routes/crudRoutes'
// Worker setup
connectToMongo();
const app = express();
const server=createServer(app)
const port = 3000;
app.set("view engine", "ejs");
app.use(express.json());
app.use(cors());
app.use(routeHandler);
app.use("/api", router);
app.use('/api',crudRoutes)
app.use(globalErrorHandler);

server.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
