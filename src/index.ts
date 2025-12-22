import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connect from "./utils/database";
import router from "./routes/api";

dotenv.config();

async function init() {
  try {
    const result = await connect();

    console.log("Database Status: ", result);

    const app = express();

    app.use(bodyParser.json());

    const PORT = parseInt(process.env.PORT || "3000", 10);

    app.get("/", (req, res) => {
      res.status(200).json({
        message: "Server is running!",
        status: "success",
      });
    });

    app.use("/api/v1", router);

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

init();
