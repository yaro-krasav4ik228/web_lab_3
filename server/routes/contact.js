const router = require("express").Router();
const { Contact } = require("../models/contact");

router.post("/create", async (req, res) => {
  try {
    await new Contact({ ...req.body }).save();
    res.status(201).send({ message: "Contact added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const results = await Contact.find();
    res.send(results);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    const { name } = req.body;
    const results = await Contact.findOne({ name });
    if (!results) {
      res.status(404).send({ message: "Contact not found" });
    }
    await Contact.deleteOne({ name });
    res.send({ message: "Contact deleted successfully" });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, phone } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      id,
      { name, surname, phone },
      { new: true }
    );

    if (!contact) {
      return res.status(404).send({ message: "Contact not found" });
    }

    res.send({ message: "Contact updated successfully", contact });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
