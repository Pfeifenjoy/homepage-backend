//@flow

import type { $Request, $Response, NextFunction } from "express"
import { CoreException } from "@arwed/homepage-core"
import { error } from "@arwed/logging"

export default () => (e: *, _req: $Request, _res: $Response, next: NextFunction) => {
	if(e instanceof CoreException) {
		error(e.get_message())
	} else {
		error(JSON.stringify(e))
	}
	next(e)
}
