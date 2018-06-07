import from '../helpers/reflect';

import { Observable, Subject } from 'rxjs/Rx';
import { METHOD_METADATA_KEY, MethodRegister } from './decorator';
import * as _ from 'underscore';


export abstract class BaseAPI {
    params		:	any;

    constructor() {
    }

    static get Method():string {
        return Reflect.getMetadata(METHOD_METADATA_KEY, this);
    }

     get Method():string {
        return Reflect.getMetadata(METHOD_METADATA_KEY, this.constructor);
    }


}
