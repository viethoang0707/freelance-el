import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Course } from '../../../shared/models/elearning/course.model';
import { User } from '../../../shared/models/elearning/user.model';
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { ConferenceMember } from '../../../shared/models/elearning/conference-member.model';
import { Conference } from '../../../shared/models/elearning/conference.model';import { GROUP_CATEGORY, COURSE_STATUS, COURSE_MODE, COURSE_MEMBER_ROLE,
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
import { CourseLog } from '../../../shared/models/elearning/log.model';
import { SelectItem } from 'primeng/api';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { ExamQuestion } from '../../../shared/models/elearning/exam-question.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { ExamContentDialog } from '../../../cms/exam/content-dialog/exam-content.dialog.component';
import { ExamStudyDialog } from '../../exam/exam-study/exam-study.dialog.component';
import { ReportUtils } from '../../../shared/helpers/report.utils';
import { Route, } from '@angular/router';
import { ClassExam } from '../../../shared/models/elearning/class-exam.model';
import { Certificate } from '../../../shared/models/elearning/course-certificate.model';
import { CertificatePrintDialog } from '../certificate-print/certificate-print.dialog.component';
import { AnswerPrintDialog } from '../../exam/answer-print/answer-print.dialog.component';
import { MeetingService } from '../../../shared/services/meeting.service';
import { CourseUnitRegister } from '../../../cms/course/course-unit-template/unit.decorator';
import { CourseUnitContainerDirective } from '../../../cms/course/course-unit-template/unit-container.directive';
import { ICourseUnit } from '../../../cms/course/course-unit-template/unit.interface';

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
	conference: Conference;
	conferenceMember: ConferenceMember;
	treeList: TreeNode[];

	@ViewChild(CourseMaterialDialog) materialDialog: CourseMaterialDialog;
	@ViewChild(CourseFaqDialog) faqDialog: CourseFaqDialog;
    @ViewChild(ExamStudyDialog) examStudyDialog: ExamStudyDialog;
    @ViewChild(AnswerPrintDialog) answerSheetDialog: AnswerPrintDialog;
    @ViewChild(CertificatePrintDialog) certPrintDialog: CertificatePrintDialog;
    @ViewChild(CourseUnitContainerDirective) unitHost: CourseUnitContainerDirective;
	componentRef: any;

    COURSE_UNIT_TYPE = COURSE_UNIT_TYPE;
	EXAM_STATUS = EXAM_STATUS;


	constructor(private router: Router, private route: ActivatedRoute, 
		private sylUtils:SyllabusUtils, private reportUtils: ReportUtils,
		private meetingSerivce:MeetingService,private componentFactoryResolver: ComponentFactoryResolver) {
		super();
		this.course = new Course();
		this.member = new CourseMember();
		this.certificate = new Certificate();
		this.conference = new Conference();
		this.conferenceMember = new ConferenceMember();
	}

	ngOnInit() {
		this.route.params.subscribe(params => { 
	        var memberId = +params['memberId']; 
	        var courseId = +params['courseId']; 
	        Course.get(this, courseId).subscribe(course => {
	        	CourseMember.get(this, memberId).subscribe(member => {
	        		this.member =  member;
					this.course =  course;
					this.loadFaqs();
					this.loadMaterials();
					this.loadExam();
					this.loadGradebook();
					this.loadCertificate();
					this.loadConference();
	        	});
	        	CourseSyllabus.byCourse(this, course.id).subscribe(syl=> {
		        	CourseUnit.listBySyllabus(this,syl.id).subscribe(units => {
						this.units = units;
						this.tree = this.sylUtils.buildGroupTree(units);
						this.treeList = this.sylUtils.flattenTree(this.tree);
						CourseLog.lastUserAttempt(this, this.authService.UserProfile.id, course.id).subscribe((attempt:CourseLog)=> {
							if (attempt) {
								this.selectedNode =  this.sylUtils.findTreeNode(this.tree, attempt.res_id);
							}
						});
			        });
		        });
	        });
	        
	    }); 
	}

	nodeSelect(event:any) {
		if (this.selectedNode) {
			this.selectedUnit =  this.selectedNode.data;
			this.selectedUnit.completedByUser(this, this.authService.UserProfile.id).subscribe(success=> {
				this.selectedUnit["completed"]  =success;
			});
		}
	}

	prevUnit() {
		if (this.selectedUnit)  {
			CourseLog.finishCourseUnit(this, this.authService.UserProfile.id, this.course.id, this.selectedUnit);
			var prevUnit = this.computedPrevUnit(this.selectedUnit.id);
			this.selectedNode =  this.sylUtils.findTreeNode(this.tree, prevUnit.id);
		} 
	}

	nextUnit() {
		if (this.selectedUnit)  {
			CourseLog.finishCourseUnit(this, this.authService.UserProfile.id, this.course.id, this.selectedUnit);
			var nextUnit = this.computedNextUnit(this.selectedUnit.id);
			this.selectedNode =  this.sylUtils.findTreeNode(this.tree, nextUnit.id);
		} 
	}

	completeUnit() {
		if (this.selectedUnit)  {
			CourseLog.completeCourseUnit(this, this.authService.UserProfile.id, this.course.id, this.selectedUnit);
			this.selectedUnit["completed"] = true;
		} 
	}

	computedPrevUnit(currentUnitId:number):CourseUnit {
		var currentNodeIndex = 0;
		for (;currentNodeIndex < this.treeList.length; currentNodeIndex++) {
			var node = this.treeList[currentNodeIndex];
			if (node.data.id == currentUnitId)
				break;
		}
		currentNodeIndex--;
		while (currentNodeIndex >=0) {
			var node = this.treeList[currentNodeIndex];
			if (node.data.type !='folder')
				break;
			currentNodeIndex--;
		}
		return (currentNodeIndex>=0?this.treeList[currentNodeIndex].data:null);
	}

	computedNextUnit(currentUnitId:number):CourseUnit {
		var currentNodeIndex = 0;
		for (;currentNodeIndex < this.treeList.length; currentNodeIndex++) {
			var node = this.treeList[currentNodeIndex];
			if (node.data.id == currentUnitId)
				break;
		}
		currentNodeIndex--;
		while (currentNodeIndex >=0) {
			var node = this.treeList[currentNodeIndex];
			if (node.data.type !='folder')
				break;
			currentNodeIndex--;
		}
		return (currentNodeIndex<this.treeList.length?this.treeList[currentNodeIndex].data:null);
	}

	studyUnit() {
		if (this.selectedUnit) {
			if (this.course.complete_unit_by_order) {
				let prevUnit:CourseUnit = this.computedPrevUnit(this.selectedUnit.id);
				prevUnit.completedByUser(this, this.authService.UserProfile.id).subscribe(success=> {
					if (success) {
						this.openUnit(this.selectedUnit);
						CourseLog.startCourseUnit(this, this.authService.UserProfile.id, this.course.id, this.selectedUnit);
					}
					else
						this.error('You have not completed previous unit');
				});
			} 
			else {
				this.openUnit(this.selectedUnit);
				CourseLog.startCourseUnit(this, this.authService.UserProfile.id, this.course.id, this.selectedUnit);
			}
		}
	}

	openUnit(unit:CourseUnit) {
		var detailComponent = CourseUnitRegister.Instance.lookup(unit.type);
			let viewContainerRef = this.unitHost.viewContainerRef;
			if (detailComponent) {
				let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
				viewContainerRef.clear();
				this.componentRef = viewContainerRef.createComponent(componentFactory);
				(<ICourseUnit>this.componentRef.instance).mode = 'study';
				(<ICourseUnit>this.componentRef.instance).render(unit);
			} else {
				viewContainerRef.clear();
				this.componentRef = null;
			}

	}

	loadCertificate() {
		Certificate.byMember(this, this.member.id).subscribe((certificate:any) => {
            this.certificate = certificate;
        });
	}

	loadConference() {
		ConferenceMember.byCourseMember(this, this.member.id)
            .subscribe(member => {
            	this.conferenceMember =  member;
                Conference.get(this, member.conference_id).subscribe(conference => {
                    this.conference = conference;
                });
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

    joinConference() {
    	if (this.conference.id && this.conferenceMember.id)
        	this.meetingSerivce.join(this.conference.room_ref, this.conferenceMember.room_member_ref)
    }
}
