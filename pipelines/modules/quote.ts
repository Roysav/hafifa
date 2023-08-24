import * as mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
	content: String,
	author: String,
	tags: [String],
});

const Quote = mongoose.model("Quote", quoteSchema);
export default Quote;
