import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { Cache } from '../../helpers/cache.utils';
import { SearchReadAPI } from '../../services/api/search-read.api';

@Model('etraining.exam_record')
export class ExamRecord extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.score = undefined;
		this.grade = undefined;
		this.member_id = undefined;
        this.user_id =  undefined;
        this.submission_id =  undefined;
        this.class_id =  undefined;
        this.exam_id =  undefined;
        this.course_member_id = undefined;
	}

    score: number;
    grade: string;
    member_id: number;
    course_member_id: number;
    user_id: number;
    exam_id: number;
    class_id: number;
    submission_id: number;

    static __api__listByUser(userId: number): SearchReadAPI {
        return new SearchReadAPI(ExamRecord.Model, [],"[('user_id','=',"+userId+")]");
    }

    static listByUser(context: APIContext, userId: number): Observable<any[]> {
        return ExamRecord.search(context, [], "[('user_id','='," + userId + ")]");
    }

    static __api__listByMember(memberId: number): SearchReadAPI {
        return new SearchReadAPI(ExamRecord.Model, [],"[('member_id','=',"+memberId+")]");
    }

    static listByCourseMember(context: APIContext, memberId: number): Observable<any[]> {
        return ExamRecord.search(context, [], "[('course_member_id','='," + memberId + ")]");
    }

    static __api__listByCourseMember(memberId: number): SearchReadAPI {
        return new SearchReadAPI(ExamRecord.Model, [],"[('course_member_id','=',"+memberId+")]");
    }

    static listByMember(context: APIContext, memberId: number): Observable<any[]> {
        return ExamRecord.search(context, [], "[('member_id','='," + memberId + ")]");
    }

    static __api__listByExam(examId: number): SearchReadAPI {
        return new SearchReadAPI(ExamRecord.Model, [],"[('exam_id','=',"+examId+")]");
    }

    static listByExam(context: APIContext, examId: number): Observable<any[]> {
        return ExamRecord.search(context, [], "[('exam_id','='," + examId + ")]");
    }

}
