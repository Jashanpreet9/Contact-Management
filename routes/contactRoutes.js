const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
});

// READ
router.get("/", async (req, res) => {
  const contacts = await Contact.find().sort({ name: 1 });
  res.json(contacts);
});

// DELETE (BONUS)
router.delete("/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Contact deleted" });
});

module.exports = router;
