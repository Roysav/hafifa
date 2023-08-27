import * as express from "express";
import * as mongoose from "mongoose";
import Quote from "./modules/quote";
import * as bodyParser from "body-parser";

const app = express();
const port = 3000;

const DB_URL = process.env.DB_URL; //rename this variable to whatever the name is in the .env
const mongoAtlasURL = "mongodb+srv://test:test@cluster0.sv4yab8.mongodb.net/"; //temp for checking the connection to mongo

mongoose
	.connect(mongoAtlasURL)
	.then(() =>
		app.listen(port, () =>
			console.log(`server running on port: http://localhost:${port}`)
		)
	)
	.catch((err) => console.log(err));

app.post("/item", bodyParser.json(), async (req: express.Request, res: express.Response) => {
	const quote = new Quote({
		content: req.body.content,
		tags: req.body.tags,
		author: req.body.author
	});
	try {
		const savedQuote = await quote.save();
		res.json(savedQuote);
	} catch (error) {
		res.json({message: error});
	}
});
