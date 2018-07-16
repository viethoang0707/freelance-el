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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvZXhjZWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyw4QkFBOEM7QUFDOUMsMkJBQTZCO0FBQ2hCLFFBQUEsVUFBVSxHQUFHLGlGQUFpRixDQUFDO0FBQzVHLElBQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQztBQUloQztJQUVFO0lBQWdCLENBQUM7SUFFVix3Q0FBaUIsR0FBeEIsVUFBeUIsSUFBVyxFQUFFLGFBQXFCO1FBQ3pELElBQU0sU0FBUyxHQUFtQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRSxJQUFNLFFBQVEsR0FBa0IsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN4RixJQUFNLFdBQVcsR0FBUSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDbkYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVPLHNDQUFlLEdBQXZCLFVBQXdCLE1BQVcsRUFBRSxRQUFnQjtRQUNuRCxJQUFNLElBQUksR0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3BDLElBQUksRUFBRSxrQkFBVTtTQUNqQixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsSUFBSSxFQUFFLFFBQVEsR0FBRyxVQUFVLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxlQUFlLENBQUMsQ0FBQztJQUUvRSxDQUFDO0lBRU0sMENBQW1CLEdBQTFCLFVBQTJCLElBQVM7UUFDbEMsT0FBTyxlQUFVLENBQUMsTUFBTSxDQUFDLFVBQVMsUUFBUTtZQUN4QyxJQUFJLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsVUFBUyxDQUFNO2dCQUM3QixJQUFJLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzVCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBQ2xELElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3ZDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDL0MsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQztZQUNGLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSx5Q0FBa0IsR0FBekIsVUFBMEIsSUFBUztRQUNqQyxPQUFPLGVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxRQUFRO1lBQ3pDLElBQUksTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7WUFDOUIsSUFBSSxRQUFRLEdBQUcsa0JBQWtCLENBQUM7WUFDbEMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDN0IsTUFBTSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7b0JBQ3pCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7b0JBQ3pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3BCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQyxDQUFBO2dCQUNELE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDekI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFoRFUsWUFBWTtRQUR4QixpQkFBVSxFQUFFOztPQUNBLFlBQVksQ0FtRHhCO0lBQUQsbUJBQUM7Q0FuREQsQUFtREMsSUFBQTtBQW5EWSxvQ0FBWSIsImZpbGUiOiJhcHAvc2hhcmVkL3NlcnZpY2VzL2V4Y2VsLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgKiBhcyBYTFNYIGZyb20gJ3hsc3gnO1xuZXhwb3J0IGNvbnN0IEVYQ0VMX1RZUEUgPSAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwuc2hlZXQ7Y2hhcnNldD1VVEYtOCc7XG5jb25zdCBFWENFTF9FWFRFTlNJT04gPSAnLnhsc3gnO1xuZGVjbGFyZSB2YXIgc2F2ZUFzOiBhbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFeGNlbFNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIGV4cG9ydEFzRXhjZWxGaWxlKGpzb246IGFueVtdLCBleGNlbEZpbGVOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCB3b3Jrc2hlZXQ6IFhMU1guV29ya1NoZWV0ID0gWExTWC51dGlscy5qc29uX3RvX3NoZWV0KGpzb24pO1xuICAgIGNvbnN0IHdvcmtib29rOiBYTFNYLldvcmtCb29rID0geyBTaGVldHM6IHsgJ2RhdGEnOiB3b3Jrc2hlZXQgfSwgU2hlZXROYW1lczogWydkYXRhJ10gfTtcbiAgICBjb25zdCBleGNlbEJ1ZmZlcjogYW55ID0gWExTWC53cml0ZSh3b3JrYm9vaywgeyBib29rVHlwZTogJ3hsc3gnLCB0eXBlOiAnYXJyYXknIH0pO1xuICAgIHRoaXMuc2F2ZUFzRXhjZWxGaWxlKGV4Y2VsQnVmZmVyLCBleGNlbEZpbGVOYW1lKTtcbiAgfVxuXG4gIHByaXZhdGUgc2F2ZUFzRXhjZWxGaWxlKGJ1ZmZlcjogYW55LCBmaWxlTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZGF0YTogQmxvYiA9IG5ldyBCbG9iKFtidWZmZXJdLCB7XG4gICAgICB0eXBlOiBFWENFTF9UWVBFXG4gICAgfSk7XG4gICAgc2F2ZUFzKGRhdGEsIGZpbGVOYW1lICsgJ19leHBvcnRfJyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgRVhDRUxfRVhURU5TSU9OKTtcbiAgICBcbiAgfVxuXG4gIHB1YmxpYyBpbXBvcnRGcm9tRXhjZWxGaWxlKGZpbGU6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKGZ1bmN0aW9uKG9ic2VydmVyKSB7XG4gICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbihlOiBhbnkpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBuZXcgVWludDhBcnJheShlLnRhcmdldC5yZXN1bHQpO1xuICAgICAgICBkYXRhID0gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XG4gICAgICAgIHZhciB3b3JrYm9vayA9IFhMU1gucmVhZChkYXRhLCB7IHR5cGU6ICdhcnJheScgfSk7XG4gICAgICAgIHZhciBzaGVldE5hbWUgPSB3b3JrYm9vay5TaGVldE5hbWVzWzBdO1xuICAgICAgICB2YXIgc2hlZXQgPSB3b3JrYm9vay5TaGVldHNbc2hlZXROYW1lXTtcbiAgICAgICAgb2JzZXJ2ZXIubmV4dChYTFNYLnV0aWxzLnNoZWV0X3RvX2pzb24oc2hlZXQpKTtcbiAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgIH07XG4gICAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoZmlsZSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaW1wb3J0RnJvbUpzb25GaWxlKGZpbGU6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICB2YXIgdGV4dFR5cGUgPSAvYXBwbGljYXRpb24uanNvbi87XG4gICAgICBpZiAoZmlsZS50eXBlLm1hdGNoKHRleHRUeXBlKSkge1xuICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlYWRlci5yZXN1bHQ7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChkYXRhKTtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cblxufSJdfQ==
