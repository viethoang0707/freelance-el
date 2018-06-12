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
var cache_utils_1 = require("../../helpers/cache.utils");
var search_read_api_1 = require("../../services/api/search-read.api");
var _ = require("underscore");
var CompetencyLevel = (function (_super) {
    __extends(CompetencyLevel, _super);
    function CompetencyLevel() {
        var _this = _super.call(this) || this;
        _this.name = undefined;
        _this.order = undefined;
        _this.competency_id = undefined;
        _this.competency_name = undefined;
        _this.competency_group_id = undefined;
        _this.competency_group_name = undefined;
        return _this;
    }
    CompetencyLevel_1 = CompetencyLevel;
    CompetencyLevel.__api__listByCompetency = function (competencyId) {
        return new search_read_api_1.SearchReadAPI(CompetencyLevel_1.Model, [], "[('competency_id','='," + competencyId + ")]");
    };
    CompetencyLevel.listByCompetency = function (context, competencyId) {
        if (cache_utils_1.Cache.hit(CompetencyLevel_1.Model)) {
            var levels = cache_utils_1.Cache.load(CompetencyLevel_1.Model);
            levels = _.filter(levels, function (level) {
                return level.competency_id == competencyId;
            });
            return Rx_1.Observable.of(levels);
        }
        return CompetencyLevel_1.search(context, [], "[('competency_id','='," + competencyId + ")]");
    };
    var CompetencyLevel_1;
    CompetencyLevel = CompetencyLevel_1 = __decorate([
        decorator_1.Model('etraining.competency_level'),
        __metadata("design:paramtypes", [])
    ], CompetencyLevel);
    return CompetencyLevel;
}(base_model_1.BaseModel));
exports.CompetencyLevel = CompetencyLevel;
//# sourceMappingURL=competency-level.model.js.map