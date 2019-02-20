//@flow

import type { $Request, $Response, NextFunction } from "express"
import { SanitizeError } from "@arwed/homepage-core"

export default () => (e: *, _req: $Request, res: $Response, next: NextFunction) => {
	if(e instanceof SanitizeError) {
		res.status(400).json({
			type: "SanitizeError",
			error: e
		})
	} else {
		next(e)
	}
}
