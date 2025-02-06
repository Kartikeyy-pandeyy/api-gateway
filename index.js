const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());


app.post("/calculate", async (req, res) => {
    const { num1, num2, operation } = req.body;
    const backendUrl = operation === "add" 
        ? "https://calculator-production-e65e.up.railway.app/add" 
        : "https://calculator-production-e65e.up.railway.app/subtract";

        try {
            const response = await axios.post(backendUrl, { num1, num2 });
            res.json(response.data);
        } catch (error) {
            console.error("Error Details:", error.response?.data || error.message);
            res.status(500).json({ error: "Service Unavailable", details: error.message });
        }
    });
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));