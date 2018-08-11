import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import { Observable, Subject } from 'rxjs/Rx';

export interface ICourseUnitDesign {
	mode: string;
	render(unit:CourseUnit);
	saveEditor():Observable<any>;
}