import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import db from "./db/db.js";
import roleRoutes from "./routes/roleRoute.js";
import userRoutes from "./routes/userRoute.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/role/", roleRoutes);
app.use("/api/user/", userRoutes);

app.listen(process.env.PORT, () => {
  db.dbConnection();
  console.log(`App running on port: ${process.env.PORT}`);
});
