import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Course } from '../../../shared/models/elearning/course.model';
import { User } from '../../../shared/models/elearning/user.model';
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { SelectItem, MenuItem } from 'primeng/api';
import { GROUP_CATEGORY, COURSE_STATUS, COURSE_MODE, COURSE_MEMBER_ROLE,
 COURSE_MEMBER_STATUS, COURSE_MEMBER_ENROLL_STATUS, COURSE_UNIT_TYPE, EXAM_STATUS } from '../../../shared/models/constants'
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { Subscription } from 'rxjs/Subscription';
import { ClassConferenceDialog } from '../class-conference/class-conference.dialog.component';
import { ClassExamListDialog } from '../class-exam-list/class-exam-list.dialog.component';
import { GradebookListDialog } from '../gradebook-list/gradebook-list.component';
import { CourseFaq } from '../../../shared/models/elearning/course-faq.model';
import { CourseFaqDialog } from '../course-faq/course-faq.dialog.component';
import { CourseMaterial } from '../../../shared/models/elearning/course-material.model';
import { CourseMaterialDialog } from '../course-material/course-material.dialog.component';
import { CourseSyllabus } from '../../../shared/models/elearning/course-syllabus.model';
import { SyllabusUtils } from '../../../shared/helpers/syllabus.utils';
import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
// import { SelectItem } from 'primeng/api';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { ExamQuestion } from '../../../shared/models/elearning/exam-question.model';
// import { Group } from '../../../shared/models/elearning/group.model';
// import { Submission } from '../../../shared/models/elearning/submission.model';
// import { SelectItem } from 'primeng/api';
import { ExamContentDialog } from '../../../cms/exam/content-dialog/exam-content.dialog.component';
import { ExamStudyDialog } from '../../exam/exam-study/exam-study.dialog.component';
import { ReportUtils } from '../../../shared/helpers/report.utils';
import { Route } from '@angular/router';
import { ClassExam } from '../../../shared/models/elearning/class-exam.model';
import { Certificate } from '../../../shared/models/elearning/course-certificate.model';
import { CertificatePrintDialog } from '../certificate-print/certificate-print.dialog.component';
import { AnswerPrintDialog } from '../../exam/answer-print/answer-print.dialog.component';
import { CourseUnitStudyDialog } from '../course-unit-study-dialog/course-unit-study.dialog.component';

@Component({
    moduleId: module.id,
    selector: 'course-study',
    templateUrl: 'course-study.component.html',
})
export class CourseStudyComponent extends BaseComponent implements OnInit{

	course:Course;
	member: CourseMember;
	faqs: CourseFaq[];
	materials: CourseMaterial[];
	tree: TreeNode[];
	syl: CourseSyllabus;
	selectedNode: TreeNode;
	units: CourseUnit[];
	selectedUnit:CourseUnit;
	exams: Exam[];
	completedExams: Exam[];
	certificate: Certificate;
	classes: CourseClass[];

	@ViewChild(CourseMaterialDialog) materialDialog: CourseMaterialDialog;
	@ViewChild(CourseFaqDialog) faqDialog: CourseFaqDialog;
    @ViewChild(ExamStudyDialog) examStudyDialog: ExamStudyDialog;
    @ViewChild(AnswerPrintDialog) answerSheetDialog: AnswerPrintDialog;
    @ViewChild(CertificatePrintDialog) certPrintDialog: CertificatePrintDialog;
    @ViewChild(CourseUnitStudyDialog) courseStudyDialog: CourseUnitStudyDialog;

    COURSE_UNIT_TYPE = COURSE_UNIT_TYPE;
	EXAM_STATUS = EXAM_STATUS;


	constructor(private router: Router, private route: ActivatedRoute, private sylUtils:SyllabusUtils,private reportUtils: ReportUtils) {
		super();
		this.course = new Course();
		this.member = new CourseMember();
		this.certificate = new Certificate();
	}

	ngOnInit() {
		this.route.params.subscribe(params => { 
	        var memberId = +params['memberId']; 
	        var courseId = +params['courseId']; 
	        Course.get(this, courseId).subscribe(course => {
	        	CourseMember.get(this, memberId).subscribe(member => {
	        		this.member =  member;
					this.course =  course;
					CourseClass.listByCourse(this, course.id)
					.map(classList => {
						return _.filter(classList, (obj:CourseClass)=> {
							return member.class_id == obj.id;
						});
					})
					.subscribe(classList => {
						this.classes =  classList;
					});
					this.loadFaqs();
					this.loadMaterials();
					this.loadExam();
					this.loadGradebook();
					this.loadCertificate();
	        	});
	        	CourseSyllabus.byCourse(this, course.id).subscribe(syl=> {
		        	CourseUnit.listBySyllabus(this,syl.id).subscribe(units => {
						this.units = units;
						this.tree = this.sylUtils.buildTree(units);
			        });
		        });
	        });
	        
	    }); 
	}

