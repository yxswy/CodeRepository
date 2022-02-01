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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var typeorm_1 = require("typeorm");
var File_1 = require("../entity/File");
var fs_1 = require("fs");
var path_1 = require("path");
var readline_1 = require("readline");
var chalk_1 = require("chalk");
var router = express.Router();
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.render('upload-file');
        return [2 /*return*/];
    });
}); });
router.get('/list', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, typeorm_1.getRepository)(File_1.FileEntity).find()];
            case 1:
                result = _a.sent();
                res.json({
                    data: {
                        data_type: 'list',
                        data: result,
                        total: 0,
                    },
                    success: true,
                    code: 200,
                });
                return [2 /*return*/];
        }
    });
}); });
router.get('/detail/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var respository, item;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, typeorm_1.getRepository)(File_1.FileEntity)];
            case 1:
                respository = _a.sent();
                return [4 /*yield*/, respository.findOne(req.params.id)];
            case 2:
                item = _a.sent();
                res.json({
                    code: 200,
                    success: true,
                    data: item || {},
                });
                return [2 /*return*/];
        }
    });
}); });
function processLineByLine(filePath) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var fileStream, fileName, fileExtname, rl, lineCount, fileTitle, fileContent, rl_1, rl_1_1, line, e_1_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fileStream = (0, fs_1.createReadStream)(filePath);
                    fileName = (0, path_1.basename)(filePath);
                    fileExtname = (0, path_1.extname)(filePath).slice(1);
                    rl = (0, readline_1.createInterface)({
                        input: fileStream,
                        crlfDelay: Infinity,
                    });
                    lineCount = 1;
                    fileTitle = '';
                    fileContent = '';
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    rl_1 = __asyncValues(rl);
                    _b.label = 2;
                case 2: return [4 /*yield*/, rl_1.next()];
                case 3:
                    if (!(rl_1_1 = _b.sent(), !rl_1_1.done)) return [3 /*break*/, 5];
                    line = rl_1_1.value;
                    if (lineCount === 1) {
                        fileTitle = line.slice(3);
                    }
                    else {
                        fileContent = fileContent + line + '\r\n';
                    }
                    lineCount++;
                    _b.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(rl_1_1 && !rl_1_1.done && (_a = rl_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(rl_1)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/, {
                        fileName: fileName,
                        fileTitle: fileTitle,
                        fileContent: fileContent,
                        fileExtname: fileExtname,
                    }];
            }
        });
    });
}
router.post('/upload', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var files, file, originalname, tempPath, filePath, data, _a, fileName, fileTitle, fileContent, fileExtname, respository, response, e_2, response;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                files = req.files || [];
                if (files.length < 1) {
                    throw new Error('文件异常');
                }
                file = files[0];
                originalname = file.originalname;
                if (!originalname) {
                    throw new Error('文件异常');
                }
                tempPath = file.path;
                filePath = (0, path_1.join)(__dirname, '../../static', originalname) //文件名
                ;
                data = (0, fs_1.readFileSync)(tempPath);
                return [4 /*yield*/, (0, fs_1.writeFileSync)(filePath, data)];
            case 1:
                _b.sent();
                return [4 /*yield*/, processLineByLine(filePath)];
            case 2:
                _a = _b.sent(), fileName = _a.fileName, fileTitle = _a.fileTitle, fileContent = _a.fileContent, fileExtname = _a.fileExtname;
                return [4 /*yield*/, (0, typeorm_1.getRepository)(File_1.FileEntity)];
            case 3:
                respository = _b.sent();
                return [4 /*yield*/, respository.query('INSERT INTO file_entity (file_name, file_path, file_extname, file_title, file_content)  VALUES  (?, ?, ?, ?, ?);', [fileName, filePath, fileExtname, fileTitle, fileContent])];
            case 4:
                _b.sent();
                console.log(fileName, filePath, fileExtname);
                response = {
                    message: 'File uploaded successfully.',
                    filename: originalname,
                };
                res.json(response);
                return [3 /*break*/, 6];
            case 5:
                e_2 = _b.sent();
                console.log((0, chalk_1.red)(e_2));
                response = {
                    message: 'Failed to upload files.',
                    detailedInformation: e_2,
                };
                res.json(response);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
