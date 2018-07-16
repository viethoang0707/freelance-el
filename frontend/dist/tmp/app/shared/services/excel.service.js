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
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
var XLSX = require("xlsx");
exports.EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
var EXCEL_EXTENSION = '.xlsx';
var ExcelService = (function () {
    function ExcelService() {
    }
    ExcelService.prototype.exportAsExcelFile = function (json, excelFileName) {
        var worksheet = XLSX.utils.json_to_sheet(json);
        var workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        var excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    };
    ExcelService.prototype.saveAsExcelFile = function (buffer, fileName) {
        var data = new Blob([buffer], {
            type: exports.EXCEL_TYPE
        });
        saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    };
    ExcelService.prototype.importFromExcelFile = function (file) {
        return Rx_1.Observable.create(function (observer) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = new Uint8Array(e.target.result);
                data = new Uint8Array(data);
                var workbook = XLSX.read(data, { type: 'array' });
                var sheetName = workbook.SheetNames[0];
                var sheet = workbook.Sheets[sheetName];
                observer.next(XLSX.utils.sheet_to_json(sheet));
                observer.complete();
            };
            reader.readAsArrayBuffer(file);
        });
    };
    ExcelService.prototype.importFromJsonFile = function (file) {
        return Rx_1.Observable.create(function (observer) {
            var reader = new FileReader();
            var textType = /application.json/;
            if (file.type.match(textType)) {
                reader.onload = function (e) {
                    var data = reader.result;
                    observer.next(data);
                    observer.complete();
                };
                reader.readAsText(file);
            }
        });
    };
    ExcelService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ExcelService);
    return ExcelService;
}());
exports.ExcelService = ExcelService;
