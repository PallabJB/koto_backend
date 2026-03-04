const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
    try {
        const { firstName, lastName, email, message } = req.body;

        if (!firstName || !lastName || !email || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newContact = new Contact({
            firstName,
            lastName,
            email,
            message,
        });

        await newContact.save();
        res.status(201).json({ message: "Message received successfully" });
    } catch (error) {
        console.error("Error receiving contact message:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