	nodeSelect(event:any) {
		if (this.selectedNode) {
			this.selectedUnit =  this.selectedNode.data;
		}
	}

	studyUnit() {
		if (this.selectedUnit)
			this.courseStudyDialog.show(this.selectedUnit);
	}

	loadCertificate() {
		Certificate.byMember(this, this.member.id).subscribe((certificate:any) => {
            this.certificate = certificate;
        });
	}

	loadExam() {
		if (this.member.class_id)
			ClassExam.listByClass(this, this.member.class_id).subscribe(classExams=> {
				var examIds = _.pluck(classExams, 'exam_id');
				ExamMember.listByUser(this, this.authService.UserProfile.id).subscribe(members => {
					members = _.filter(members, member=> {
						return member.enroll_status!='completed' && _.contains(examIds, member.exam_id);
					});
					var examIds = _.pluck(members, 'exam_id');
		            Exam.array(this, examIds)
		                .subscribe(exams => {
		                    _.each(exams, (exam) => {
		                        exam.member = _.find(members, (member: ExamMember) => {
		                            return member.exam_id == exam.id;
		                        });
		                        exam.member.examScore(this, exam.id).subscribe(score => {
		                            exam.member.score = score;
		                        });
		                        ExamQuestion.countByExam(this, exam.id).subscribe(count => {
		                            exam.question_count = count;
		                        });
		                        exam.examMemberData = {};
		                        ExamMember.listByExam(this, exam.id).subscribe(members => {
		                            exam.examMemberData = this.reportUtils.analyseExamMember(exam, members);
		                        });
		                    });
		                    this.exams = _.filter(exams, (exam) => {
		                        return exam.member.role == 'supervisor' || (exam.member.role == 'candidate' && exam.status == 'published');
		                    });

		                    this.exams.sort((exam1, exam2): any => {
		                        if (exam1.create_date > exam2.create_date)
		                            return -1;
		                        else if (exam1.create_date < exam2.create_date)
		                            return 1;
		                        else
		                            return 0;
		                    });
		                });
		            });
			});	
	}

	loadGradebook() {
		if (this.member.class_id)
			ClassExam.listByClass(this, this.member.class_id).subscribe(classExams=> {
				var examIds = _.pluck(classExams, 'exam_id');
				ExamMember.listByUser(this, this.authService.UserProfile.id).subscribe(members => {
					members = _.filter(members, member=> {
						return member.enroll_status=='completed' && _.contains(examIds, member.exam_id);
					});
					var examIds = _.pluck(members, 'exam_id');
		            Exam.array(this, examIds)
		                .subscribe(exams => {
		                    _.each(exams, (exam) => {
		                        exam.member = _.find(members, (member: ExamMember) => {
		                            return member.exam_id == exam.id;
		                        });
		                        exam.member.examScore(this, exam.id).subscribe(score => {
		                            exam.member.score = score;
		                        });
		                        ExamQuestion.countByExam(this, exam.id).subscribe(count => {
		                            exam.question_count = count;
		                        });
		                        exam.examMemberData = {};
		                        ExamMember.listByExam(this, exam.id).subscribe(members => {
		                            exam.examMemberData = this.reportUtils.analyseExamMember(exam, members);
		                        });
		                    });
		                    this.completedExams = _.filter(exams, (exam) => {
		                        return exam.member.role == 'supervisor' || (exam.member.role == 'candidate' && exam.status == 'published');
		                    });

		                    this.completedExams.sort((exam1, exam2): any => {
		                        if (exam1.create_date > exam2.create_date)
		                            return -1;
		                        else if (exam1.create_date < exam2.create_date)
		                            return 1;
		                        else
		                            return 0;
		                    });
		                });
		            });
			});	
	}

	loadFaqs() {
		CourseFaq.listByCourse(this, this.course.id)
			.subscribe(faqs => {
				this.faqs = faqs;
			})
	}

	loadMaterials() {
		CourseMaterial.listByCourse(this, this.course.id)
			.subscribe(materials => {
				this.materials = materials;
			});
	}

	startExam(exam: Exam, member: ExamMember) {
        this.confirm('Are you sure to start ?', () => {
                this.examStudyDialog.show(exam, member);
            }
        );
    }
}
