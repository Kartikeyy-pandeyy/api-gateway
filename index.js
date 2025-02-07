const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/calculate", async (req, res) => {
    const { num1, num2, operation } = req.body;

    if(operation === "add") {
        backendUrl = "https://calculator-production-e65e.up.railway.app/add"
    }
    else if(operation === "subtract") {
        backendUrl = "https://calculator-production-e65e.up.railway.app/subtract"
    }
    else if(operation === "multiply") {
        backendUrl = "https://calculator-production-e65e.up.railway.app/multiply"
    }
    else if(operation === "divide") {
        backendUrl = "https://calculator-production-e65e.up.railway.app/divide"
    }
    console.log("Request received:", { num1, num2, operation });
    console.log("Forwarding request to backend:", backendUrl);

    try {
        // Forwarding the request to the appropriate backend service
        const response = await axios.post(backendUrl, { num1, num2 });
        
        console.log("Backend response:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error("Error Details:", error.response?.data || error.message);
        
        // More detailed error response for better debugging
        res.status(500).json({ 
            error: "Service Unavailable", 
            details: error.response?.data || error.message 
        });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
