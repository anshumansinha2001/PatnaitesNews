import { Schema, model } from "mongoose";

const visitorSchema = new Schema({
  count: { type: Number, default: 0 },
});

const Visitor = model("Visitor", visitorSchema);
export default Visitor;
