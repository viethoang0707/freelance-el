"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PASSWORD = '123456';
exports.USER_STATUS = { 'true': 'Active', 'false': 'Suspended' };
exports.GENDER = { 'male': 'Male', 'female': 'Female', 'other': 'Other' };
exports.GROUP_CATEGORY = { USER: 'organization', QUESTION: 'question', COURSE: 'course', COMPETENCY: 'competency' };
exports.SERVER_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
exports.DEFAULT_DATE_LOCALE = {
    firstDayOfWeek: 0,
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    today: 'Today',
    clear: 'Clear'
};
exports.EXAM_STATUS = { 'open': 'Opem', 'closed': 'Closed' };
exports.CLASS_STATUS = { 'open': 'Opem', 'closed': 'Closed' };
exports.REPORT_CATEGORY = { COURSE: 'COURSE', EXAM: 'EXAM' };
exports.EXPORT_DATETIME_FORMAT = "dd-MM-yyyy HH:mm:ss";
exports.EXPORT_DATE_FORMAT = "dd-MM-yyyy";
exports.EXAM_MEMBER_ROLE = { 'candidate': 'Candidate', 'supervisor': 'Supervisor' };
exports.EXAM_MEMBER_STATUS = { 'active': 'Active', 'withdraw': 'Withdraw', 'suspend': 'Suspended' };
exports.QUESTION_SELECTION = { 'manual': 'Manual', 'random': 'Random' };
exports.EXAM_MEMBER_ENROLL_STATUS = { 'in-progress': 'In-progress', 'completed': 'Complete', 'registered': 'Registered' };
exports.COURSE_UNIT_TYPE = { 'folder': 'Folder', 'exercise': 'Exercise', 'html': 'HTML Lecture', 'video': 'Video lecture', 'scorm': 'SCORM lecture', 'slide': 'Presentation' };
exports.COURSE_UNIT_ICON = { 'folder': 'ui-icon-folder', 'exercise': 'ui-icon-play-for-work', 'html': 'ui-icon-text-fields', 'video': 'ui-icon-videocam', 'scorm': 'ui-icon-unarchive', 'slide': 'ui-icon-slideshow' };
exports.CONFERENCE_STATUS = { 'open': 'Open', 'closed': 'Closed' };
exports.CONTENT_STATUS = { 'draft': 'Draft', 'published': 'Published', 'unpublished': 'Unpublished' };
exports.COURSE_MODE = { 'self-study': 'Self-study', 'group': 'Group-study' };
exports.COURSE_MEMBER_ROLE = { 'student': 'Student', 'teacher': 'Teacher' };
exports.COURSE_MEMBER_STATUS = { 'active': 'Active', 'withdraw': 'Withdraw', 'suspend': 'Suspended' };
exports.COURSE_MEMBER_ENROLL_STATUS = { 'in-study': 'In-study', 'completed': 'Complete', 'registered': 'Registered' };
exports.QUESTION_TYPE = { 'sc': 'Single-choice', 'mc': 'Multiple-choice', 'fb': 'Fill-the-blank', 'ext': 'Open-ended' };
exports.QUESTION_LEVEL = { 'easy': 'Easy', 'medium': 'Medium', 'hard': 'Hard' };
exports.LANGS = { 'vn': 'Vietnamese', 'gb': 'English' };
exports.TICKET_STATUS = { 'open': 'Open', 'approved': 'Approved', 'rejected': 'Rejected' };
exports.EXAM_TIME_WARNING = 60000;
exports.DEFAULT_LANG = 'gb';
exports.PROJECT_STATUS = { 'open': 'Opem', 'closed': 'Closed' };
exports.SURVEY_STATUS = { 'open': 'Opem', 'closed': 'Closed' };
exports.SCHEDULER_HEADER = {
    left: 'prev, today, next',
    center: 'title',
    right: 'month,agendaWeek,agendaDay'
};
exports.PRINT_DIALOG_STYLE = "<style>\n                  //........Customized style.......\n                    .header{\n                    }\n                    .name-c{\n                        float: left;\n                        width: 55%;\n                    }\n\n                    .name-e{\n                        height: 40px;\n                    }\n\n                    .name-c, .name-e{\n                        text-align: center; \n                        text-transform: uppercase; \n                        font-weight: bold; \n                        margin-bottom: 10px;\n                    }\n                    \n                    .label{\n                        float: left;\n                        font-weight: bold;\n                        \n                    }\n\n                    .title{\n                        text-transform: uppercase;\n                        float: left;\n                        margin-right:40px;\n                    }\n\n                    .ins p{\n                        text-indent: 25px;\n                    }\n\n                    .f-print{\n                        border:none;\n                        padding: 0;\n                        margin-top: -10px;\n                    }\n                    \n                    .f-print ul{\n                        padding-left: 10px;\n                    }\n\n                    .l-question{\n                        padding-bottom: 0;\n                        margin-bottom: 0;\n                    }\n\n                    .l-question li{\n                        list-style-type: decimal;\n                    }\n\n                    .bold{\n                        font-weight: bold;\n                    }\n\n                    .student{\n                        float: left;\n                        margin-right:100px;\n                    }\n\n                    .radio{\n                        float: left;\n                        padding-right: 5px;\n                    }\n                </style>";
//# sourceMappingURL=constants.js.map