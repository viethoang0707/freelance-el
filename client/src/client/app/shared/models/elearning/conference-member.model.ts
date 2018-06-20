import { BaseModel } from '../base.model';
import { Submission } from './submission.model';
import { Conference } from './conference.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { RoomMember } from '../meeting/room-member.model';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { Cache } from '../../helpers/cache.utils';
import { DeleteAPI } from '../../services/api/delete.api';
import { BulkDeleteAPI } from '../../services/api/bulk-delete.api';
import { ListAPI } from '../../services/api/list.api';
import { BulkListAPI } from '../../services/api/bulk-list.api';
import * as _ from 'underscore';

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
        this.group_id = undefined;
        this.group_id__DESC__ = undefined;
        this.is_active =  undefined;
        this.class_id = undefined;
        this.conference_status = undefined;
        this.conference =  new Conference();
    }

    course_member_id: number;
    email: string;
    phone: string;
    name: string;
    room_member_ref:string;
    is_active: boolean;
    class_id: number;
    group_id: number;
    user_id: number;
    conference_id: number;
    conference: Conference;
    conference_status: string;
    group_id__DESC__: string;


    static __api__byCourseMember(memberId: number): SearchReadAPI {
        return new SearchReadAPI(ConferenceMember.Model, [],"[('course_member_id','=',"+memberId+")]");
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

    static __api__listByUser(userId: number): SearchReadAPI {
        return new SearchReadAPI(ConferenceMember.Model, [],"[('user_id','=',"+userId+")]");
    }

    static __api__listByClass(classId: number): SearchReadAPI {
        return new SearchReadAPI(ConferenceMember.Model, [],"[('class_id','=',"+classId+")]");
    }

    static __api__listByConference(conferenceId: number): SearchReadAPI {
        return new SearchReadAPI(ConferenceMember.Model, [],"[('conference_id','=',"+conferenceId+")]");
    }

    static listByUser( context:APIContext, userId: number): Observable<any[]> {
        return ConferenceMember.search(context,[],"[('user_id','=',"+userId+")]");
    }

    static listByClass( context:APIContext, classId: number): Observable<any[]> {
        return ConferenceMember.search(context,[],"[('class_id','=',"+classId+")]");
    }

    static listByConference( context:APIContext, conferenceId: number): Observable<any[]> {
        return ConferenceMember.search(context,[],"[('conference_id','=',"+conferenceId+")]");
    }

    __api__populateConference(): ListAPI {
        return new ListAPI(Conference.Model, [this.conference_id], []);
    }

    populateConference(context: APIContext): Observable<any> {
        if (!this.conference_id)
            return Observable.of(null);
        return Conference.get(context, this.conference_id).do(conf => {
            this.conference = conf;
        });
    }

    static populateConferences(context: APIContext, members: ConferenceMember[]): Observable<any> {
        var conferenceIds = _.pluck(members,'conference_id');
        conferenceIds = _.filter(conferenceIds, id=> {
            return id;
        });
        return Conference.array(context, conferenceIds).do(conferences=> {
            _.each(members, (member:ConferenceMember)=> {
                member.conference =  _.find(conferences, (conf:Conference)=> {
                    return member.conference_id == conf.id;
                });
            });
        });
    }
}