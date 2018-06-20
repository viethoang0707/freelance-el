import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { BaseComponent } from '../../shared/components/base/base.component';
import { CourseMember } from '../../shared/models/elearning/course-member.model';
import { Course } from '../../shared/models/elearning/course.model';
import { ExamMember } from '../../shared/models/elearning/exam-member.model';
import { Exam } from '../../shared/models/elearning/exam.model';
import { ExamQuestion } from '../../shared/models/elearning/exam-question.model';
import { CourseClass } from '../../shared/models/elearning/course-class.model';
import { ConferenceMember } from '../../shared/models/elearning/conference-member.model';
import { Conference } from '../../shared/models/elearning/conference.model';
import { Room } from '../../shared/models/meeting/room.model';
import { MeetingService } from '../../shared/services/meeting.service';
import { User } from '../../shared/models/elearning/user.model';
import { GROUP_CATEGORY, CONFERENCE_STATUS, COURSE_MODE, EXAM_STATUS } from '../../shared/models/constants'
import { CourseSyllabus } from '../../shared/models/elearning/course-syllabus.model';
import { SelectItem } from 'primeng/api';
import { CourseSyllabusDialog } from '../../cms/course/course-syllabus/course-syllabus.dialog.component';
import { QuestionMarkingDialog } from '../../lms/exam/question-marking/question-marking.dialog.component';
import { AnswerPrintDialog } from '../../lms/exam/answer-print/answer-print.dialog.component';
import { ExamContentDialog } from '../../cms/exam/content-dialog/exam-content.dialog.component';
import { ExamStudyDialog } from '../../lms/exam/exam-study/exam-study.dialog.component';
import { CourseUnit } from '../../shared/models/elearning/course-unit.model';
import { Submission } from '../../shared/models/elearning/submission.model';
import { BaseModel } from '../../shared/models/base.model';
import { Survey } from '../../shared/models/elearning/survey.model';
import { SurveyStudyDialog} from '../../lms/survey/survey-study/survey-study.dialog.component';
import { SurveyMember } from '../../shared/models/elearning/survey-member.model';

import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'user-dashboard',
    templateUrl: 'user-dashboard.component.html',
    styleUrls: ['user-dashboard.component.css'],

})
export class UserDashboardComponent extends BaseComponent implements OnInit {

    CONFERENCE_STATUS = CONFERENCE_STATUS;
    COURSE_MODE = COURSE_MODE;
    EXAM_STATUS = EXAM_STATUS;

    private conferenceMembers: ConferenceMember[];
    private courseMembers: CourseMember[];
    private currentUser: User;
    private examMembers: ExamMember[];
    private courses: Course[];

    @ViewChild(CourseSyllabusDialog) syllabusDialog: CourseSyllabusDialog;
    @ViewChild(ExamContentDialog) examContentDialog: ExamContentDialog;
    @ViewChild(ExamStudyDialog) examStudyDialog: ExamStudyDialog;
    @ViewChild(SurveyStudyDialog) surveyStudyDialog: SurveyStudyDialog;

    constructor(private meetingSerivce: MeetingService, private router: Router) {
        super();
        this.courseMembers = [];
        this.conferenceMembers = [];
        this.examMembers = [];
        this.currentUser = this.authService.UserProfile;
        this.courses = [];
    }

    displayCourses() {
        this.courseMembers = _.filter(this.courseMembers, (member: CourseMember) => {
            return member.course_id && (member.course_mode == 'self-study' || member.class_id) && member.status == 'active';
        });
        CourseMember.populateCourses(this, this.courseMembers).subscribe((courses) => {
            this.courses = this.courses.concat(courses);
            this.courses = _.uniq(courses, (course) => {
                return course.id;
            });
            this.courses.sort((course1:Course, course2:Course): any => {
                return (course1.create_date.getTime() - course2.create_date.getTime());
            });
            _.each(this.courses, (course: Course) => {
                course["student"] = _.find(this.courseMembers, (member: CourseMember) => {
                    return member.course_id == course.id && member.role == 'student';
                });
                course["teacher"] = _.find(this.courseMembers, (member: CourseMember) => {
                    return member.course_id == course.id && member.role == 'teacher';
                });
                course["isAuthor"] = course.author_id == this.currentUser.id;
            });
        });
    }

