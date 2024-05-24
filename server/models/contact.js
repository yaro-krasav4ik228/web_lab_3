const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  phone: { type: String, required: true },
});

const Contact = mongoose.model("contact", contactSchema);

module.exports = { Contact };
