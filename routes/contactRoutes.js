const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (err) {
    console.error("Error creating contact:", err.message);
    res.status(500).json({ message: "Server Error: Unable to create contact" });
  }
});

// READ
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ name: 1 });
    res.json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err.message);
    res.status(500).json({ message: "Server Error: Unable to fetch contacts" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted" });
  } catch (err) {
    console.error("Error deleting contact:", err.message);
    res.status(500).json({ message: "Server Error: Unable to delete contact" });
  }
});

module.exports = router;
