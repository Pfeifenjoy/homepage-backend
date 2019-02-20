//@flow

import Core from "@arwed/homepage-core"
import { Router, json, urlencoded } from "express"
import { request, error as error_logger } from "./logger"
import { default_handler as default_error, sanitize as sanitize_error } from "./error"
import message from "./message"
import user from "./user"
import authentication from "./authentication"

export default async (core: Core) => {
	const router = new Router
	router.use(json())
	router.use(urlencoded({ extended: true }))
	router.use(request())
	router.use(await authentication(core))
	router.use("/message", message(core))
	router.use("/user", await user(core))
	router.use(error_logger())
	router.use(sanitize_error())
	router.use(default_error())
	return router
}
