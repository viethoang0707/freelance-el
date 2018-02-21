import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';

@Model('etraining.video_lecture')
export class VideoLecture extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
        
        this.transcript = undefined;
        this.unit_id = undefined;
    }

    video_id: number;
    transcript: string;
    video_url: string;
    unit_id: number;


    static byCourseUnit(context:APIContext, unitId: number):Observable<any> {
        return VideoLecture.search(context,[],"[('unit_id','=',"+unitId+")]")
        .map(lectures => {
            if (lectures.length)
                return lectures[0];
            else
                return null;
        });
    }
}
