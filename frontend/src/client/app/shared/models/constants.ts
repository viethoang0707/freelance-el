export const DEFAULT_PASSWORD = '123456';
export const USER_STATUS = { 'true': 'Active', 'false': 'Suspended' };
export const GENDER = { 'male': 'Male', 'female': 'Female', 'other': 'Other' };
export const GROUP_CATEGORY = { USER: 'organization', QUESTION: 'question', COURSE: 'course', COMPETENCY: 'competency' };
export const SERVER_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const SERVER_DATE_FORMAT = 'YYYY-MM-DD';
export const DEFAULT_DATE_FORMAT = 'DD-MM-YYYY';
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
export const COURSE_STATUS = { 'open': 'Open', 'closed': 'Closed', 'initial': 'Initial'};
export const EXAM_STATUS = { 'open': 'Open', 'closed': 'Closed' , 'initial': 'Initial'};
export const CLASS_STATUS = { 'open': 'Open', 'closed': 'Closed' , 'initial': 'Initial'};
export const REPORT_CATEGORY = { COURSE: 'COURSE', EXAM: 'EXAM', SURVEY: 'SURVEY', COMPETENCY: 'COMPETENCY' };
export const EXPORT_DATETIME_FORMAT = "dd-MM-yyyy HH:mm:ss";
export const EXPORT_DATE_FORMAT = "dd-MM-yyyy";
export const EXAM_MEMBER_ROLE = { 'candidate': 'Candidate', 'supervisor': 'Supervisor', 'editor':'Editor' };
export const EXAM_MEMBER_STATUS = { 'active': 'Active', 'withdraw': 'Withdraw', 'suspend': 'Suspended' };
export const QUESTION_SELECTION = { 'manual': 'Manual', 'random': 'Random' };
export const EXAM_MEMBER_ENROLL_STATUS = { 'in-progress': 'In-progress', 'completed': 'Complete', 'registered': 'Registered' };
export const COURSE_UNIT_TYPE = { 'folder': 'Folder','self-assess': 'Self-assessment', 'exercise': 'Exercise', 'html': 'HTML Lecture', 'video': 'Video lecture', 'scorm': 'SCORM lecture', 'slide': 'Presentation' };
export const COURSE_UNIT_ICON = { 'folder': 'ui-icon-folder', 'exercise': 'ui-icon-play-for-work', 'html': 'ui-icon-text-fields', 'video': 'ui-icon-videocam', 'scorm': 'ui-icon-unarchive', 'slide': 'ui-icon-slideshow' ,'self-assess':'ui-icon-grade'};
export const CONFERENCE_STATUS = { 'open': 'Open', 'closed': 'Closed' };
export const CONTENT_STATUS = { 'draft': 'Draft', 'published': 'Published', 'unpublished': 'Unpublished' };
export const COURSE_MODE = { 'self-study': 'Self-study', 'group': 'Group-study' };
export const COURSE_MEMBER_ROLE = { 'student': 'Student', 'teacher': 'Teacher', 'supervisor': 'Supervisor', 'editor':'Editor' };
export const COURSE_MEMBER_STATUS = { 'active': 'Active', 'withdraw': 'Withdraw', 'suspend': 'Suspended' };
export const COURSE_MEMBER_ENROLL_STATUS = { 'in-study': 'In-study', 'await-certificate': 'Awaiting for certificate', 'completed': 'Complete', 'registered': 'Registered' };
export const QUESTION_TYPE = { 'sc': 'Single-choice', 'mc': 'Multiple-choice', 'fb': 'Fill-the-blank', 'rate': 'Rating', 'ext': 'Open-ended' };
export const QUESTION_LEVEL = { 'easy': 'Easy', 'medium': 'Medium', 'hard': 'Hard' };
export const LANGS = { 'vn': 'Vietnamese', 'gb': 'English' };
export const REVIEW_STATE = { 'initial': 'Initial', 'approved': 'Approved', 'rejected': 'Rejected', 'pending':'Pending' };
export const TICKET_STATUS = { 'initial': 'Initial', 'open': 'Open', 'approved': 'Approved', 'rejected': 'Rejected','pending':'Pending' };
export const EXAM_TIME_WARNING = 60000;
export const DEFAULT_LANG = 'gb';
export const SCHEDULER_HEADER = {
    left: 'prev, today, next',
    center: 'title',
    right: 'month,agendaWeek,agendaDay'
}
export const EMPTY_VALUE = 0;
export const COLOR_BAND = ["#FF6384", "#36A2EB", "#3366cc", "#dc3912", "#ff9900", "#109618", "#990099"];
export const PROJECT_STATUS = { 'open': 'Open', 'closed': 'Closed' , 'draft':'Draft'};
export const SURVEY_STATUS = { 'open': 'Open', 'closed': 'Closed', 'initial': 'Initial' };
export const SURVEY_MEMBER_ROLE = { 'candidate': 'Candidate', 'supervisor': 'Supervisor', 'editor':'Editor' };
export const SURVEY_MEMBER_ENROLL_STATUS = { 'in-progress': 'In-progress', 'completed': 'Complete', 'registered': 'Registered' };
export const PRINT_DIALOG_STYLE = `<style>
                  //........Customized style.......
                    .header{
                    }
                    .name-c{
                        float: left;
                        width: 55%;
                    }

                    .name-e{
                        height: 40px;
                    }

                    .name-c, .name-e{
                        text-align: center; 
                        text-transform: uppercase; 
                        font-weight: bold; 
                        margin-bottom: 10px;
                    }
                    
                    .label{
                        float: left;
                        font-weight: bold;
                        
                    }

                    .title{
                        text-transform: uppercase;
                        float: left;
                        margin-right:40px;
                    }

                    .ins p{
                        text-indent: 25px;
                    }

                    .f-print{
                        border:none;
                        padding: 0;
                        margin-top: -10px;
                    }
                    
                    .f-print ul{
                        padding-left: 10px;
                    }

                    .l-question{
                        padding-bottom: 0;
                        margin-bottom: 0;
                    }

                    .l-question li{
                        list-style-type: decimal;
                    }

                    .bold{
                        font-weight: bold;
                    }

                    .student{
                        float: left;
                        margin-right:100px;
                    }

                    .radio{
                        float: left;
                        padding-right: 5px;
                    }
                </style>`;