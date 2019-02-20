//@flow

import type { $Request, $Response, NextFunction } from "express"
import { info } from "@arwed/logging"

export default () => (req: $Request, _res: $Response, next: NextFunction) => {
	info(`Received request: (FROM=${ req.ip }, PATH=${ req.originalUrl })`)
	next()
}
