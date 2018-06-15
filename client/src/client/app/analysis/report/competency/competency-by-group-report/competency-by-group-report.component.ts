import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, Subject } from 'rxjs/Rx';
import { APIService } from '../../../../shared/services/api.service';
import { ReportUtils } from '../../../../shared/helpers/report.utils';
import { Group } from '../../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { User } from '../../../../shared/models/elearning/user.model';
import { CourseLog } from '../../../../shared/models/elearning/log.model';
import { Competency } from '../../../../shared/models/elearning/competency.model';
import { CompetencyLevel } from '../../../../shared/models/elearning/competency-level.model';
import * as _ from 'underscore';
import { EXPORT_DATETIME_FORMAT, REPORT_CATEGORY, GROUP_CATEGORY, COURSE_MODE, COURSE_MEMBER_ENROLL_STATUS, EXPORT_DATE_FORMAT } from '../../../../shared/models/constants'
import { Report } from '../../report.decorator';
import { TimeConvertPipe } from '../../../../shared/pipes/time.pipe';
import { ExcelService } from '../../../../shared/services/excel.service';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseModel } from '../../../../shared/models/base.model';
import { Achivement } from '../../../../shared/models/elearning/achievement.model';

@Component({
	moduleId: module.id,
	selector: 'competency-by-group-report',
	templateUrl: 'competency-by-group-report.component.html',
	styleUrls: ['competency-by-group-report.component.css'],
})

export class CompetencyByGroupReportComponent extends BaseComponent implements OnInit {

	private records: any;
    private reportUtils: ReportUtils;
    private competency: Competency;
    private levels: CompetencyLevel[];

	constructor(private excelService: ExcelService, private datePipe: DatePipe, private timePipe: TimeConvertPipe) {
		super();
		this.reportUtils = new ReportUtils();
		this.competency =  new Competency();
		this.levels = [];
	}

	ngOnInit() {
	}

	clear() {
		this.records = [];
	}

	export() {
		var output = _.map(this.records, record=> {
			var exportRow = { 'Group': record['group_name']};
			_.each(this.levels, (level:CompetencyLevel)=> {
				exportRow[level.name] = record[level.id];
			});
			return exportRow;
		});
		this.excelService.exportAsExcelFile(output, 'competency_by_group_report');
	}

	render(competency: Competency, groups: Group[]) {
		this.clear();
		this.competency =  competency;
		CompetencyLevel.listByCompetency(this, this.competency.id).subscribe(levels=> {
			this.levels =  levels;
			this.generateReport(competency, groups);
		});
		
	}

	generateReport(competency: Competency, groups: Group[]) {
		var apiList = [];
		for (var i=0;i<groups.length; i++) {
			apiList.push(Achivement.__api__listByGroup(groups[i].id));
		};
		BaseModel.bulk_search(this, ...apiList).subscribe(jsonArr => {
			for (var i=0;i<groups.length; i++) {
				var skills = Achivement.toArray(jsonArr[i])
				var record = this.generateReportRow(groups[i], skills);
				this.records.push(record);
			}
		});
	}

	generateReportRow(group: Group, achievements: Achivement[]): any {
		var record = {};
		record["group_name"] = group.name;
		_.each(this.levels, (level:CompetencyLevel)=> {
			record[level.id] = 0;
		});
		var skillSets = _.groupBy(achievements,'user_id');
		_.each(skillSets, (skillSet:Achivement[])=> {
			var skill = _.max(skillSet, (obj:Achivement)=> {
				return obj.date_acquire.getTime();
			});
			record[skill.competency_level_id] +=1;
		});
		return record;
	}

}
