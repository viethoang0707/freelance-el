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
var option_model_1 = require("./option.model");
var _ = require("underscore");
var cache_utils_1 = require("../../helpers/cache.utils");
var search_read_api_1 = require("../../services/api/search-read.api");
var bulk_search_read_api_1 = require("../../services/api/bulk-search-read.api");
var map_utils_1 = require("../../helpers/map.utils");
var execute_api_1 = require("../../services/api/execute.api");
var Question = (function (_super) {
    __extends(Question, _super);
    function Question() {
        var _this = _super.call(this) || this;
        _this.title = undefined;
        _this.content = undefined;
        _this.explanation = undefined;
        _this.type = undefined;
        _this.level = undefined;
        _this.group_id = undefined;
        _this.group_id__DESC__ = undefined;
        _this.max_rating = undefined;
        _this.options = [];
        return _this;
    }
    Question_1 = Question;
    Question.__api__listByGroup = function (groupId) {
        return new search_read_api_1.SearchReadAPI(Question_1.Model, [], "[('group_id','='," + groupId + ")]");
    };
    Question.listByGroup = function (context, groupId) {
        if (cache_utils_1.Cache.hit(Question_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Question_1.Model)).map(function (questions) {
                return _.filter(questions, function (q) {
                    return q.group_id == groupId;
                });
            });
        return Question_1.search(context, [], "[('group_id','='," + groupId + ")]");
    };
    Question.listByGroups = function (context, groupIds) {
        var api = new bulk_search_read_api_1.BulkSearchReadAPI();
        _.each(groupIds, function (groupId) {
            var subApi = new search_read_api_1.SearchReadAPI(Question_1.Model, [], "[('group_id','='," + groupId + ")]");
            api.add(subApi);
        });
        return context.apiService.execute(api, context.authService.LoginToken).map(function (questionArrs) {
            questionArrs = _.flatten(questionArrs);
            return _.map(questionArrs, function (question) {
                return map_utils_1.MapUtils.deserializeModel(Question_1.Model, question);
            });
        });
    };
    Question.prototype.__api__populateOption = function () {
        return option_model_1.QuestionOption.__api__listByQuestion(this.id);
    };
    Question.prototype.populateOption = function (context) {
        var _this = this;
        if (this.id)
            return option_model_1.QuestionOption.listByQuestion(context, this.id).map(function (options) {
                _this.options = options;
                return _this;
            });
        else
            return Rx_1.Observable.of(this);
    };
    Question.populateOptions = function (context, questions) {
        var apiList = _.map(questions, function (question) {
            return question.__api__populateOption();
        });
        return base_model_1.BaseModel.bulk_search.apply(base_model_1.BaseModel, [context].concat(apiList)).map(function (jsonArr) {
            return _.flatten(jsonArr);
        })
            .do(function (jsonArr) {
            var options = option_model_1.QuestionOption.toArray(jsonArr);
            _.each(questions, function (question) {
                question.options = _.filter(options, function (option) {
                    return option.question_id == question.id;
                });
            });
        });
    };
    Question.__api__import_question = function (questions, options) {
        return new execute_api_1.ExecuteAPI(Question_1.Model, 'import_question', { questions: questions, options: options }, null);
    };
    Question.importQuestion = function (context, questions, options) {
        return context.apiService.execute(Question_1.__api__import_question(questions, options), context.authService.LoginToken);
    };
    var Question_1;
    Question = Question_1 = __decorate([
        decorator_1.Model('etraining.question'),
        __metadata("design:paramtypes", [])
    ], Question);
    return Question;
}(base_model_1.BaseModel));
exports.Question = Question;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9xdWVzdGlvbi5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBMEM7QUFDMUMsOEJBQThDO0FBQzlDLDBDQUFxQztBQUNyQywrQ0FBZ0Q7QUFFaEQsOEJBQWdDO0FBQ2hDLHlEQUFrRDtBQUNsRCxzRUFBbUU7QUFFbkUsZ0ZBQTRFO0FBQzVFLHFEQUFtRDtBQUNuRCw4REFBNEQ7QUFHNUQ7SUFBOEIsNEJBQVM7SUFHbkM7UUFBQSxZQUNJLGlCQUFPLFNBV2I7UUFUQSxLQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixLQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUN6QixLQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUM3QixLQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUNoQixLQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixLQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUMxQixLQUFJLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDO1FBQ2xDLEtBQUksQ0FBQyxVQUFVLEdBQUksU0FBUyxDQUFDO1FBQzdCLEtBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDOztJQUN6QixDQUFDO2lCQWZXLFFBQVE7SUEyQlYsMkJBQWtCLEdBQXpCLFVBQTBCLE9BQWU7UUFDckMsT0FBTyxJQUFJLCtCQUFhLENBQUMsVUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsbUJBQW1CLEdBQUMsT0FBTyxHQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFTSxvQkFBVyxHQUFsQixVQUFtQixPQUFrQixFQUFFLE9BQU87UUFDMUMsSUFBSSxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxVQUFRLENBQUMsS0FBSyxDQUFDO1lBQ3pCLE9BQU8sZUFBVSxDQUFDLEVBQUUsQ0FBQyxtQkFB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QkFDeEQsT0FBTyxNQUFNLENBQUMsV0FBVyxJQUFJLFFBQVEsQ0FBQyxFQUFFLENBQUM7Z0JBQzdDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFTSwrQkFBc0IsR0FBN0IsVUFBOEIsU0FBYyxFQUFFLE9BQVk7UUFDdEQsT0FBTyxJQUFJLHdCQUFVLENBQUMsVUFBUSxDQUFDLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pHLENBQUM7SUFFTSx1QkFBYyxHQUFyQixVQUFzQixPQUFrQixFQUFFLFNBQWMsRUFBRSxPQUFZO1FBQ2xFLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBUSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsRUFDakYsT0FBTyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUV4QyxDQUFDOztJQWhHUSxRQUFRO1FBRHBCLGlCQUFLLENBQUMsb0JBQW9CLENBQUM7O09BQ2YsUUFBUSxDQWtHcEI7SUFBRCxlQUFDO0NBbEdELEFBa0dDLENBbEc2QixzQkFBUyxHQWtHdEM7QUFsR1ksNEJBQVEiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3F1ZXN0aW9uLm1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uL2RlY29yYXRvcic7XG5pbXBvcnQgeyBRdWVzdGlvbk9wdGlvbiB9IGZyb20gJy4vb3B0aW9uLm1vZGVsJztcbmltcG9ydCB7IEFQSUNvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBDYWNoZSB9IGZyb20gJy4uLy4uL2hlbHBlcnMvY2FjaGUudXRpbHMnO1xuaW1wb3J0IHsgU2VhcmNoUmVhZEFQSSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9zZWFyY2gtcmVhZC5hcGknO1xuaW1wb3J0IHsgQ3JlYXRlQVBJIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL2NyZWF0ZS5hcGknO1xuaW1wb3J0IHsgQnVsa1NlYXJjaFJlYWRBUEkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvYnVsay1zZWFyY2gtcmVhZC5hcGknO1xuaW1wb3J0IHsgTWFwVXRpbHMgfSBmcm9tICcuLi8uLi9oZWxwZXJzL21hcC51dGlscyc7XG5pbXBvcnQgeyBFeGVjdXRlQVBJIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL2V4ZWN1dGUuYXBpJztcblxuQE1vZGVsKCdldHJhaW5pbmcucXVlc3Rpb24nKVxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uIGV4dGVuZHMgQmFzZU1vZGVse1xuXG4gICAgLy8gRGVmYXVsdCBjb25zdHJ1Y3RvciB3aWxsIGJlIGNhbGxlZCBieSBtYXBwZXJcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXHRcdFxuXHRcdHRoaXMudGl0bGUgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5jb250ZW50ID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuZXhwbGFuYXRpb24gPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy50eXBlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmxldmVsID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmdyb3VwX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmdyb3VwX2lkX19ERVNDX18gPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubWF4X3JhdGluZyA9ICB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IFtdO1xuXHR9XG5cbiAgICB0aXRsZTpzdHJpbmc7XG4gICAgY29udGVudDogc3RyaW5nO1xuICAgIGV4cGxhbmF0aW9uOiBzdHJpbmc7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIGxldmVsOiBzdHJpbmc7XG4gICAgZ3JvdXBfaWQ6IG51bWJlcjtcbiAgICBncm91cF9pZF9fREVTQ19fOiBzdHJpbmc7XG4gICAgbWF4X3JhdGluZzogbnVtYmVyO1xuICAgIG9wdGlvbnM6IFF1ZXN0aW9uT3B0aW9uW107XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RCeUdyb3VwKGdyb3VwSWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoUXVlc3Rpb24uTW9kZWwsIFtdLFwiWygnZ3JvdXBfaWQnLCc9JyxcIitncm91cElkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGxpc3RCeUdyb3VwKGNvbnRleHQ6QVBJQ29udGV4dCwgZ3JvdXBJZCk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgaWYgKENhY2hlLmhpdChRdWVzdGlvbi5Nb2RlbCkpXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZihDYWNoZS5sb2FkKFF1ZXN0aW9uLk1vZGVsKSkubWFwKHF1ZXN0aW9ucz0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5maWx0ZXIocXVlc3Rpb25zLCAocTpRdWVzdGlvbik9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBxLmdyb3VwX2lkID09IGdyb3VwSWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFF1ZXN0aW9uLnNlYXJjaChjb250ZXh0LFtdLFwiWygnZ3JvdXBfaWQnLCc9JyxcIitncm91cElkK1wiKV1cIik7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgbGlzdEJ5R3JvdXBzKGNvbnRleHQ6QVBJQ29udGV4dCwgZ3JvdXBJZHMpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHZhciBhcGkgPSBuZXcgQnVsa1NlYXJjaFJlYWRBUEkoKTtcbiAgICAgICAgXy5lYWNoKGdyb3VwSWRzLCBncm91cElkPT4ge1xuICAgICAgICAgICAgdmFyIHN1YkFwaSA9IG5ldyBTZWFyY2hSZWFkQVBJKFF1ZXN0aW9uLk1vZGVsLFtdLFwiWygnZ3JvdXBfaWQnLCc9JyxcIitncm91cElkK1wiKV1cIik7XG4gICAgICAgICAgICBhcGkuYWRkKHN1YkFwaSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY29udGV4dC5hcGlTZXJ2aWNlLmV4ZWN1dGUoYXBpLCBjb250ZXh0LmF1dGhTZXJ2aWNlLkxvZ2luVG9rZW4pLm1hcChxdWVzdGlvbkFycnMgPT4ge1xuICAgICAgICAgICAgcXVlc3Rpb25BcnJzID0gXy5mbGF0dGVuKHF1ZXN0aW9uQXJycyk7XG4gICAgICAgICAgICByZXR1cm4gXy5tYXAocXVlc3Rpb25BcnJzLCBxdWVzdGlvbj0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWFwVXRpbHMuZGVzZXJpYWxpemVNb2RlbChRdWVzdGlvbi5Nb2RlbCwgcXVlc3Rpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9fYXBpX19wb3B1bGF0ZU9wdGlvbigpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIFF1ZXN0aW9uT3B0aW9uLl9fYXBpX19saXN0QnlRdWVzdGlvbih0aGlzLmlkKTtcbiAgICB9XG5cbiAgICBwb3B1bGF0ZU9wdGlvbihjb250ZXh0OkFQSUNvbnRleHQpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmICh0aGlzLmlkKVxuICAgICAgICAgICAgcmV0dXJuIFF1ZXN0aW9uT3B0aW9uLmxpc3RCeVF1ZXN0aW9uKGNvbnRleHQsdGhpcy5pZCkubWFwKG9wdGlvbnM9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gIG9wdGlvbnM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YodGhpcyk7XG4gICAgfVxuXG4gICAgc3RhdGljIHBvcHVsYXRlT3B0aW9ucyhjb250ZXh0OkFQSUNvbnRleHQsIHF1ZXN0aW9uczogUXVlc3Rpb25bXSk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdmFyIGFwaUxpc3QgPSBfLm1hcChxdWVzdGlvbnMsKHF1ZXN0aW9uOlF1ZXN0aW9uKT0+IHtcbiAgICAgICAgICAgIHJldHVybiBxdWVzdGlvbi5fX2FwaV9fcG9wdWxhdGVPcHRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBCYXNlTW9kZWwuYnVsa19zZWFyY2goY29udGV4dCwgLi4uYXBpTGlzdClcbiAgICAgICAgLm1hcChqc29uQXJyID0+IHtcbiAgICAgICAgICAgIHJldHVybiBfLmZsYXR0ZW4oanNvbkFycik7XG4gICAgICAgIH0pXG4gICAgICAgIC5kbyhqc29uQXJyPT4ge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBRdWVzdGlvbk9wdGlvbi50b0FycmF5KGpzb25BcnIpO1xuICAgICAgICAgICAgXy5lYWNoKHF1ZXN0aW9ucywgKHF1ZXN0aW9uOlF1ZXN0aW9uKT0+IHtcbiAgICAgICAgICAgICAgICBxdWVzdGlvbi5vcHRpb25zID0gIF8uZmlsdGVyKG9wdGlvbnMsIChvcHRpb246UXVlc3Rpb25PcHRpb24pPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uLnF1ZXN0aW9uX2lkID09IHF1ZXN0aW9uLmlkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19pbXBvcnRfcXVlc3Rpb24ocXVlc3Rpb25zOiBhbnksIG9wdGlvbnM6IGFueSk6IEV4ZWN1dGVBUEkge1xuICAgICAgICByZXR1cm4gbmV3IEV4ZWN1dGVBUEkoUXVlc3Rpb24uTW9kZWwsICdpbXBvcnRfcXVlc3Rpb24nLHtxdWVzdGlvbnM6cXVlc3Rpb25zLG9wdGlvbnM6b3B0aW9uc30sIG51bGwpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpbXBvcnRRdWVzdGlvbihjb250ZXh0OkFQSUNvbnRleHQsIHF1ZXN0aW9uczogYW55LCBvcHRpb25zOiBhbnkpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBjb250ZXh0LmFwaVNlcnZpY2UuZXhlY3V0ZShRdWVzdGlvbi5fX2FwaV9faW1wb3J0X3F1ZXN0aW9uKHF1ZXN0aW9ucywgb3B0aW9ucyksIFxuICAgICAgICAgICAgY29udGV4dC5hdXRoU2VydmljZS5Mb2dpblRva2VuKTtcblxuICAgIH1cblxufVxuIl19
