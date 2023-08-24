"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var quoteSchema = new mongoose.Schema({
    content: String,
    author: String,
    tags: [String],
});
var Quote = mongoose.model("Quote", quoteSchema);
exports.default = Quote;
//# sourceMappingURL=quote.js.map