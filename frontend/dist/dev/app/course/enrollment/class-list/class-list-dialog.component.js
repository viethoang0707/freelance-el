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
var course_class_model_1 = require("../../../shared/models/elearning/course-class.model");
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var base_component_1 = require("../../../shared/components/base/base.component");
var constants_1 = require("../../../shared/models/constants");
var enrollment_dialog_component_1 = require("../enrollment-dialog/enrollment-dialog.component");
var class_dialog_component_1 = require("../class-dialog/class-dialog.component");
var ClassListDialog = (function (_super) {
    __extends(ClassListDialog, _super);
    function ClassListDialog() {
        var _this = _super.call(this) || this;
        _this.COURSE_MODE = constants_1.COURSE_MODE;
        _this.CLASS_STATUS = constants_1.CLASS_STATUS;
        _this.classes = [];
        _this.teachers = [];
        return _this;
    }
    ClassListDialog.prototype.ngOnInit = function () {
    };
    ClassListDialog.prototype.enroll = function () {
        if (this.selectedClass) {
            this.courseEnrollDialog.enrollClass(this.course, this.selectedClass);
        }
    };
    ClassListDialog.prototype.loadClasses = function () {
        var _this = this;
        course_class_model_1.CourseClass.listByCourse(this, this.course.id).subscribe(function (classes) {
            _this.classes = classes;
        });
    };
    ClassListDialog.prototype.hide = function () {
        this.display = false;
    };
    ClassListDialog.prototype.show = function (course) {
        this.course = course;
        this.display = true;
        this.loadClasses();
    };
    ClassListDialog.prototype.addClass = function () {
        var _this = this;
        var clazz = new course_class_model_1.CourseClass();
        clazz.course_id = this.course.id;
        clazz.course_name = this.course.name;
        this.classDialog.show(clazz);
        this.classDialog.onCreateComplete.subscribe(function () {
            _this.loadClasses();
        });
    };
    ClassListDialog.prototype.editClass = function () {
        this.classDialog.show(this.selectedClass);
    };
    ClassListDialog.prototype.deleteClass = function () {
        var _this = this;
        course_member_model_1.CourseMember.listByClass(this, this.selectedClass.id).subscribe(function (members) {
            if (members.length)
                _this.error(_this.translateService.instant('You cannot delete class with member inside'));
            else
                _this.confirm(_this.translateService.instant('Are you sure to delete?'), function () {
                    _this.selectedClass.delete(_this).subscribe(function () {
                        _this.loadClasses();
                    });
                });
        });
    };
    ClassListDialog.prototype.closeClass = function () {
        var _this = this;
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedClass.supervisor_id) {
            this.error('You do not have close permission for this class.  You will not be able to enroll new members after the class is closed');
            return;
        }
        this.confirm('Are you sure to proceed ?', function () {
            _this.selectedClass.close(_this).subscribe(function () {
                _this.selectedClass.status = 'closed';
                _this.success('Class close');
            });
        });
    };
    ClassListDialog.prototype.openClass = function () {
        var _this = this;
        if (this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedClass.supervisor_id) {
            this.error('You do not have open permission for this class');
            return;
        }
        this.confirm('Are you sure to proceed ?.', function () {
            _this.selectedClass.open(_this).subscribe(function () {
                _this.selectedClass.status = 'open';
                _this.success('Survey open');
            });
        });
    };
    __decorate([
        core_1.ViewChild(enrollment_dialog_component_1.CourseEnrollDialog),
        __metadata("design:type", enrollment_dialog_component_1.CourseEnrollDialog)
    ], ClassListDialog.prototype, "courseEnrollDialog", void 0);
    __decorate([
        core_1.ViewChild(class_dialog_component_1.CourseClassDialog),
        __metadata("design:type", class_dialog_component_1.CourseClassDialog)
    ], ClassListDialog.prototype, "classDialog", void 0);
    ClassListDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'class-list-dialog',
            templateUrl: 'class-list-dialog.component.html',
            styleUrls: ['class-list-dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], ClassListDialog);
    return ClassListDialog;
}(base_component_1.BaseComponent));
exports.ClassListDialog = ClassListDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jb3Vyc2UvZW5yb2xsbWVudC9jbGFzcy1saXN0L2NsYXNzLWxpc3QtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBbUY7QUFPbkYsMEZBQWtGO0FBQ2xGLDRGQUFvRjtBQUNwRixpRkFBK0U7QUFDL0UsOERBQTRGO0FBQzVGLGdHQUFzRjtBQUN0RixpRkFBMkU7QUFRM0U7SUFBcUMsbUNBQWE7SUFjOUM7UUFBQSxZQUNJLGlCQUFPLFNBR1Y7UUFoQkQsaUJBQVcsR0FBRyx1QkFBVyxDQUFDO1FBQzFCLGtCQUFZLEdBQUcsd0JBQVksQ0FBQztRQWF4QixLQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixLQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQzs7SUFDdkIsQ0FBQztJQUVELGtDQUFRLEdBQVI7SUFFQSxDQUFDO0lBRUQsZ0NBQU0sR0FBTjtRQUNJLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNwQixJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3hFO0lBQ0wsQ0FBQztJQUVELHFDQUFXLEdBQVg7UUFBQSxpQkFJQztRQUhHLGdDQUFXLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU87WUFDNUQsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsOEJBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRCw4QkFBSSxHQUFKLFVBQUssTUFBYztRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUks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LENBQUM7SUFFUCxDQUFDO0lBdkY4QjtRQUE5QixnQkFBUyxDQUFDLGdEQUFrQixDQUFDO2tDQUFxQixnREFBa0I7K0RBQUM7SUFDeEM7UUFBN0IsZ0JBQVMsQ0FBQywwQ0FBaUIsQ0FBQztrQ0FBYywwQ0FBaUI7d0RBQUM7SUFacEQsZUFBZTtRQU4zQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsV0FBVyxFQUFFLGtDQUFrQztZQUMvQyxTQUFTLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztTQUNqRCxDQUFDOztPQUNXLGVBQWUsQ0FtRzNCO0lBQUQsc0JBQUM7Q0FuR0QsQUFtR0MsQ0FuR29DLDhCQUFhLEdBbUdqRDtBQW5HWSwwQ0FBZSIsImZpbGUiOiJhcHAvY291cnNlL2Vucm9sbG1lbnQvY2xhc3MtbGlzdC9jbGFzcy1saXN0LWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIEFmdGVyVmlld0luaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlQ2xhc3MgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtY2xhc3MubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlTWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHUk9VUF9DQVRFR09SWSwgQ0xBU1NfU1RBVFVTLCBDT1VSU0VfTU9ERSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgQ291cnNlRW5yb2xsRGlhbG9nIH0gZnJvbSAnLi4vZW5yb2xsbWVudC1kaWFsb2cvZW5yb2xsbWVudC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IENvdXJzZUNsYXNzRGlhbG9nIH0gZnJvbSAnLi4vY2xhc3MtZGlhbG9nL2NsYXNzLWRpYWxvZy5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnY2xhc3MtbGlzdC1kaWFsb2cnLFxuICAgIHRlbXBsYXRlVXJsOiAnY2xhc3MtbGlzdC1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydjbGFzcy1saXN0LWRpYWxvZy5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIENsYXNzTGlzdERpYWxvZyBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQ09VUlNFX01PREUgPSBDT1VSU0VfTU9ERTtcbiAgICBDTEFTU19TVEFUVVMgPSBDTEFTU19TVEFUVVM7XG5cbiAgICBwcml2YXRlIGNsYXNzZXM6IENvdXJzZUNsYXNzW107XG4gICAgcHJpdmF0ZSBzZWxlY3RlZENsYXNzOiBhbnk7XG4gICAgcHJpdmF0ZSBjb3Vyc2U6IENvdXJzZTtcbiAgICBwcml2YXRlIHRlYWNoZXJzOiBhbnk7XG4gICAgcHJpdmF0ZSBkaXNwbGF5OiBib29sZWFuO1xuXG4gICAgQFZpZXdDaGlsZChDb3Vyc2VFbnJvbGxEaWFsb2cpIGNvdXJzZUVucm9sbERpYWxvZzogQ291cnNlRW5yb2xsRGlhbG9nO1xuICAgIEBWaWV3Q2hpbGQoQ291cnNlQ2xhc3NEaWFsb2cpIGNsYXNzRGlhbG9nOiBDb3Vyc2VDbGFzc0RpYWxvZztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmNsYXNzZXMgPSBbXTtcbiAgICAgICAgdGhpcy50ZWFjaGVycyA9IFtdO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgfVxuXG4gICAgZW5yb2xsKCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZENsYXNzKSB7XG4gICAgICAgICAgICB0aGlzLmNvdXJzZUVucm9sbERpYWxvZy5lbnJvbGxDbGFzcyh0aGlzLmNvdXJzZSwgdGhpcy5zZWxlY3RlZENsYXNzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWRDbGFzc2VzKCkge1xuICAgICAgICBDb3Vyc2VDbGFzcy5saXN0QnlDb3Vyc2UodGhpcywgdGhpcy5jb3Vyc2UuaWQpLnN1YnNjcmliZShjbGFzc2VzID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NlcyA9IGNsYXNzZXM7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHNob3coY291cnNlOiBDb3Vyc2UpIHtcbiAgICAgICAgdGhpcy5jb3Vyc2UgPSBjb3Vyc2U7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IHRydWU7XG4gICAgICAgIHRoaXMubG9hZENsYXNzZXMoKTtcbiAgICB9XG5cbiAgICBhZGRDbGFzcygpIHtcbiAgICAgICAgdmFyIGNsYXp6ID0gbmV3IENvdXJzZUNsYXNzKCk7XG4gICAgICAgIGNsYXp6LmNvdXJzZV9pZCA9IHRoaXMuY291cnNlLmlkO1xuICAgICAgICBjbGF6ei5jb3Vyc2VfbmFtZSA9IHRoaXMuY291cnNlLm5hbWU7XG4gICAgICAgIHRoaXMuY2xhc3NEaWFsb2cuc2hvdyhjbGF6eik7XG4gICAgICAgIHRoaXMuY2xhc3NEaWFsb2cub25DcmVhdGVDb21wbGV0ZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkQ2xhc3NlcygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBlZGl0Q2xhc3MoKSB7XG4gICAgICAgIHRoaXMuY2xhc3NEaWFsb2cuc2hvdyh0aGlzLnNlbGVjdGVkQ2xhc3MpO1xuICAgIH1cblxuICAgIGRlbGV0ZUNsYXNzKCkge1xuICAgICAgICBDb3Vyc2VNZW1iZXIubGlzdEJ5Q2xhc3ModGhpcywgdGhpcy5zZWxlY3RlZENsYXNzLmlkKS5zdWJzY3JpYmUoKG1lbWJlcnMpID0+IHtcbiAgICAgICAgICAgIGlmIChtZW1iZXJzLmxlbmd0aClcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yKHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdZb3UgY2Fubm90IGRlbGV0ZSBjbGFzcyB3aXRoIG1lbWJlciBpbnNpZGUnKSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maXJtKHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdBcmUgeW91IHN1cmUgdG8gZGVsZXRlPycpLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDbGFzcy5kZWxldGUodGhpcykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZENsYXNzZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjbG9zZUNsYXNzKCkge1xuICAgICAgICBpZiAoIXRoaXMuQ29udGV4dFVzZXIuSXNTdXBlckFkbWluICYmIHRoaXMuQ29udGV4dFVzZXIuaWQgIT0gdGhpcy5zZWxlY3RlZENsYXNzLnN1cGVydmlzb3JfaWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoJ1lvdSBkbyBub3QgaGF2ZSBjbG9zZSBwZXJtaXNzaW9uIGZvciB0aGlzIGNsYXNzLiAgWW91IHdpbGwgbm90IGJlIGFibGUgdG8gZW5yb2xsIG5ldyBtZW1iZXJzIGFmdGVyIHRoZSBjbGFzcyBpcyBjbG9zZWQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB0byBwcm9jZWVkID8nLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2xhc3MuY2xvc2UodGhpcykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2xhc3Muc3RhdHVzID0gJ2Nsb3NlZCc7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzKCdDbGFzcyBjbG9zZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9wZW5DbGFzcygpIHtcbiAgICAgICAgaWYgKHRoaXMuQ29udGV4dFVzZXIuSXNTdXBlckFkbWluICYmIHRoaXMuQ29udGV4dFVzZXIuaWQgIT0gdGhpcy5zZWxlY3RlZENsYXNzLnN1cGVydmlzb3JfaWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoJ1lvdSBkbyBub3QgaGF2ZSBvcGVuIHBlcm1pc3Npb24gZm9yIHRoaXMgY2xhc3MnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB0byBwcm9jZWVkID8uJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENsYXNzLm9wZW4odGhpcykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2xhc3Muc3RhdHVzID0gJ29wZW4nO1xuICAgICAgICAgICAgICAgIHRoaXMuc3VjY2VzcygnU3VydmV5IG9wZW4nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgIH1cbn1cbiJdfQ==
