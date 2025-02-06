const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/calculate", async (req, res) => {
    const { num1, num2, operation } = req.body;
    const backendUrl = operation === "add" 
        ? "http://arithmetic-service:5001/add" 
        : "http://arithmetic-service:5001/subtract";

    try {
        const response = await axios.post(backendUrl, { num1, num2 });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Service Unavailable" });
    }
});

app.listen(5000, () => console.log("API Gateway running on port 5000"));
