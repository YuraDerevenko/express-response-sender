# express-response-sender

Express middleware which allow you send unified responses from one place

## Instalation
```sh
npm i -S express-response-sender
```
## Usage

user.router.ts
```js
import { Router } from 'express'
import responseHandler from 'express-response-sender'

import { getAllUsers } from 'user.request-handler'

const router = Router()

router.get('/', getAllUsers)

router.use(responseHandler())
```
we use [res.locals](https://expressjs.com/ru/4x/api.html#res) to pass data between middlewares
user.request-handler.ts
```ts
import { Request, Response, NextFunction } from 'express'

export const getAllUsers = async function(req: Request, res: Response, next: NextFunction): Promise<void> {
  const users = userService.getAll()
 
  res.locals.status = 200 // optionl if result is provided
  res.locals.result = users

  return next()
}
```

## API

**responseHandler(options?)**

**options**
Type: `object`

statusKey
Type: `string`
Default:`status`
The field in `res.locals` used to store HTTP stausCode

resultKey
Type: `string`
Default:`result`
The field in `res.locals` used to store data which will be send to client

formatter
Type: `function`
Default:
Optional formatter to modify your response object
