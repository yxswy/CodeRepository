"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var code_1 = require("./router/code");
var router = express.Router();
router.use('/api/code', code_1.default);
exports.default = router;
