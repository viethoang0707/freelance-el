import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model, FieldProperty } from '../decorator';
import { APIContext } from '../context';
import * as _ from 'underscore';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { CreateAPI } from '../../services/api/create.api';

@Model('emeeting.room')
export class Room extends BaseModel {

    constructor() {
        super();

        this.category = undefined;
        this.name = undefined;
        this.ref = undefined;
        this.password = undefined;

    }

    category: string;
    name: string;
    ref: string;
    password: string;

    static byRef(context: APIContext, ref: string): Observable<any> {
        return Room.single(context, [], "[('ref','=','" + ref + "')]");
    }

    static __api__byRef(ref: string): SearchReadAPI {
        return new SearchReadAPI(Room.Model, [], "[('ref','!=','" + ref + "')]");
    }

    static createWebminarRoom(name: string): Room {
        var room = new Room();
        room.category = 'one-to-many';
        room.name = name;
        room.password = Room.makePassword();
        room.ref =  Room.makeid();
        return room;
    }

    static makePassword() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 4; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    static makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 24; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }


}
