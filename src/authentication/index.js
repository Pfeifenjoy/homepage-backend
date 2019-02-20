//@flow

import Core from "@arwed/homepage-core"
import { Router } from "express"
import type { $Request, $Response, NextFunction } from "express"
import { extract_expiration_date } from "@arwed/homepage-core/build/user/jwt"
import cookie_parser from "cookie-parser"

const authenticate = (core: Core) => async (req: $Request, res: $Response) => {
	const credentials = { ...req.body }
	const token = await core.user.authenticate(credentials)
	if(token) {
		res.cookie("token", token, {
			secure: true,
			httpOnly: true,
			expires: new Date(extract_expiration_date(token)),
			signed: true
		}).send("authenticated")
	} else {
		res.status(400)
			.send("unable to authenticate")
	}
}

export const require_authentication = (core: Core) =>
	async (req: $Request, res: $Response, next: NextFunction) => {
		const { token } = req.signedCookies
		if(await core.user.validate_token(token)) {
			next()
		} else {
			res.status(401)
				.send("Unauthorized")
		}
	}

export const logout = (core: Core) => async (_req: $Request, res: $Response) => {
	res.clearCookie("token")
		.send("logged out")
}

export default async (core: Core) => {
	const router = new Router
	router.use(cookie_parser((await core.config.get_secret()).toString()))
	router.post("/authenticate", authenticate(core))
	router.post("/logout", logout(core))
	return router
}
