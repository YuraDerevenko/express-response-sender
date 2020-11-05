import {
  NextFunction,
  Request,
  Response
} from 'express'

interface IResponseHandlerOptions {
  statusKey?: string
  resultKey?: string
  formatter?: Function
}

export default function responseHandler(options: IResponseHandlerOptions = {}) {
  const {
    statusKey = 'status',
    resultKey = 'result',
    formatter = (r: any) => r
  } = options
  return function (req: Request, res: Response, next: NextFunction) {
    const result = res.locals[resultKey]
    const status = res.locals[statusKey]

    if (result || status) {
      res.status(status || 200)
      if (result) {
        res.send(formatter(result))
      }
      return res.end()
    }

    return next()
  }
}
