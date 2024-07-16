const { Schema, model } = require("mongoose");

const visitorSchema = new Schema({
  count: { type: Number, default: 0 },
});

const Visitor = model("Visitor", visitorSchema);
module.exports = Visitor;
