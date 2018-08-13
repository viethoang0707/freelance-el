import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import { Observable, Subject } from 'rxjs/Rx';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';

export interface ICourseUnitPlay {
	play(unit:CourseUnit, member: CourseMember);
	viewCompleted: boolean;
	onViewCompleted: Observable<any>;
}