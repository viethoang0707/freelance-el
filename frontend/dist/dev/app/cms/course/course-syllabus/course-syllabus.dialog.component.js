"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var syllabus_utils_1 = require("../../../shared/helpers/syllabus.utils");
var base_component_1 = require("../../../shared/components/base/base.component");
var course_model_1 = require("../../../shared/models/elearning/course.model");
var course_unit_model_1 = require("../../../shared/models/elearning/course-unit.model");
var course_syllabus_model_1 = require("../../../shared/models/elearning/course-syllabus.model");
var constants_1 = require("../../../shared/models/constants");
var course_unit_dialog_component_1 = require("../course-unit-dialog/course-unit-dialog.component");
var course_unit_preview_dialog_component_1 = require("../course-unit-preview-dialog/course-unit-preview-dialog.component");
var course_setting_dialog_component_1 = require("../course-setting/course-setting.dialog.component");
var _ = require("underscore");
var CourseSyllabusDialog = (function (_super) {
    __extends(CourseSyllabusDialog, _super);
    function CourseSyllabusDialog() {
        var _this = _super.call(this) || this;
        _this.COURSE_UNIT_TYPE = constants_1.COURSE_UNIT_TYPE;
        _this.sylUtils = new syllabus_utils_1.SyllabusUtils();
        _this.items = [
            { label: _this.translateService.instant(constants_1.COURSE_UNIT_TYPE['folder']), command: function () { _this.addUnit('folder'); } },
            { label: _this.translateService.instant(constants_1.COURSE_UNIT_TYPE['html']), command: function () { _this.addUnit('html'); } },
            { label: _this.translateService.instant(constants_1.COURSE_UNIT_TYPE['slide']), command: function () { _this.addUnit('slide'); } },
            { label: _this.translateService.instant(constants_1.COURSE_UNIT_TYPE['video']), command: function () { _this.addUnit('video'); } },
            { label: _this.translateService.instant(constants_1.COURSE_UNIT_TYPE['exercise']), command: function () { _this.addUnit('exercise'); } },
            { label: _this.translateService.instant(constants_1.COURSE_UNIT_TYPE['scorm']), command: function () { _this.addUnit('scorm'); } },
        ];
        _this.syl = new course_syllabus_model_1.CourseSyllabus();
        _this.course = new course_model_1.Course();
        _this.courseStatus = _.map(constants_1.CONTENT_STATUS, function (val, key) {
            return {
                label: _this.translateService.instant(val),
                value: key
            };
        });
        _this.WINDOW_HEIGHT = $(window).height();
        return _this;
    }
    CourseSyllabusDialog.prototype.show = function (course) {
        var _this = this;
        this.display = true;
        this.display = true;
        this.course = course;
        course_syllabus_model_1.CourseSyllabus.get(this, course.syllabus_id).subscribe(function (syl) {
            _this.syl = syl;
            _this.buildCourseTree();
        });
    };
    CourseSyllabusDialog.prototype.clearSelection = function () {
        this.selectedNode = null;
        this.selectedUnit = null;
    };
    CourseSyllabusDialog.prototype.buildCourseTree = function () {
        var _this = this;
        if (this.syl) {
            course_unit_model_1.CourseUnit.listBySyllabus(this, this.syl.id).subscribe(function (units) {
                _this.units = units;
                _this.tree = _this.sylUtils.buildGroupTree(units);
            });
        }
    };
    CourseSyllabusDialog.prototype.showSetting = function () {
        this.settingDialog.show(this.course);
    };
    CourseSyllabusDialog.prototype.addUnit = function (type) {
        var _this = this;
        if (type != 'folder' && (!this.selectedNode || this.selectedNode.data.type != 'folder')) {
            this.error(this.translateService.instant('You need to select a folder.'));
            return;
        }
        var maxOrder = this.selectedNode ? this.selectedNode.children.length : this.tree.length;
        var unit = new course_unit_model_1.CourseUnit();
        unit.syllabus_id = this.syl.id;
        unit.icon = constants_1.COURSE_UNIT_ICON[type];
        unit.type = type;
        unit.name = 'New unit';
        unit.parent_id = this.selectedNode ? this.selectedNode.data.id : null;
        unit.order = maxOrder;
        unit.save(this).subscribe(function () {
            if (_this.selectedNode)
                _this.sylUtils.addChildNode(_this.selectedNode, unit);
            else
                _this.sylUtils.addRootNode(_this.tree, unit);
            _this.lmsProfileService.clearCourseContent(_this.course.id);
        });
    };
    CourseSyllabusDialog.prototype.editUnit = function () {
        var _this = this;
        if (this.selectedNode) {
            this.unitDialog.show(this.selectedNode.data);
            this.unitDialog.onUpdateComplete.subscribe(function () {
                _this.buildCourseTree();
                _this.lmsProfileService.clearCourseContent(_this.course.id);
            });
        }
    };
    CourseSyllabusDialog.prototype.deleteUnit = function () {
        var _this = this;
        if (this.selectedNode) {
            if (this.selectedNode.children.length) {
                this.error(this.translateService.instant('Cannot delete non-empty folder'));
                return;
            }
            this.confirm(this.translateService.instant('Are you sure to delete?'), function () {
                _this.selectedNode.data.delete(_this).subscribe(function () {
                    _this.buildCourseTree();
                    _this.selectedNode = null;
                    _this.lmsProfileService.clearCourseContent(_this.course.id);
                });
            });
        }
    };
    CourseSyllabusDialog.prototype.hide = function () {
        this.clearSelection();
        this.display = false;
    };
    CourseSyllabusDialog.prototype.moveUp = function () {
        var _this = this;
        if (this.selectedNode) {
            var unit = this.selectedNode.data;
            this.sylUtils.moveUp(this.tree, this.selectedNode);
            course_unit_model_1.CourseUnit.updateArray(this, this.units).subscribe(function () {
                _this.success('Move sucessfully');
                _this.lmsProfileService.clearCourseContent(_this.course.id);
            });
        }
    };
    CourseSyllabusDialog.prototype.moveDown = function () {
        var _this = this;
        if (this.selectedNode) {
            var unit = this.selectedNode.data;
            this.sylUtils.moveDown(this.tree, this.selectedNode);
            course_unit_model_1.CourseUnit.updateArray(this, this.units).subscribe(function () {
                _this.success('Move sucessfully');
                _this.lmsProfileService.clearCourseContent(_this.course.id);
            });
        }
    };
    CourseSyllabusDialog.prototype.nodeSelect = function (event) {
        if (this.selectedNode) {
            if (this.selectedUnit && this.selectedUnit.id == this.selectedNode.data.id) {
                this.clearSelection();
            }
            else
                this.selectedUnit = this.selectedNode.data;
        }
    };
    CourseSyllabusDialog.prototype.previewUnit = function () {
        if (this.selectedNode) {
            this.selectedNode.data.course_id = this.course.id;
            this.unitPreviewDialog.show(this.selectedNode.data);
        }
    };
    __decorate([
        core_1.ViewChild(course_unit_dialog_component_1.CourseUnitDialog),
        __metadata("design:type", course_unit_dialog_component_1.CourseUnitDialog)
    ], CourseSyllabusDialog.prototype, "unitDialog", void 0);
    __decorate([
        core_1.ViewChild(course_unit_preview_dialog_component_1.CourseUnitPreviewDialog),
        __metadata("design:type", course_unit_preview_dialog_component_1.CourseUnitPreviewDialog)
    ], CourseSyllabusDialog.prototype, "unitPreviewDialog", void 0);
    __decorate([
        core_1.ViewChild(course_setting_dialog_component_1.CourseSettingDialog),
        __metadata("design:type", course_setting_dialog_component_1.CourseSettingDialog)
    ], CourseSyllabusDialog.prototype, "settingDialog", void 0);
    CourseSyllabusDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-syllabus-dialog',
            templateUrl: 'course-syllabus.dialog.component.html',
            styleUrls: ['course-syllabus.dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], CourseSyllabusDialog);
    return CourseSyllabusDialog;
}(base_component_1.BaseComponent));
exports.CourseSyllabusDialog = CourseSyllabusDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvY291cnNlL2NvdXJzZS1zeWxsYWJ1cy9jb3Vyc2Utc3lsbGFidXMuZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBbUU7QUFHbkUseUVBQXVFO0FBR3ZFLGlGQUErRTtBQUUvRSw4RUFBdUU7QUFDdkUsd0ZBQWdGO0FBQ2hGLGdHQUF5RjtBQUV6Riw4REFBc0c7QUFDdEcsbUdBQXNGO0FBQ3RGLDJIQUE2RztBQUM3RyxxR0FBd0Y7QUFDeEYsOEJBQWdDO0FBWWhDO0lBQTBDLHdDQUFhO0lBb0JuRDtRQUFBLFlBQ0ksaUJBQU8sU0FvQlY7UUF2Q0osc0JBQWdCLEdBQUcsNEJBQWdCLENBQUM7UUFvQjdCLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSw4QkFBYSxFQUFFLENBQUM7UUFDcEMsS0FBSSxDQUFDLEtBQUssR0FBRztZQUNULEVBQUMsS0FBSyxFQUFFLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsNEJBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUEsQ0FBQyxFQUFDO1lBQzNHLEVBQUMsS0FBSyxFQUFFLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsNEJBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUEsQ0FBQyxFQUFDO1lBQ3ZHLEVBQUMsS0FBSyxFQUFFLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsNEJBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUEsQ0FBQyxFQUFDO1lBQ3pHLEVBQUMsS0FBSyxFQUFF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eWxsYWJ1cy9jb3Vyc2Utc3lsbGFidXMuZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3lsbGFidXNVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3N5bGxhYnVzLnV0aWxzJztcbmltcG9ydCB7IFdlYlNvY2tldFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvc29ja2V0LnNlcnZpY2UnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlVW5pdCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS11bml0Lm1vZGVsJztcbmltcG9ydCB7IENvdXJzZVN5bGxhYnVzIH0gIGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1zeWxsYWJ1cy5tb2RlbCc7XG5pbXBvcnQgeyBUcmVlTm9kZSwgTWVudUl0ZW0sIFNlbGVjdEl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBDT1VSU0VfVU5JVF9UWVBFLCBDT1VSU0VfVU5JVF9JQ09OLCBDT05URU5UX1NUQVRVUyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJztcbmltcG9ydCB7IENvdXJzZVVuaXREaWFsb2cgfSBmcm9tICcuLi9jb3Vyc2UtdW5pdC1kaWFsb2cvY291cnNlLXVuaXQtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb3Vyc2VVbml0UHJldmlld0RpYWxvZyB9IGZyb20gJy4uL2NvdXJzZS11bml0LXByZXZpZXctZGlhbG9nL2NvdXJzZS11bml0LXByZXZpZXctZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb3Vyc2VTZXR0aW5nRGlhbG9nIH0gZnJvbSAnLi4vY291cnNlLXNldHRpbmcvY291cnNlLXNldHRpbmcuZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgQ291cnNlTWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgeyBXaW5kb3dSZWYgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy93aW5kb253LnJlZic7XG5cbmRlY2xhcmUgdmFyICQ6IGFueTtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2NvdXJzZS1zeWxsYWJ1cy1kaWFsb2cnLFxuICAgIHRlbXBsYXRlVXJsOiAnY291cnNlLXN5bGxhYnVzLmRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2NvdXJzZS1zeWxsYWJ1cy5kaWFsb2cuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBDb3Vyc2VTeWxsYWJ1c0RpYWxvZyBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuXG5cdENPVVJTRV9VTklUX1RZUEUgPSBDT1VSU0VfVU5JVF9UWVBFO1xuXG5cdHByaXZhdGUgZGlzcGxheTogYm9vbGVhbjtcblx0cHJpdmF0ZSB0cmVlOiBUcmVlTm9kZVtdO1xuXHRwcml2YXRlIHN5bDogQ291cnNlU3lsbGFidXM7XG5cdHByaXZhdGUgc2VsZWN0ZWROb2RlOiBUcmVlTm9kZTtcblx0cHJpdmF0ZSBpdGVtczogTWVudUl0ZW1bXTtcblx0cHJpdmF0ZSB1bml0czogQ291cnNlVW5pdFtdO1xuXHRwcml2YXRlIHNlbGVjdGVkVW5pdDpDb3Vyc2VVbml0O1xuXHRwcml2YXRlIHN5bFV0aWxzIDogU3lsbGFidXNVdGlscztcblx0cHJpdmF0ZSBjb3Vyc2U6IENvdXJzZTtcblx0cHJpdmF0ZSBjb3Vyc2VTdGF0dXM6IFNlbGVjdEl0ZW1bXTtcblx0V0lORE9XX0hFSUdIVDogYW55O1xuXG5cdEBWaWV3Q2hpbGQoQ291cnNlVW5pdERpYWxvZykgdW5pdERpYWxvZzogQ291cnNlVW5pdERpYWxvZztcblx0QFZpZXdDaGlsZChDb3Vyc2VVbml0UHJldmlld0RpYWxvZykgdW5pdFByZXZpZXdEaWFsb2c6IENvdXJzZVVuaXRQcmV2aWV3RGlhbG9nO1xuXHRAVmlld0NoaWxkKENvdXJzZVNldHRpbmdEaWFsb2cpIHNldHRpbmdEaWFsb2c6IENvdXJzZVNldHRpbmdEaWFsb2c7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zeWxVdGlscyA9IG5ldyBTeWxsYWJ1c1V0aWxzKCk7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXG4gICAgICAgICAgICB7bGFiZWw6IHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KENPVVJTRV9VTklUX1RZUEVbJ2ZvbGRlciddKSwgY29tbWFuZDogKCk9PiB7IHRoaXMuYWRkVW5pdCgnZm9sZGVyJyl9fSxcbiAgICAgICAgICAgIHtsYWJlbDogdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoQ09VUlNFX1VOSVRfVFlQRVsnaHRtbCddKSwgY29tbWFuZDogKCk9PiB7IHRoaXMuYWRkVW5pdCgnaHRtbCcpfX0sXG4gICAgICAgICAgICB7bGFiZWw6IHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KENPVVJTRV9VTklUX1RZUEVbJ3NsaWRlJ10pLCBjb21tYW5kOiAoKT0+IHsgdGhpcy5hZGRVbml0KCdzbGlkZScpfX0sXG4gICAgICAgICAgICB7bGFiZWw6IHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KENPVVJTRV9VTklUX1RZUEVbJ3ZpZGVvJ10pLCBjb21tYW5kOiAoKT0+IHsgdGhpcy5hZGRVbml0KCd2aWRlbycpfX0sXG4gICAgICAgICAgICB7bGFiZWw6IHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KENPVVJTRV9VTklUX1RZUEVbJ2V4ZXJjaXNlJ10pLCBjb21tYW5kOiAoKT0+IHsgdGhpcy5hZGRVbml0KCdleGVyY2lzZScpfX0sXG4gICAgICAgICAgICB7bGFiZWw6IHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KENPVVJTRV9VTklUX1RZUEVbJ3Njb3JtJ10pLCBjb21tYW5kOiAoKT0+IHsgdGhpcy5hZGRVbml0KCdzY29ybScpfX0sXG5cbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5zeWwgPSBuZXcgQ291cnNlU3lsbGFidXMoKTtcbiAgICAgICAgdGhpcy5jb3Vyc2UgPSBuZXcgQ291cnNlKCk7XG4gICAgICAgIHRoaXMuY291cnNlU3RhdHVzID0gXy5tYXAoQ09OVEVOVF9TVEFUVVMsICh2YWwsIGtleSk9PiB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRsYWJlbDogdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQodmFsKSxcblx0XHRcdFx0dmFsdWU6IGtleVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuV0lORE9XX0hFSUdIVCA9ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICB9XG5cbiAgICBzaG93KGNvdXJzZTogQ291cnNlKSB7XG5cdFx0dGhpcy5kaXNwbGF5ID0gdHJ1ZTtcblx0XHR0aGlzLmRpc3BsYXkgPSB0cnVlO1xuXHRcdHRoaXMuY291cnNlID0gY291cnNlO1xuXHRcdENvdXJzZVN5bGxhYnVzLmdldCh0aGlzLCBjb3Vyc2Uuc3lsbGFidXNfaWQpLnN1YnNjcmliZSgoc3lsKT0+IHtcblx0XHRcdHRoaXMuc3lsID0gc3lsO1xuXHRcdFx0dGhpcy5idWlsZENvdXJzZVRyZWUoKTtcblx0XHR9KTtcblx0fVxuXG5cdGNsZWFyU2VsZWN0aW9uKCkge1xuXHRcdHRoaXMuc2VsZWN0ZWROb2RlID0gbnVsbDtcblx0XHR0aGlzLnNlbGVjdGVkVW5pdCA9IG51bGw7XG5cdH1cblxuXHRidWlsZENvdXJzZVRyZWUoKSB7XG5cdFx0aWYgKHRoaXMuc3lsKSB7XG5cdFx0XHRDb3Vyc2VVbml0Lmxpc3RCeVN5bGxhYnVzKHRoaXMsdGhpcy5zeWwuaWQpLnN1YnNjcmliZSh1bml0cyA9PiB7XG5cdFx0XHRcdHRoaXMudW5pdHMgPSB1bml0cztcblx0XHRcdFx0dGhpcy50cmVlID0gdGhpcy5zeWxVdGlscy5idWlsZEdyb3VwVHJlZSh1bml0cyk7XG5cdCAgICAgICAgfSk7XG5cdFx0fVxuXHR9XG5cblx0c2hvd1NldHRpbmcoKSB7XG5cdFx0dGhpcy5zZXR0aW5nRGlhbG9nLnNob3codGhpcy5jb3Vyc2UpO1xuXHR9XG5cblx0YWRkVW5pdCh0eXBlOnN0cmluZykge1xuXHRcdGlmICh0eXBlIT0nZm9sZGVyJyAmJiAoIXRoaXMuc2VsZWN0ZWROb2RlIHx8IHRoaXMuc2VsZWN0ZWROb2RlLmRhdGEudHlwZSAhPSAnZm9sZGVyJykpIHtcblx0XHRcdHRoaXMuZXJyb3IodGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ1lvdSBuZWVkIHRvIHNlbGVjdCBhIGZvbGRlci4nKSkgO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR2YXIgbWF4T3JkZXIgPSB0aGlzLnNlbGVjdGVkTm9kZSA/IHRoaXMuc2VsZWN0ZWROb2RlLmNoaWxkcmVuLmxlbmd0aCA6IHRoaXMudHJlZS5sZW5ndGg7IFxuXHRcdHZhciB1bml0ID0gbmV3IENvdXJzZVVuaXQoKTtcblx0XHR1bml0LnN5bGxhYnVzX2lkID0gIHRoaXMuc3lsLmlkO1xuXHRcdHVuaXQuaWNvbiA9IENPVVJTRV9VTklUX0lDT05bdHlwZV07XG5cdFx0dW5pdC50eXBlID0gIHR5cGU7XG5cdFx0dW5pdC5uYW1lID0gJ05ldyB1bml0Jztcblx0XHR1bml0LnBhcmVudF9pZCA9IHRoaXMuc2VsZWN0ZWROb2RlID8gdGhpcy5zZWxlY3RlZE5vZGUuZGF0YS5pZCA6IG51bGw7XG5cdFx0dW5pdC5vcmRlciA9IG1heE9yZGVyO1xuXHRcdHVuaXQuc2F2ZSh0aGlzKS5zdWJzY3JpYmUoKCk9PiB7XG5cdFx0XHRpZiAodGhpcy5zZWxlY3RlZE5vZGUpXG5cdFx0XHRcdHRoaXMuc3lsVXRpbHMuYWRkQ2hpbGROb2RlKHRoaXMuc2VsZWN0ZWROb2RlLCB1bml0KTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0dGhpcy5zeWxVdGlscy5hZGRSb290Tm9kZSh0aGlzLnRyZWUsIHVuaXQpO1xuXHRcdFx0dGhpcy5sbXNQcm9maWxlU2VydmljZS5jbGVhckNvdXJzZUNvbnRlbnQodGhpcy5jb3Vyc2UuaWQpO1xuXHRcdH0pO1xuXHR9XG5cblx0ZWRpdFVuaXQoKSB7XG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWROb2RlKSB7XG5cdFx0XHR0aGlzLnVuaXREaWFsb2cuc2hvdyh0aGlzLnNlbGVjdGVkTm9kZS5kYXRhKTtcblx0XHRcdHRoaXMudW5pdERpYWxvZy5vblVwZGF0ZUNvbXBsZXRlLnN1YnNjcmliZSgoKT0+IHtcblx0XHRcdFx0dGhpcy5idWlsZENvdXJzZVRyZWUoKTtcblx0XHRcdFx0dGhpcy5sbXNQcm9maWxlU2VydmljZS5jbGVhckNvdXJzZUNvbnRlbnQodGhpcy5jb3Vyc2UuaWQpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0ZGVsZXRlVW5pdCgpIHtcblx0XHRpZiAodGhpcy5zZWxlY3RlZE5vZGUpIHtcblx0XHRcdGlmICh0aGlzLnNlbGVjdGVkTm9kZS5jaGlsZHJlbi5sZW5ndGgpIHtcblx0XHRcdFx0dGhpcy5lcnJvcih0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnQ2Fubm90IGRlbGV0ZSBub24tZW1wdHkgZm9sZGVyJykpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG4gICAgICAgICAgICB0aGlzLmNvbmZpcm0odGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ0FyZSB5b3Ugc3VyZSB0byBkZWxldGU/JyksICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkTm9kZS5kYXRhLmRlbGV0ZSh0aGlzKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkQ291cnNlVHJlZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkTm9kZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG1zUHJvZmlsZVNlcnZpY2UuY2xlYXJDb3Vyc2VDb250ZW50KHRoaXMuY291cnNlLmlkKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgIH0pO1xuXHRcdH1cblx0fVxuXG5cdGhpZGUoKSB7XG5cdFx0dGhpcy5jbGVhclNlbGVjdGlvbigpO1xuXHRcdHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuXHR9XG5cblx0bW92ZVVwKCkge1xuXHRcdGlmICh0aGlzLnNlbGVjdGVkTm9kZSkge1xuXHRcdFx0dmFyIHVuaXQgPSAgdGhpcy5zZWxlY3RlZE5vZGUuZGF0YTtcblx0XHRcdHRoaXMuc3lsVXRpbHMubW92ZVVwKHRoaXMudHJlZSx0aGlzLnNlbGVjdGVkTm9kZSk7XG5cdFx0XHRDb3Vyc2VVbml0LnVwZGF0ZUFycmF5KHRoaXMsIHRoaXMudW5pdHMpLnN1YnNjcmliZSgoKT0+IHtcblx0XHRcdFx0dGhpcy5zdWNjZXNzKCdNb3ZlIHN1Y2Vzc2Z1bGx5Jyk7XG5cdFx0XHRcdHRoaXMubG1zUHJvZmlsZVNlcnZpY2UuY2xlYXJDb3Vyc2VDb250ZW50KHRoaXMuY291cnNlLmlkKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdG1vdmVEb3duKCkge1xuXHRcdGlmICh0aGlzLnNlbGVjdGVkTm9kZSkge1xuXHRcdFx0dmFyIHVuaXQgPSAgdGhpcy5zZWxlY3RlZE5vZGUuZGF0YTtcblx0XHRcdHRoaXMuc3lsVXRpbHMubW92ZURvd24odGhpcy50cmVlLHRoaXMuc2VsZWN0ZWROb2RlKTtcblx0XHRcdENvdXJzZVVuaXQudXBkYXRlQXJyYXkodGhpcywgdGhpcy51bml0cykuc3Vic2NyaWJlKCgpPT4ge1xuXHRcdFx0XHR0aGlzLnN1Y2Nlc3MoJ01vdmUgc3VjZXNzZnVsbHknKTtcblx0XHRcdFx0dGhpcy5sbXNQcm9maWxlU2VydmljZS5jbGVhckNvdXJzZUNvbnRlbnQodGhpcy5jb3Vyc2UuaWQpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0bm9kZVNlbGVjdChldmVudDphbnkpIHtcblx0XHRpZiAodGhpcy5zZWxlY3RlZE5vZGUpIHtcblx0XHRcdGlmICh0aGlzLnNlbGVjdGVkVW5pdCAmJiB0aGlzLnNlbGVjdGVkVW5pdC5pZCA9PSB0aGlzLnNlbGVjdGVkTm9kZS5kYXRhLmlkKSB7XG5cdFx0XHRcdHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcblx0XHRcdH0gXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRVbml0ID0gIHRoaXMuc2VsZWN0ZWROb2RlLmRhdGE7XG5cdFx0fVxuXHR9XG5cblx0cHJldmlld1VuaXQoKSB7XG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWROb2RlKSB7XG5cdFx0XHR0aGlzLnNlbGVjdGVkTm9kZS5kYXRhLmNvdXJzZV9pZCA9IHRoaXMuY291cnNlLmlkO1xuXHRcdFx0dGhpcy51bml0UHJldmlld0RpYWxvZy5zaG93KHRoaXMuc2VsZWN0ZWROb2RlLmRhdGEpO1xuXHRcdH1cblx0fVxuXG59XG5cbiJdfQ==
