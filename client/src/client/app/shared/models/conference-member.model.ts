import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Submission } from './submission.model';
import { Answer } from './answer.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from './decorator';
import { APIContext } from './context';
import * as _ from 'underscore';
import { RoomMember } from './meeting/room-member.model';

@Model('etraining.conference_member')
export class ConferenceMember extends BaseModel{

    constructor(){
        super();
        this.course_member_id = undefined;
        this.email = undefined;
        this.phone = undefined;
        this.name = undefined;
        this.user_id = undefined;
        this.conference_id = undefined;
        this.room_member_ref = undefined;
        this.etraining_group_id = undefined;
        this.etraining_group_id__DESC__ = undefined;
        this.is_active =  undefined;
        this.class_id = undefined;
    }

    course_member_id: number;
    email: string;
    phone: string;
    name: string;
    room_member_ref:string;
    is_active: boolean;
    class_id: number;
    etraining_group_id: number;
    user_id: number;
    conference_id: number;
    etraining_group_id__DESC__: string;

    delete(context:APIContext):Observable<any> {
        return RoomMember.byRef(context,this.room_member_ref).flatMap(roomMember => {
            if (!roomMember)
                return this.delete(context);
            else {
                return Observable.zip(this.delete(context), roomMember.delete(context))
            }
        });
    }

    static byCourseMember(context:APIContext, memberId: number):Observable<any> {
        return ConferenceMember.search(context,[],"[('course_member_id','=',"+memberId+")]")
        .map(members => {
            if (members.length)
                return members[0];
            else
                return null;
        });
    }

    static listByUser( context:APIContext, userId: number): Observable<any[]> {
        return ConferenceMember.search(context,[],"[('user_id','=',"+userId+")]");
    }

    static listByClass( context:APIContext, classId: number): Observable<any[]> {
        return ConferenceMember.search(context,[],"[('class_id','=',"+classId+")]");
    }
}