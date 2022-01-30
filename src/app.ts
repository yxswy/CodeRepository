import * as express from 'express'
import { Request, Response } from 'express'
import * as bodyParser from 'body-parser'
import { createConnection } from 'typeorm'
import { yellowBright, gray, greenBright } from 'chalk'
import * as createError from 'http-errors'
import * as cookieParser from 'cookie-parser'
import * as logger from 'morgan'
import * as cors from 'cors'
import { join } from 'path'

import { User } from './entity/User'
import router from './router'

// 创建 typeorm 连接
createConnection().then((connection) => {
    console.log(greenBright(`\n   Connecting to the database successfully`))
    const userRepository = connection.getRepository(User)

    // 创建并设置express app
    const app = express()

    // view 模板
    app.set('views', join(__dirname, 'views'))
    app.set('view engine', 'jade')

    app.use(logger('dev'))

    // 解析 body
    app.use(bodyParser.json())

    // 设置客户端可访问的静态文件
    app.use('/release', express.static('dist'))
    app.use(express.static(join(__dirname, 'public')))

    // 跨域
    app.use(cors())

    app.use(cookieParser())

    // 功能实现路由
    app.use(router)

    // 注册路由
    app.get('/users', async function (req: Request, res: Response) {
        return userRepository.find()
    })

    app.get('/users/:id', async function (req: Request, res: Response) {
        return userRepository.findOne(req.params.id)
    })

    app.post('/users', async function (req: Request, res: Response) {
        const user = userRepository.create(req.body)
        return userRepository.save(user)
    })

    //   app.put("/users/:id", function (req: Request, res: Response) {
    //     const user = userRepository.findOne(req.params.id);
    //     userRepository.merge(user, req.body);
    //     return userRepository.save(user);
    //   });

    //   app.delete("/users/:id", async function (req: Request, res: Response) {
    //     return userRepository.remove(req.params.id);
    //   });

    // 404
    app.use(function (req, res, next) {
        next(createError(404))
    })

    app.use(function (err, req, res, next) {
        res.locals.message = err.message
        res.locals.error = err

        res.status(err.status || 500)
        res.render('error')
    })

    const PORT = 3010
    app.listen(PORT, () => {
        console.log(
            gray(`\n   Express server listening on `),
            yellowBright(`http://localhost:${PORT} \n`)
        )
    })
})
