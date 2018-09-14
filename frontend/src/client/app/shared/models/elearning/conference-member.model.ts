import { BaseModel } from '../base.model';
import { Submission } from './submission.model';
import { Conference } from './conference.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty,UnserializeProperty } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';
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
        this.group_name = undefined;
        this.is_active =  undefined;
        this.class_id = undefined;
        this.conference_status = undefined;
        this.role = undefined;
        this.conference =  new Conference();
    }

    course_member_id: number;
    email: string;
    role: string;
    phone: string;
    name: string;
    group_name: string;
    room_member_ref:string;
    is_active: boolean;
    class_id: number;
    group_id: number;
    user_id: number;
    conference_id: number;
    @UnserializeProperty()
    conference: Conference;
    conference_status: string;

    static populateConferences(context: APIContext, members: ConferenceMember[],fields?:string[]): Observable<any> {
        members = _.filter(members, (member:ConferenceMember)=> {
            return member.conference.IsNew;
        });
        var confIds = _.pluck(members,'conference_id');
        confIds = _.filter(confIds, id=> {
            return id;
        });
        return Conference.array(context, confIds,fields).do(conferences=> {
            _.each(members, (member:ConferenceMember)=> {
                member.conference =  _.find(conferences, (conference:Conference)=> {
                    return member.conference_id == conference.id;
                });
            });
        });
    }


}