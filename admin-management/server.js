const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("./models/Admin");
const Manager = require("./models/Manager");

const app = express();

app.use(express.json());


// MongoDB Connection
mongoose
    .connect("mongodb://127.0.0.1:27017/adminDB")
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log(err);
    });


// Admin Register
app.post("/admin/register", async (req, res) => {

    const { username, email, password, confirm_password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const data = await Admin.create({
        username: username,
        email: email,
        password: hash,
        confirm_password: hash,
        status: true,
        created_date: new Date().toISOString(),
        updated_date: new Date().toISOString()
    });

    res.json(data);
});


// Admin Login
app.post("/admin/login", async (req, res) => {

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email: email });

    const check = await bcrypt.compare(password, admin.password);

    const token = jwt.sign(
        { id: admin._id },
        "secretkey"
    );

    res.json({
        message: "Login Success",
        token: token
    });
});


// Manager Insert
app.post("/manager", async (req, res) => {

    const data = await Manager.create(req.body);

    res.json(data);
});


// Manager Get All
app.get("/manager", async (req, res) => {

    const data = await Manager.find();

    res.json(data);
});


// Manager Delete
app.delete("/manager/:id", async (req, res) => {

    await Manager.findByIdAndDelete(req.params.id);

    res.json({
        message: "Deleted"
    });
});


// Manager Update
app.put("/manager/:id", async (req, res) => {

    const data = await Manager.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(data);
});


// Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});