"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var typeorm_1 = require("typeorm");
var chalk_1 = require("chalk");
var createError = require("http-errors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var path_1 = require("path");
var User_1 = require("./entity/User");
var router_1 = require("./router");
// 创建 typeorm 连接
(0, typeorm_1.createConnection)().then(function (connection) {
    console.log((0, chalk_1.greenBright)("\n   Connecting to the database successfully"));
    var userRepository = connection.getRepository(User_1.User);
    // 创建并设置express app
    var app = express();
    // view 模板
    app.set('views', (0, path_1.join)(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(logger('dev'));
    // 解析 body
    app.use(bodyParser.json());
    // 设置客户端可访问的静态文件
    app.use('/release', express.static('dist'));
    app.use(express.static((0, path_1.join)(__dirname, 'public')));
    // 跨域
    app.use(cors());
    app.use(cookieParser());
    // 功能实现路由
    app.use(router_1.default);
    // 注册路由
    app.get('/users', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, userRepository.find()];
            });
        });
    });
    app.get('/users/:id', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, userRepository.findOne(req.params.id)];
            });
        });
    });
    app.post('/users', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                user = userRepository.create(req.body);
                return [2 /*return*/, userRepository.save(user)];
            });
        });
    });
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
        next(createError(404));
    });
    app.use(function (err, req, res, next) {
        res.locals.message = err.message;
        res.locals.error = err;
        res.status(err.status || 500);
        res.render('error');
    });
    var PORT = 3010;
    app.listen(PORT, function () {
        console.log((0, chalk_1.gray)("\n   Express server listening on "), (0, chalk_1.yellowBright)("http://localhost:".concat(PORT, " \n")));
    });
});
