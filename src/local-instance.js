//@flow
import express from "express"
import backend from "."
import { create_core } from "@arwed/homepage-core"
import { info } from "@arwed/logging"
import http2 from "http2"

async function launch() {
	const app = express()

	const core = await create_core()

	app.use("/api", await backend(core))

	const port = parseInt(process.env.PORT) || 6000

	const server = http2.createSecureServer({
		...core.security,
		allowHTTP1: true
	}, app)

	server.listen(port)

	info(`Listening on port ${ port }`)

	info("Launched local instance.")
}

launch()
