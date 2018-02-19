export const DEFAULT_PASSWORD = '123456';
export const USER_STATUS = { 'true': 'Active', 'false': 'Suspended' };
export const GENDER = { 'male': 'Male', 'female': 'Female', 'other': 'Other' };
export const GROUP_CATEGORY = { USER: 'organization', QUESTION: 'question', COURSE: 'course' };
export const SERVER_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const COURSE_STATUS = { 'draft': 'Draft', 'published': 'Published', 'unpublished': 'Unpublished' };
export const COURSE_MODE = { 'self-study': 'Self-study', 'group': 'Group-study' };
export const COURSE_MEMBER_ROLE = { 'student': 'Student', 'teacher': 'Teacher' };
export const COURSE_MEMBER_STATUS = { 'active': 'Active', 'withdraw': 'Withdraw', 'suspend': 'Suspended' };
export const COURSE_MEMBER_ENROLL_STATUS = { 'in-study': 'In-study', 'complete': 'Complete', 'registered': 'Registered' };
export const QUESTION_TYPE = { 'sc': 'Single-choice', 'fb': 'Fill-the-blank', 'ext': 'Open-ended' };
export const DEFAULT_DATE_LOCALE = {
	firstDayOfWeek: 0,
	dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
	monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	today: 'Today',
	clear: 'Clear'
};
export const EXAM_STATUS = { 'draft': 'Draft', 'published': 'Published', 'unpublished': 'Unpublished' };
export const REPORT_CATEGORY = {COURSE: 'COURSE',EXAM: 'EXAM' };
export const EXPORT_DATETIME_FORMAT = "'dd-MM-yyyy'HH:mm:ss";
export const EXPORT_DATE_FORMAT = "'dd-MM-yyyy";
export const EXAM_MEMBER_ROLE = { 'candidate': 'Candidate', 'supervisor': 'Supervisor' };
export const EXAM_MEMBER_STATUS = { 'active': 'Active', 'withdraw': 'Withdraw', 'suspend': 'Suspended' };
export const QUESTION_SELECTION = { 'manual': 'Manual', 'random': 'Random' };
export const EXAM_MEMBER_ENROLL_STATUS = { 'in-progress': 'In-progress', 'complete': 'Complete', 'registered': 'Registered' };
export const COURSE_UNIT_TYPE = { 'folder': 'Folder', 'exercise': 'Exercise', 'html': 'HTML Lecture','video':'Video lecture' };
export const COURSE_UNIT_ICON = { 'folder': 'ui-icon-folder', 'exercise': 'ui-icon-play-for-work', 'html': 'ui-icon-text-fields','video':'ui-icon-videocam' };
export const CONFERENCE_STATUS = { 'open': 'Open', 'closed': 'Closed'};
