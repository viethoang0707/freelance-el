import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, Subject } from 'rxjs/Rx';
import { APIService } from '../../../shared/services/api.service';
import { ReportUtils } from '../../../shared/helpers/report.utils';
import { Exam } from '../../../shared/models/exam.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/user.model';
import { UserLog } from '../../../shared/models/log.model';
import { ExamGrade } from '../../../shared/models/exam-grade.model';
import { Submission } from '../../../shared/models/submission.model';
import { Answer } from '../../../shared/models/answer.model';
import { ExamMember } from '../../../shared/models/exam-member.model';
import * as _ from 'underscore';
import { EXPORT_DATETIME_FORMAT, REPORT_CATEGORY, GROUP_CATEGORY, COURSE_MODE, COURSE_MEMBER_ENROLL_STATUS, EXPORT_DATE_FORMAT } from '../../../shared/models/constants'
import { Report } from '../../report.decorator';
import { SelectGroupDialog } from '../../../shared/components/select-group-dialog/select-group-dialog.component';
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { TimeConvertPipe} from '../../../shared/pipes/time.pipe';
import { ExcelService } from '../../../shared/services/excel.service';


@Component({
    moduleId: module.id,
    selector: 'etraining-exam-result-report',
    templateUrl: 'exam-result-report.component.html',
})
@Report({
    title:'Exam result report',
    category:REPORT_CATEGORY.EXAM
})
export class ExamResultReportComponent extends BaseComponent implements OnInit{

    records: any;
    exams: Exam[];
    selectedExam: any;

    constructor(private reportUtils: ReportUtils, private excelService: ExcelService, private datePipe: DatePipe) {
        super();
    }

    ngOnInit() {
    	Exam.all(this).subscribe(exams => {
    		this.exams = exams;
    	});
    }

    export() {
    	var header = [
    		this.translateService.instant('Name'),
    		this.translateService.instant('Login'),
    		this.translateService.instant('User group'),
    		this.translateService.instant('Attempt date'),
    		this.translateService.instant('Score'),
    		this.translateService.instant('Result'),
    	]
    	this.excelService.exportAsExcelFile(header.concat(this.records),'course_by_member_report');
    }

    selectExam() {
    	if (this.selectedExam) {
    		ExamMember.listByExam(this, this.selectedExam.id).subscribe(members => {
				ExamGrade.listByExam(this,this.selectedExam.id).subscribe(grades => {
					this.generateReport(this.selectedExam, grades, members).subscribe(records => {
		    			this.records = records;
		    		});
				});
			});	
    	}
    }


    generateReport(exam: Exam, grades: ExamGrade[], members: ExamMember[]):Observable<any> {
        var subscriptions =[];
    	_.each(members, (member:ExamMember)=> {
    		var subscription = UserLog.userExamActivity(this, member.user_id, exam.id).flatMap(logs => {
    			return Submission.byMember(this, member.id).flatMap((submit:Submission) => {
                    if (!submit)
                        return Observable.of([]);
    				return Answer.listBySubmit(this, submit.id).map(answers => {
    					return this.generateReportRow(exam, grades, member, answers, logs);
    				});
    			});
    		});	
    		subscriptions.push(subscription);	
    	});		
    	return Observable.zip(...subscriptions);
    }

    generateReportRow(exam:Exam, grades: ExamGrade[], member: ExamMember, answers: Answer[], logs: UserLog[]):any {
    	var record = {};
	    record["user_login"] =  member.login;
	    record["user_name"] = member.name;
	    record["user_group"] = member.etraining_group_id__DESC__;
	    record["score"] = _.reduce(answers,  (sum, ans)=> {
    		return sum + ans.score;
		},0);
	    var result = this.reportUtils.analyzeExamActivity(logs);
	    if (result[0] != Infinity)
	    	record["date_attempt"] =  this.datePipe.transform(result[0],EXPORT_DATETIME_FORMAT);
    	var grade = _.find(grades, (obj)=> {
    		return obj.min_score <= record["score"] && obj.max_score >= record["score"]
    	});
    	if (grade)
    		record["grade"] = grade.name;
	    return record;
    }

}
