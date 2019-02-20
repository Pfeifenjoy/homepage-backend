//@flow

import { Router, type $Request, type $Response } from "express"
import Core from "@arwed/homepage-core"
import { info } from "@arwed/logging"
import { require_authentication } from "../authentication"

const list = (core: Core) => async (request: $Request, response: $Response) => {
	const messages = await core.message.list_messages()
	response.json(messages)
}

const create = (core: Core) => async (request: $Request, response: $Response, next) => {
	try {
		info(`Received message: ${ JSON.stringify(request.body) }`)
		const message = await core.message.send(request.body)
		response.json(message)
	} catch (e) {
		next(e)
	}
}

export default (core: Core) => {
	const router = new Router
	router.get("/list", require_authentication(core), list(core))
	router.post("/create", create(core))
	return router
}
