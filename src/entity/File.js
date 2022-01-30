"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileEntity = void 0;
var typeorm_1 = require("typeorm");
var FileEntity = /** @class */ (function () {
    function FileEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], FileEntity.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ comment: '文件名' }),
        __metadata("design:type", String)
    ], FileEntity.prototype, "file_name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ comment: '文件绝对路径' }),
        __metadata("design:type", String)
    ], FileEntity.prototype, "file_path", void 0);
    __decorate([
        (0, typeorm_1.Column)({ comment: '文件后缀' }),
        __metadata("design:type", String)
    ], FileEntity.prototype, "file_extname", void 0);
    __decorate([
        (0, typeorm_1.Column)({ comment: '展示标题' }),
        __metadata("design:type", String)
    ], FileEntity.prototype, "file_title", void 0);
    __decorate([
        (0, typeorm_1.Column)({ comment: '展示内容', type: 'text' }),
        __metadata("design:type", String)
    ], FileEntity.prototype, "file_content", void 0);
    __decorate([
        (0, typeorm_1.Column)({ comment: '阅读次数', default: 0 }),
        __metadata("design:type", Number)
    ], FileEntity.prototype, "readings", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], FileEntity.prototype, "create_time", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], FileEntity.prototype, "update_time", void 0);
    FileEntity = __decorate([
        (0, typeorm_1.Entity)()
    ], FileEntity);
    return FileEntity;
}());
exports.FileEntity = FileEntity;
