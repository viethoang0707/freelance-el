import { Cache } from '../../helpers/cache.utils';
import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';

@Model('etraining.video_lecture')
export class VideoLecture extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
        
        this.transcript = undefined;
        this.unit_id = undefined;
        this.video_id = undefined;
        this.video_url = undefined;
    }

    video_id: number;
    transcript: string;
    video_url: string;
    unit_id: number;

    static __api__byCourseUnit(unitId:number): SearchReadAPI {
        return new SearchReadAPI(VideoLecture.Model, [],"[('unit_id','=',"+unitId+")]");
    }
    
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
