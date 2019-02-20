//@flow

import type { $Request, $Response, NextFunction } from "express"
import { CoreException, SanitizeError } from "@arwed/homepage-core"
import { error } from "@arwed/logging"
import { Router } from "express"

export default () => (e: *, _req: $Request, _res: $Response, next: NextFunction) => {
	if(e instanceof CoreException) {
		error(e.get_message())
	} else {
		error(JSON.stringify(e))
	}
	next(e)
}
