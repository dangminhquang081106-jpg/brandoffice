const User = require("./models/User");
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// CONNECT DATABASE
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ Error:", err));

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

app.get("/info", (req, res) => {
    res.json({
        name: "BrandOffice",
        status: "running",
        database: "connected"
    });
});

const PORT = process.env.PORT || 3000;
app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});
app.post("/users", async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email
        });

        await newUser.save();

        res.json({
            message: "User saved successfully",
            user: newUser
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
