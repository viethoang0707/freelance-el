import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,UnserializeProperty,ReadOnlyProperty } from '../decorator';
import { APIContext } from '../context';
import { CourseLog } from './log.model';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { SearchCountAPI } from '../../services/api/search-count.api';
import * as _ from 'underscore';
import { ListAPI } from '../../services/api/list.api';
import { HtmlLecture } from './lecture-html.model';
import { SCORMLecture } from './lecture-scorm.model';
import { SlideLecture } from './lecture-slide.model';
import { VideoLecture } from './lecture-video.model';
import { SelfAssessment } from './self_assessment.model';
import { Exercise } from './exercise.model';

@Model('etraining.course_unit')
export class CourseUnit extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
        this.lecture = undefined;
        this.type = undefined;
        this.order = undefined;
        this.parent_id = undefined;
        this.syllabus_id = undefined;
        this.icon = undefined;
        this.status = undefined;
        this.exercise_question_ids = [];
        this.course_id =  undefined;
        this.html_lecture_id =  undefined;
        this.slide_lecture_id =  undefined;
        this.video_lecture_id =  undefined;
        this.scorm_lecture_id =  undefined;
        this.exercise_id = undefined;
        this.exercise =  new Exercise();
        this.htmlLecture =  new HtmlLecture();
        this.videoLecture =  new VideoLecture();
        this.scormLecture =  new SCORMLecture();
        this.slideLecture =  new SlideLecture();
        this.selfAssessment =  new SelfAssessment();
	}

    name:string;
    parent_id: number;
    course_id: number;
    order: number;
    icon: string;
    syllabus_id: number;
    lecture: string;
    type: string;
    status: string;
    @ReadOnlyProperty()
    exercise_question_ids: number[];
    html_lecture_id: number;
    video_lecture_id: number;
    scorm_lecture_id: number;
    slide_lecture_id: number;
    exercise_id: number;
    self_assessment_id: number;
    @UnserializeProperty()
    htmlLecture: HtmlLecture;
    @UnserializeProperty()
    videoLecture: VideoLecture;
    @UnserializeProperty()
    scormLecture: SCORMLecture;
    @UnserializeProperty()
    slideLecture: SlideLecture;
    @UnserializeProperty()
    selfAssessment: SelfAssessment;
    @UnserializeProperty()
    exercise: Exercise;

    static __api__populateHtmlLecture(html_lecture_id: number,fields?:string[]): ListAPI {
        return new ListAPI(HtmlLecture.Model, [html_lecture_id],fields);
    }

    populateHtmlLecture(context: APIContext,fields?:string[]): Observable<any> {
        if (!this.html_lecture_id)
            return Observable.of(null);
        if (!this.htmlLecture.IsNew)
            return Observable.of(this);
        return HtmlLecture.get(context, this.html_lecture_id,fields).do(lecture => {
            this.htmlLecture = lecture;
        });
    }

    static __api__populateScormLecture(scorm_lecture_id: number,fields?:string[]): ListAPI {
        return new ListAPI(SCORMLecture.Model, [scorm_lecture_id],fields);
    }

    populateScormLecture(context: APIContext,fields?:string[]): Observable<any> {
        if (!this.scorm_lecture_id)
            return Observable.of(null);
        if (!this.scormLecture.IsNew)
            return Observable.of(this);
        return SCORMLecture.get(context, this.scorm_lecture_id,fields).do(lecture => {
            this.scormLecture = lecture;
        });
    }

    static __api__populateVideoLecture(video_lecture_id: number,fields?:string[]): ListAPI {
        return new ListAPI(VideoLecture.Model, [video_lecture_id],fields);
    }

    populateVideoLecture(context: APIContext,fields?:string[]): Observable<any> {
        if (!this.video_lecture_id)
            return Observable.of(null);
        if (!this.videoLecture.IsNew)
            return Observable.of(this);
        return VideoLecture.get(context, this.video_lecture_id,fields).do(lecture => {
            this.videoLecture = lecture;
        });
    }

    static __api__populateSelfAssessment(self_assessment_id: number,fields?:string[]): ListAPI {
        return new ListAPI(SelfAssessment.Model, [self_assessment_id],fields);
    }

    populateSelfAssessment(context: APIContext,fields?:string[]): Observable<any> {
        if (!this.self_assessment_id)
            return Observable.of(null);
        if (!this.selfAssessment.IsNew)
            return Observable.of(this);
        return SelfAssessment.get(context, this.self_assessment_id,fields).do(assess => {
            this.selfAssessment = assess;
        });
    }

    static __api__populateSlideLecture(slide_lecture_id: number,fields?:string[]): ListAPI {
        return new ListAPI(SlideLecture.Model, [slide_lecture_id],fields);
    }

    populateSlideLecture(context: APIContext,fields?:string[]): Observable<any> {
        if (!this.slide_lecture_id)
            return Observable.of(null);
        if (!this.slideLecture.IsNew)
            return Observable.of(this);
        return SlideLecture.get(context, this.slide_lecture_id,fields).do(lecture => {
            this.slideLecture = lecture;
        });
    }

    static __api__populateExercise(exercise_id: number,fields?:string[]): ListAPI {
        return new ListAPI(Exercise.Model, [exercise_id],fields);
    }

    populateExercise(context: APIContext,fields?:string[]): Observable<any> {
        if (!this.exercise_id)
            return Observable.of(null);
        if (!this.exercise.IsNew)
            return Observable.of(this);
        return Exercise.get(context, this.exercise_id,fields).do(exercise => {
            this.exercise = exercise;
        });
    }

}
