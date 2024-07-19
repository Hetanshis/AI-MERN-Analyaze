import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import pdfParse from "pdf-parse";
import upload from "./utils/imageUpload";
import axios from "axios";
import path from "path";
import fs from "fs"
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send({ status: true, message: "Hello, Sever is connected" });
});

app.post("/upload/image", upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ status: false, message: "Please select an image." });
      }
  
      const dataBuffer = fs.readFileSync(path.join(__dirname, req.file.path));
      const data = await pdfParse(dataBuffer);
      const text = data.text;


  
      const analyzeUrl = "http://127.0.0.1:5001/analyze"; // Adjust the URL if necessary
      const response = await axios.post(analyzeUrl, { text });
  
      const { firstName, lastName } = response.data;
  
      return res.status(200).json({
        status: true,
        message: "Successfully analyzed.",
        data: response.data,
      });
    } catch (error:any) {
      console.error("Error analyzing PDF:", error.message);
      return res.status(500).json({ status: false, message: error.message });
    }
  });
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on this port:-${port}`);
});
