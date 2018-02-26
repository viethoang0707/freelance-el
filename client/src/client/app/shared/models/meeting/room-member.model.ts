import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import * as _ from 'underscore';

@Model('emeeting.member')
export class RoomMember extends BaseModel{

    constructor(){
        super();
        
        this.avatar = undefined;
        this.name = undefined;
        this.ref = undefined;
        this.email = undefined;
        this.room_id = undefined;
        this.is_supervisor = undefined;
    }

    avatar: string;
    name: string;
    ref: string;
    email: string;
    room_id: number;
    is_supervisor: boolean;

    static byRef(context:APIContext, ref: string):Observable<any> {
        return RoomMember.search(context,[],"[('ref','=','"+ref+"')]")
        .map(members => {
            if (members.length)
                return members[0];
            else
                return null;
        });
    }

    static createRoomMember(context:APIContext, name: string, avatar: string, roomId: number, role:string):Observable<any> {
        var roomMember = new RoomMember();
        roomMember.room_id =  roomId;
        roomMember.name =  name;
        roomMember.avatar = avatar;
        roomMember.is_supervisor =  role =='teacher';
        return roomMember.save(context).flatMap(()=> {
            return RoomMember.get(context,roomMember.id);
        });
    }

}