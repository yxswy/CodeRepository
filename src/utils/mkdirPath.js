"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mkdirPath = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
function mkdirPath(pathStr) {
    var projectPath = (0, path_1.join)(process.cwd());
    var tempDirArray = pathStr.split('\\');
    for (var i = 0; i < tempDirArray.length; i++) {
        projectPath = projectPath + '/' + tempDirArray[i];
        if ((0, fs_1.existsSync)(projectPath)) {
            var tempstats = (0, fs_1.statSync)(projectPath);
            if (!tempstats.isDirectory()) {
                (0, fs_1.unlinkSync)(projectPath);
                (0, fs_1.mkdirSync)(projectPath);
            }
        }
        else {
            (0, fs_1.mkdirSync)(projectPath);
        }
    }
}
exports.mkdirPath = mkdirPath;