    displayExams() {
        this.examMembers = _.filter(this.examMembers, (member:ExamMember) => {
            return member.exam_id && member.status == 'active';
        });
        var searchApi = _.map(this.examMembers, (member: ExamMember) => {
            return Submission.__api__listByMember(member.id);
        });
        BaseModel.bulk_search(this, ...searchApi)
            .map((jsonArray) => {
                return _.flatten(jsonArray);
            })
            .subscribe(submits => {
                _.each(this.examMembers, (member: ExamMember) => {
                    member["submit"] = _.find(submits, (submit: Submission) => {
                        return member.id == submit.member_id;
                    });
                    if (member["submit"])
                        member["score"] =  member["submit"].score;

                });
                ExamMember.populateExams(this, this.examMembers).subscribe(() => {
                    this.examMembers = _.filter(this.examMembers, (member: ExamMember) => {
                        return member.role == 'supervisor' || (member.role == 'candidate' && member.exam.IsAvailable);
                    });
                    this.examMembers.sort((member1:ExamMember, member2:ExamMember): any => {
                        return (member1.exam.create_date.getTime() - member1.exam.create_date.getTime())
                    });
                    var countApi = _.map(this.examMembers, (member: ExamMember) => {
                        return ExamQuestion.__api__countByExam(member.exam_id);
                    });
                    BaseModel.bulk_count(this, ...countApi)
                        .map((jsonArray) => {
                            return _.flatten(jsonArray);
                        })
                        .subscribe(counts => {
                            for (var i = 0; i < this.examMembers.length; i++) {
                                this.examMembers[i]["question_count"] = counts[i];
                            }
                            
                        });
                });
            });
    }

    displayConferences() {
        this.conferenceMembers = _.filter(this.conferenceMembers, (member: ConferenceMember) => {
            return member.conference_id && member.conference_status == 'open';
        });
        this.conferenceMembers.sort((member1:ConferenceMember, member2:ConferenceMember): any => {
            return member1.create_date.getTime() - member2.create_date.getTime();
        });
        ConferenceMember.populateConferences(this, this.conferenceMembers).subscribe(() => {
            
        });

    }

    ngOnInit() {
        BaseModel.bulk_search(this,
            CourseMember.__api__listByUser(this.currentUser.id),
            ExamMember.__api__listByUser(this.currentUser.id),
            ConferenceMember.__api__listByUser(this.currentUser.id),
            Course.__api__listByAuthor(this.currentUser.id),
            Survey.__api__listAvailableSurvey(),
            SurveyMember.__api__listByUser(this.currentUser.id)
            )
            .subscribe(jsonArray => {
                this.courseMembers = CourseMember.toArray(jsonArray[0]);
                this.examMembers = ExamMember.toArray(jsonArray[1]);
                this.conferenceMembers = ConferenceMember.toArray(jsonArray[2]);
                this.courses = Course.toArray(jsonArray[3]);
                var surveys = Survey.toArray(jsonArray[4]);
                var surveyMembers = SurveyMember.toArray(jsonArray[5]);
                this.displayCourses();
                this.displayExams();
                this.displayConferences();
                this.popupSurvey(surveys, surveyMembers);
            });
    }

    joinConference(member) {
        if (member.is_active)
            this.meetingSerivce.join( member.conference.room_ref,member.room_member_ref);
        else
            this.error('You are  not allowed to join the conference');
    }

    editSyllabus(course: Course) {
        CourseSyllabus.byCourse(this, course.id).subscribe(syllabus => {
            this.syllabusDialog.show(syllabus);
        });
    }

    studyCourse(course: Course, member: CourseMember) {
        if (course.status == 'published') {
            CourseSyllabus.byCourse(this, course.id).subscribe(syllabus => {
                if (syllabus && syllabus.status == 'published')
                    this.router.navigate(['/lms/courses/study', course.id, member.id]);
                else
                    this.error('The course has not been published');
            });
        }
        else {
            this.error('The course has not been published');
        }
    }

    manageCourse(course: Course, member: CourseMember) {
        if (course.status == 'published') {
            CourseSyllabus.byCourse(this, course.id).subscribe(syllabus => {
                if (syllabus && syllabus.status == 'published')
                    this.router.navigate(['/lms/courses/manage', course.id]);
                else
                    this.error('The course has not been published');
                
            });
        }
        else {
            this.error('The course has not been published');
        }
    }

    manageExam(exam: Exam, member: ExamMember) {
        this.router.navigate(['/lms/exams/manage', exam.id, member.id]);
    }

    editContent(exam: Exam) {
        this.examContentDialog.show(exam);
    }

    startExam(exam: Exam, member: ExamMember) {
        this.confirm('Are you sure to start ?', () => {
            this.examStudyDialog.show(exam, member);
        });
    }

    popupSurvey(surveys:Survey[], surveyMembers: SurveyMember[]) {
        surveys =  _.filter(surveys, (survey:Survey)=> {
            survey["member"] = _.find(surveyMembers, (m:SurveyMember)=> {
                return m.survey_id == survey.id && m.enroll_status !='completed';
            });
            return survey["member"] != null  && survey.IsAvailable;
        });
        if (surveys && surveys.length) {
            var survey = surveys[0];
            this.confirm(`You are invited to survey ${survey.name}. Do you want to join ?`, ()=> {
                 this.surveyStudyDialog.show(survey, survey["member"]);
            });
        }
    }
}