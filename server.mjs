import express from "express";
import fetch from "node-fetch";
import FormData from "form-data";
const app = express();
app.all("/", async (req, res) => {
	res.send("halo guys");
});
app.all("/ceksaldo", async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");

	let formData = new FormData();
	formData.append("key", process.env.KEYREETEN);
	formData.append("sign", process.env.SIGNREETEN);

	// note: use npm install node-fetch@2.0 to be able to use "require"

	const response = await fetch("https://reetenstore.id/api/profile", {
		method: "post",
		body: formData,
	});
	const data = await response.json();

	console.log(data);
	res.send(data);
});
app.all("/listgame", async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");

	let formData = new FormData();
	formData.append("key", process.env.KEYREETEN);
	formData.append("sign", process.env.SIGNREETEN);
	formData.append("type", "service");
	formData.append("filter_type", "game");
	formData.append("filter_value", "Mobile Legends");

	// note: use npm install node-fetch@2.0 to be able to use "require"

	const response = await fetch("https://reetenstore.id/api/game-feature", {
		method: "post",
		body: formData,
	});
	const items = await response.json();
	let key = "status";
	let value = "available";
	const result = items.data.filter((status) => status[key] === value);

	res.send(result);
});
app.listen(8080);
