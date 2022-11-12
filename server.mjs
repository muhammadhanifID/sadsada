import express from "express";
import fetch from "node-fetch";
import FormData from "form-data";
const app = express();
app.all("/", async (req, res) => {
	res.send("halo guys");
});
app.all("/index", async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");

	let formData = new FormData();
	formData.append(
		"key",
		"ZFtrHZgY4lBAxPacQPiapdAFCCs6GQu3Vk8vnnzhrVSGqHm70msQG30UMxbgsx8B"
	);
	formData.append("sign", "2c1a72e53c246770b3f2aae2c80e3ff9");

	// note: use npm install node-fetch@2.0 to be able to use "require"

	const response = await fetch("https://reetenstore.id/api/profile", {
		method: "post",
		body: formData,
	});
	const data = await response.json();

	console.log(data);
	res.send(data);
});
app.listen(process.env.PORT || 8000);
