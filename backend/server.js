import express from "express";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();
const port = process.env.PORT || 8000;

const app = express();
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => res.send("server is ready"));

app.listen(port, () => console.log(`SERVER'S STARTED ON PORT -- ${port}`));
