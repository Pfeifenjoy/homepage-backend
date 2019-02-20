//@flow

import type { $Request, $Response, NextFunction } from "express"

export default () => (e: Error, _req: $Request, res: $Response, next: NextFunction) => {
	res.status(500).json({
		type: "UnexpectedError"
	})
	next(e)
}
