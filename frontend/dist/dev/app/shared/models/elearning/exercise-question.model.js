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
var base_model_1 = require("../base.model");
var Rx_1 = require("rxjs/Rx");
var decorator_1 = require("../decorator");
var search_read_api_1 = require("../../services/api/search-read.api");
var search_count_api_1 = require("../../services/api/search-count.api");
var question_model_1 = require("./question.model");
var list_api_1 = require("../../services/api/list.api");
var _ = require("underscore");
var ExerciseQuestion = (function (_super) {
    __extends(ExerciseQuestion, _super);
    function ExerciseQuestion() {
        var _this = _super.call(this) || this;
        _this.title = undefined;
        _this.content = undefined;
        _this.explanation = undefined;
        _this.type = undefined;
        _this.level = undefined;
        _this.group_id = undefined;
        _this.question_id = undefined;
        _this.question = new question_model_1.Question();
        _this.unit_id = undefined;
        _this.score = undefined;
        _this.order = undefined;
        _this.sheet_id = undefined;
        _this.group_id__DESC__ = undefined;
        return _this;
    }
    ExerciseQuestion_1 = ExerciseQuestion;
    ExerciseQuestion.__api__listByExercise = function (exerciseId) {
        return new search_read_api_1.SearchReadAPI(ExerciseQuestion_1.Model, [], "[('unit_id','='," + exerciseId + ")]");
    };
    ExerciseQuestion.listByExercise = function (context, exerciseId) {
        return ExerciseQuestion_1.search(context, [], "[('unit_id','='," + exerciseId + ")]");
    };
    ExerciseQuestion.__api__countByExercise = function (exerciseId) {
        return new search_count_api_1.SearchCountAPI(ExerciseQuestion_1.Model, "[('unit_id','='," + exerciseId + ")]");
    };
    ExerciseQuestion.countByExercise = function (context, exerciseId) {
        return ExerciseQuestion_1.count(context, "[('exercise_id','='," + exerciseId + ")]");
    };
    ExerciseQuestion.prototype.__api__populateQuestion = function () {
        return new list_api_1.ListAPI(question_model_1.Question.Model, [this.question_id], []);
    };
    ExerciseQuestion.prototype.populateQuestion = function (context) {
        var _this = this;
        if (!this.question_id)
            return Rx_1.Observable.of(null);
        return question_model_1.Question.get(context, this.question_id).do(function (question) {
            _this.question = question;
        });
    };
    ExerciseQuestion.populateQuestions = function (context, exerciseQuestions) {
        var questionIds = _.pluck(exerciseQuestions, 'question_id');
        questionIds = _.filter(questionIds, function (id) {
            return id;
        });
        return question_model_1.Question.array(context, questionIds).do(function (questions) {
            _.each(exerciseQuestions, function (exerciseQuestion) {
                exerciseQuestion.question = _.find(questions, function (question) {
                    return exerciseQuestion.question_id == question.id;
                });
            });
        });
    };
    var ExerciseQuestion_1;
    ExerciseQuestion = ExerciseQuestion_1 = __decorate([
        decorator_1.Model('etraining.exercise_question'),
        __metadata("design:paramtypes", [])
    ], ExerciseQuestion);
    return ExerciseQuestion;
}(base_model_1.BaseModel));
exports.ExerciseQuestion = ExerciseQuestion;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGVyY2lzZS1xdWVzdGlvbi5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw0Q0FBMEM7QUFDMUMsOEJBQThDO0FBQzlDLDBDQUFxQztBQUVyQyxzRUFBbUU7QUFDbkUsd0VBQXFFO0FBQ3JFLG1EQUE0QztBQUM1Qyx3REFBc0Q7QUFFdEQsOEJBQWdDO0FBR2hDO0lBQXNDLG9DQUFTO0lBRzNDO1FBQUEsWUFDSSxpQkFBTyxTQWVWO1FBYkcsS0FBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDdkIsS0FBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDekIsS0FBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7UUFDN0IsS0FBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDdEIsS0FBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDdkIsS0FBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDMUIsS0FBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7UUFDN0IsS0FBSSxDQUFDLFFBQVEsR0FBSSxJQUFJLHlCQUFRLEVBQUUsQ0FBQztRQUNoQyxLQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUN6QixLQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixLQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixLQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUMxQixLQUFJLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDOztJQUN0QyxDQUFDO3lCQW5CUSxnQkFBZ0I7SUFtQ2xCLHNDQUFxQixHQUE1QixVQUE2QixVQUFrQjtRQUMzQyxPQUFPLElBQUksK0JBQWEsQ0FBQyxrQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLGtCQUFrQixHQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBRU0sK0JBQWMsR0FBckIsVUFBdUIsT0FBa0IsRUFBRSxVQUFrQjtRQUN6RCxPQUFPLGtCQUFnQixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLGtCQUFrQixHQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRU0sdUNBQXNCLEdBQTdCLFVBQThCLFVBQWtCO1FBQzVDLE9BQU8sSUFBSSxpQ0FBYyxDQUFDLGtCQUFnQixDQUFDLEtBQUssRUFBQyxrQkFBa0IsR0FBQyxVQUFVLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUVNLGdDQUFlLEdBQXRCLFVBQXdCLE9BQWtCLEVBQUUsVUFBa0I7UUFDMUQsT0FBTyxrQkFBZ0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFDLHNCQUFzQixHQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQsa0RBQXVCLEdBQXZCO1FBQ0ksT0FBTyxJQUFJLGtCQUFPLENBQUMseUJBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELDJDQUFnQixHQUFoQixVQUFpQixPQUFtQjtRQUFwQyxpQkFNQztRQUxHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztZQUNqQixPQUFPLGVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsT0FBTyx5QkFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFBLFFBQVE7WUFDdEQsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sa0NBQWlCLEdBQXhCLFVBQXlCLE9BQW1CLEVBQUUsaUJBQXFDO1FBQy9FLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0QsV0FBVyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLFVBQUEsRUFBRTtZQUNsQyxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyx5QkFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQUEsU0FBUztZQUNwRCxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLFVBQUMsZ0JBQWlDO2dCQUN4RCxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsVUFBQyxRQUF5QjtvQkFDckUsT0FBTyxnQkFBZ0IsQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLEVBQUUsQ0FBQztnQkFDdkQsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7SUEzRVEsZ0JBQWdCO1FBRDVCLGlCQUFLLENBQUMsNkJBQTZCLENBQUM7O09BQ3hCLGdCQUFnQixDQTZFNUI7SUFBRCx1QkFBQztDQTdFRCxBQTZFQyxDQTdFcUMsc0JBQVMsR0E2RTlDO0FBN0VZLDRDQUFnQiIsImZpbGUiOiJhcHAvc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhlcmNpc2UtcXVlc3Rpb24ubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYWNoZSB9IGZyb20gJy4uLy4uL2hlbHBlcnMvY2FjaGUudXRpbHMnO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uL2RlY29yYXRvcic7XG5pbXBvcnQgeyBBUElDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgeyBTZWFyY2hSZWFkQVBJIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL3NlYXJjaC1yZWFkLmFwaSc7XG5pbXBvcnQgeyBTZWFyY2hDb3VudEFQSSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9zZWFyY2gtY291bnQuYXBpJztcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSAnLi9xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBMaXN0QVBJIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL2xpc3QuYXBpJztcbmltcG9ydCB7IEJ1bGtMaXN0QVBJIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL2J1bGstbGlzdC5hcGknO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcblxuQE1vZGVsKCdldHJhaW5pbmcuZXhlcmNpc2VfcXVlc3Rpb24nKVxuZXhwb3J0IGNsYXNzIEV4ZXJjaXNlUXVlc3Rpb24gZXh0ZW5kcyBCYXNlTW9kZWx7XG5cbiAgICAvLyBEZWZhdWx0IGNvbnN0cnVjdG9yIHdpbGwgYmUgY2FsbGVkIGJ5IG1hcHBlclxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnRpdGxlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZXhwbGFuYXRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMudHlwZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5sZXZlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5ncm91cF9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5xdWVzdGlvbl9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5xdWVzdGlvbiA9ICBuZXcgUXVlc3Rpb24oKTtcbiAgICAgICAgdGhpcy51bml0X2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnNjb3JlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm9yZGVyID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnNoZWV0X2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmdyb3VwX2lkX19ERVNDX18gPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcXVlc3Rpb25faWQ6IG51bWJlcjtcbiAgICBxdWVzdGlvbjogUXVlc3Rpb247XG4gICAgdW5pdF9pZDogbnVtYmVyO1xuICAgIHNjb3JlOiBudW1iZXI7XG4gICAgb3JkZXI6IG51bWJlcjtcbiAgICBsZXZlbDogc3RyaW5nO1xuICAgIHRpdGxlOnN0cmluZztcbiAgICBjb250ZW50OiBzdHJpbmc7XG4gICAgZXhwbGFuYXRpb246IHN0cmluZztcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgZ3JvdXBfaWQ6IG51bWJlcjtcbiAgICBncm91cF9pZF9fREVTQ19fOiBzdHJpbmc7XG4gICAgc2hlZXRfaWQ6IG51bWJlcjtcblxuICAgIHN0YXRpYyBfX2FwaV9fbGlzdEJ5RXhlcmNpc2UoZXhlcmNpc2VJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShFeGVyY2lzZVF1ZXN0aW9uLk1vZGVsLCBbXSxcIlsoJ3VuaXRfaWQnLCc9JyxcIitleGVyY2lzZUlkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGxpc3RCeUV4ZXJjaXNlKCBjb250ZXh0OkFQSUNvbnRleHQsIGV4ZXJjaXNlSWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICAgICAgcmV0dXJuIEV4ZXJjaXNlUXVlc3Rpb24uc2VhcmNoKGNvbnRleHQsW10sXCJbKCd1bml0X2lkJywnPScsXCIrZXhlcmNpc2VJZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fY291bnRCeUV4ZXJjaXNlKGV4ZXJjaXNlSWQ6IG51bWJlcik6IFNlYXJjaENvdW50QVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hDb3VudEFQSShFeGVyY2lzZVF1ZXN0aW9uLk1vZGVsLFwiWygndW5pdF9pZCcsJz0nLFwiK2V4ZXJjaXNlSWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY291bnRCeUV4ZXJjaXNlKCBjb250ZXh0OkFQSUNvbnRleHQsIGV4ZXJjaXNlSWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICAgICAgcmV0dXJuIEV4ZXJjaXNlUXVlc3Rpb24uY291bnQoY29udGV4dCxcIlsoJ2V4ZXJjaXNlX2lkJywnPScsXCIrZXhlcmNpc2VJZCtcIildXCIpO1xuICAgIH1cblxuICAgIF9fYXBpX19wb3B1bGF0ZVF1ZXN0aW9uKCk6IExpc3RBUEkge1xuICAgICAgICByZXR1cm4gbmV3IExpc3RBUEkoUXVlc3Rpb24uTW9kZWwsIFt0aGlzLnF1ZXN0aW9uX2lkXSwgW10pO1xuICAgIH1cblxuICAgIHBvcHVsYXRlUXVlc3Rpb24oY29udGV4dDogQVBJQ29udGV4dCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmICghdGhpcy5xdWVzdGlvbl9pZClcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKG51bGwpO1xuICAgICAgICByZXR1cm4gUXVlc3Rpb24uZ2V0KGNvbnRleHQsIHRoaXMucXVlc3Rpb25faWQpLmRvKHF1ZXN0aW9uID0+IHtcbiAgICAgICAgICAgIHRoaXMucXVlc3Rpb24gPSBxdWVzdGlvbjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHBvcHVsYXRlUXVlc3Rpb25zKGNvbnRleHQ6IEFQSUNvbnRleHQsIGV4ZXJjaXNlUXVlc3Rpb25zOiBFeGVyY2lzZVF1ZXN0aW9uW10pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICB2YXIgcXVlc3Rpb25JZHMgPSBfLnBsdWNrKGV4ZXJjaXNlUXVlc3Rpb25zLCdxdWVzdGlvbl9pZCcpO1xuICAgICAgICBxdWVzdGlvbklkcyA9IF8uZmlsdGVyKHF1ZXN0aW9uSWRzLCBpZD0+IHtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBRdWVzdGlvbi5hcnJheShjb250ZXh0LCBxdWVzdGlvbklkcykuZG8ocXVlc3Rpb25zPT4ge1xuICAgICAgICAgICAgXy5lYWNoKGV4ZXJjaXNlUXVlc3Rpb25zLCAoZXhlcmNpc2VRdWVzdGlvbjpFeGVyY2lzZVF1ZXN0aW9uKT0+IHtcbiAgICAgICAgICAgICAgICBleGVyY2lzZVF1ZXN0aW9uLnF1ZXN0aW9uID0gIF8uZmluZChxdWVzdGlvbnMsIChxdWVzdGlvbjpFeGVyY2lzZVF1ZXN0aW9uKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4ZXJjaXNlUXVlc3Rpb24ucXVlc3Rpb25faWQgPT0gcXVlc3Rpb24uaWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=
