const createHandler = require("github-webhook-handler");
const dotenv = require("dotenv");
const { exec } = require("child_process");
const http = require("http");
dotenv.config();

export default () => {
	var handler = createHandler({
		path: "/webhook",
		secret: process.env.GIT_SECRET, // Use the .env file
	});

	http.createServer((req, res) => {
		handler(req, res, res.statusCode(404).end("Not found"));
	}).listen(7777, () => console.log("Starting webhook handler..."));

	handler.on("error", console.error);

	handler.on("push", () => {
		console.log("Recieved a push event!");

		exec(`bash ./deploy.sh >> ./local`);
	});
};
