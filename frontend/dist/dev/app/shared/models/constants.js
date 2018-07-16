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
exports.COURSE_STATUS = { 'open': 'Open', 'closed': 'Closed', 'initial': 'Initial' };
exports.EXAM_STATUS = { 'open': 'Open', 'closed': 'Closed', 'initial': 'Initial' };
exports.CLASS_STATUS = { 'open': 'Open', 'closed': 'Closed', 'initial': 'Initial' };
exports.REPORT_CATEGORY = { COURSE: 'COURSE', EXAM: 'EXAM', SURVEY: 'SURVEY', COMPETENCY: 'COMPETENCY' };
exports.EXPORT_DATETIME_FORMAT = "dd-MM-yyyy HH:mm:ss";
exports.EXPORT_DATE_FORMAT = "dd-MM-yyyy";
exports.EXAM_MEMBER_ROLE = { 'candidate': 'Candidate', 'supervisor': 'Supervisor', 'editor': 'Editor' };
exports.EXAM_MEMBER_STATUS = { 'active': 'Active', 'withdraw': 'Withdraw', 'suspend': 'Suspended' };
exports.QUESTION_SELECTION = { 'manual': 'Manual', 'random': 'Random' };
exports.EXAM_MEMBER_ENROLL_STATUS = { 'in-progress': 'In-progress', 'completed': 'Complete', 'registered': 'Registered' };
exports.COURSE_UNIT_TYPE = { 'folder': 'Folder', 'exercise': 'Exercise', 'html': 'HTML Lecture', 'video': 'Video lecture', 'scorm': 'SCORM lecture', 'slide': 'Presentation' };
exports.COURSE_UNIT_ICON = { 'folder': 'ui-icon-folder', 'exercise': 'ui-icon-play-for-work', 'html': 'ui-icon-text-fields', 'video': 'ui-icon-videocam', 'scorm': 'ui-icon-unarchive', 'slide': 'ui-icon-slideshow' };
exports.CONFERENCE_STATUS = { 'open': 'Open', 'closed': 'Closed' };
exports.CONTENT_STATUS = { 'draft': 'Draft', 'published': 'Published', 'unpublished': 'Unpublished' };
exports.COURSE_MODE = { 'self-study': 'Self-study', 'group': 'Group-study' };
exports.COURSE_MEMBER_ROLE = { 'student': 'Student', 'teacher': 'Teacher', 'supervisor': 'Supervisor', 'editor': 'Editor' };
exports.COURSE_MEMBER_STATUS = { 'active': 'Active', 'withdraw': 'Withdraw', 'suspend': 'Suspended' };
exports.COURSE_MEMBER_ENROLL_STATUS = { 'in-study': 'In-study', 'completed': 'Complete', 'registered': 'Registered' };
exports.QUESTION_TYPE = { 'sc': 'Single-choice', 'mc': 'Multiple-choice', 'fb': 'Fill-the-blank', 'rate': 'Rating', 'ext': 'Open-ended' };
exports.QUESTION_LEVEL = { 'easy': 'Easy', 'medium': 'Medium', 'hard': 'Hard' };
exports.LANGS = { 'vn': 'Vietnamese', 'gb': 'English' };
exports.REVIEW_STATE = { 'initial': 'Initial', 'approved': 'Approved', 'rejected': 'Rejected', 'pending': 'Pending' };
exports.TICKET_STATUS = { 'initial': 'Initial', 'open': 'Open', 'approved': 'Approved', 'rejected': 'Rejected', 'pending': 'Pending' };
exports.EXAM_TIME_WARNING = 60000;
exports.DEFAULT_LANG = 'gb';
exports.SCHEDULER_HEADER = {
    left: 'prev, today, next',
    center: 'title',
    right: 'month,agendaWeek,agendaDay'
};
exports.COLOR_BAND = ["#FF6384", "#36A2EB", "#3366cc", "#dc3912", "#ff9900", "#109618", "#990099"];
exports.PROJECT_STATUS = { 'open': 'Open', 'closed': 'Closed', 'draft': 'Draft' };
exports.SURVEY_STATUS = { 'open': 'Open', 'closed': 'Closed', 'initial': 'Initial' };
exports.SURVEY_MEMBER_ROLE = { 'candidate': 'Candidate', 'supervisor': 'Supervisor', 'editor': 'Editor' };
exports.SURVEY_MEMBER_ENROLL_STATUS = { 'in-progress': 'In-progress', 'completed': 'Complete', 'registered': 'Registered' };
exports.PRINT_DIALOG_STYLE = "<style>\n                  //........Customized style.......\n                    .header{\n                    }\n                    .name-c{\n                        float: left;\n                        width: 55%;\n                    }\n\n                    .name-e{\n                        height: 40px;\n                    }\n\n                    .name-c, .name-e{\n                        text-align: center; \n                        text-transform: uppercase; \n                        font-weight: bold; \n                        margin-bottom: 10px;\n                    }\n                    \n                    .label{\n                        float: left;\n                        font-weight: bold;\n                        \n                    }\n\n                    .title{\n                        text-transform: uppercase;\n                        float: left;\n                        margin-right:40px;\n                    }\n\n                    .ins p{\n                        text-indent: 25px;\n                    }\n\n                    .f-print{\n                        border:none;\n                        padding: 0;\n                        margin-top: -10px;\n                    }\n                    \n                    .f-print ul{\n                        padding-left: 10px;\n                    }\n\n                    .l-question{\n                        padding-bottom: 0;\n                        margin-bottom: 0;\n                    }\n\n                    .l-question li{\n                        list-style-type: decimal;\n                    }\n\n                    .bold{\n                        font-weight: bold;\n                    }\n\n                    .student{\n                        float: left;\n                        margin-right:100px;\n                    }\n\n                    .radio{\n                        float: left;\n                        padding-right: 5px;\n                    }\n                </style>";

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFhLFFBQUEsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO0FBQzVCLFFBQUEsV0FBVyxHQUFHLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLENBQUM7QUFDekQsUUFBQSxNQUFNLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO0FBQ2xFLFFBQUEsY0FBYyxHQUFHLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxDQUFDO0FBQzVHLFFBQUEsc0JBQXNCLEdBQUcscUJBQXFCLENBQUM7QUFDL0MsUUFBQSxtQkFBbUIsR0FBRztJQUMvQixjQUFjLEVBQUUsQ0FBQztJQUNqQixRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUM7SUFDeEYsYUFBYSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO0lBQ2hFLFdBQVcsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztJQUN2RCxVQUFVLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQztJQUN0SSxlQUFlLEVBQUUsQ0FB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QU8sRUFBQyxPQUFPLEVBQUMsQ0FBQztBQUN6RSxRQUFBLGFBQWEsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLENBQUM7QUFDN0UsUUFBQSxrQkFBa0IsR0FBRyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUMsUUFBUSxFQUFFLENBQUM7QUFDakcsUUFBQSwyQkFBMkIsR0FBRyxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLENBQUM7QUFDcEgsUUFBQSxrQkFBa0IsR0FBRyxnK0RBb0VULENBQUMiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IERFRkFVTFRfUEFTU1dPUkQgPSAnMTIzNDU2JztcbmV4cG9ydCBjb25zdCBVU0VSX1NUQVRVUyA9IHsgJ3RydWUnOiAnQWN0aXZlJywgJ2ZhbHNlJzogJ1N1c3BlbmRlZCcgfTtcbmV4cG9ydCBjb25zdCBHRU5ERVIgPSB7ICdtYWxlJzogJ01hbGUnLCAnZmVtYWxlJzogJ0ZlbWFsZScsICdvdGhlcic6ICdPdGhlcicgfTtcbmV4cG9ydCBjb25zdCBHUk9VUF9DQVRFR09SWSA9IHsgVVNFUjogJ29yZ2FuaXphdGlvbicsIFFVRVNUSU9OOiAncXVlc3Rpb24nLCBDT1VSU0U6ICdjb3Vyc2UnLCBDT01QRVRFTkNZOiAnY29tcGV0ZW5jeScgfTtcbmV4cG9ydCBjb25zdCBTRVJWRVJfREFURVRJTUVfRk9STUFUID0gJ1lZWVktTU0tREQgSEg6bW06c3MnO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfREFURV9MT0NBTEUgPSB7XG4gICAgZmlyc3REYXlPZldlZWs6IDAsXG4gICAgZGF5TmFtZXM6IFtcIlN1bmRheVwiLCBcIk1vbmRheVwiLCBcIlR1ZXNkYXlcIiwgXCJXZWRuZXNkYXlcIiwgXCJUaHVyc2RheVwiLCBcIkZyaWRheVwiLCBcIlNhdHVyZGF5XCJdLFxuICAgIGRheU5hbWVzU2hvcnQ6IFtcIlN1blwiLCBcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiXSxcbiAgICBkYXlOYW1lc01pbjogW1wiU3VcIiwgXCJNb1wiLCBcIlR1XCIsIFwiV2VcIiwgXCJUaFwiLCBcIkZyXCIsIFwiU2FcIl0sXG4gICAgbW9udGhOYW1lczogW1wiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIl0sXG4gICAgbW9udGhOYW1lc1Nob3J0OiBbXCJKYW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYXlcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPY3RcIiwgXCJOb3ZcIiwgXCJEZWNcIl0sXG4gICAgdG9kYXk6ICdUb2RheScsXG4gICAgY2xlYXI6ICdDbGVhcidcbn07XG5leHBvcnQgY29uc3QgQ09VUlNFX1NUQVRVUyA9IHsgJ29wZW4nOiAnT3BlbicsICdjbG9zZWQnOiAnQ2xvc2VkJywgJ2luaXRpYWwnOiAnSW5pdGlhbCd9O1xuZXhwb3J0IGNvbnN0IEVYQU1fU1RBVFVTID0geyAnb3Blbic6ICdPcGVuJywgJ2Nsb3NlZCc6ICdDbG9zZWQnICwgJ2luaXRpYWwnOiAnSW5pdGlhbCd9O1xuZXhwb3J0IGNvbnN0IENMQVNTX1NUQVRVUyA9IHsgJ29wZW4nOiAnT3BlbicsICdjbG9zZWQnOiAnQ2xvc2VkJyAsICdpbml0aWFsJzogJ0luaXRpYWwnfTtcbmV4cG9ydCBjb25zdCBSRVBPUlRfQ0FURUdPUlkgPSB7IENPVVJTRTogJ0NPVVJTRScsIEVYQU06ICdFWEFNJywgU1VSVkVZOiAnU1VSVkVZJywgQ09NUEVURU5DWTogJ0NPTVBFVEVOQ1knIH07XG5leHBvcnQgY29uc3QgRVhQT1JUX0RBVEVUSU1FX0ZPUk1BVCA9IFwiZGQtTU0teXl5eSBISDptbTpzc1wiO1xuZXhwb3J0IGNvbnN0IEVYUE9SVF9EQVRFX0ZPUk1BVCA9IFwiZGQtTU0teXl5eVwiO1xuZXhwb3J0IGNvbnN0IEVYQU1fTUVNQkVSX1JPTEUgPSB7ICdjYW5kaWRhdGUnOiAnQ2FuZGlkYXRlJywgJ3N1cGVydmlzb3InOiAnU3VwZXJ2aXNvcicsICdlZGl0b3InOidFZGl0b3InIH07XG5leHBvcnQgY29uc3QgRVhBTV9NRU1CRVJfU1RBVFVTID0geyAnYWN0aXZlJzogJ0FjdGl2ZScsICd3aXRoZHJhdyc6ICdXaXRoZHJhdycsICdzdXNwZW5kJzogJ1N1c3BlbmRlZCcgfTtcbmV4cG9ydCBjb25zdCBRVUVTVElPTl9TRUxFQ1RJT04gPSB7ICdtYW51YWwnOiAnTWFudWFsJywgJ3JhbmRvbSc6ICdSYW5kb20nIH07XG5leHBvcnQgY29uc3QgRVhBTV9NRU1CRVJfRU5ST0xMX1NUQVRVUyA9IHsgJ2luLXByb2dyZXNzJzogJ0luLXByb2dyZXNzJywgJ2NvbXBsZXRlZCc6ICdDb21wbGV0ZScsICdyZWdpc3RlcmVkJzogJ1JlZ2lzdGVyZWQnIH07XG5leHBvcnQgY29uc3QgQ09VUlNFX1VOSVRfVFlQRSA9IHsgJ2ZvbGRlcic6ICdGb2xkZXInLCAnZXhlcmNpc2UnOiAnRXhlcmNpc2UnLCAnaHRtbCc6ICdIVE1MIExlY3R1cmUnLCAndmlkZW8nOiAnVmlkZW8gbGVjdHVyZScsICdzY29ybSc6ICdTQ09STSBsZWN0dXJlJywgJ3NsaWRlJzogJ1ByZXNlbnRhdGlvbicgfTtcbmV4cG9ydCBjb25zdCBDT1VSU0VfVU5JVF9JQ09OID0geyAnZm9sZGVyJzogJ3VpLWljb24tZm9sZGVyJywgJ2V4ZXJjaXNlJzogJ3VpLWljb24tcGxheS1mb3Itd29yaycsICdodG1sJzogJ3VpLWljb24tdGV4dC1maWVsZHMnLCAndmlkZW8nOiAndWktaWNvbi12aWRlb2NhbScsICdzY29ybSc6ICd1aS1pY29uLXVuYXJjaGl2ZScsICdzbGlkZSc6ICd1aS1pY29uLXNsaWRlc2hvdycgfTtcbmV4cG9ydCBjb25zdCBDT05GRVJFTkNFX1NUQVRVUyA9IHsgJ29wZW4nOiAnT3BlbicsICdjbG9zZWQnOiAnQ2xvc2VkJyB9O1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfU1RBVFVTID0geyAnZHJhZnQnOiAnRHJhZnQnLCAncHVibGlzaGVkJzogJ1B1Ymxpc2hlZCcsICd1bnB1Ymxpc2hlZCc6ICdVbnB1Ymxpc2hlZCcgfTtcbmV4cG9ydCBjb25zdCBDT1VSU0VfTU9ERSA9IHsgJ3NlbGYtc3R1ZHknOiAnU2VsZi1zdHVkeScsICdncm91cCc6ICdHcm91cC1zdHVkeScgfTtcbmV4cG9ydCBjb25zdCBDT1VSU0VfTUVNQkVSX1JPTEUgPSB7ICdzdHVkZW50JzogJ1N0dWRlbnQnLCAndGVhY2hlcic6ICdUZWFjaGVyJywgJ3N1cGVydmlzb3InOiAnU3VwZXJ2aXNvcicsICdlZGl0b3InOidFZGl0b3InIH07XG5leHBvcnQgY29uc3QgQ09VUlNFX01FTUJFUl9TVEFUVVMgPSB7ICdhY3RpdmUnOiAnQWN0aXZlJywgJ3dpdGhkcmF3JzogJ1dpdGhkcmF3JywgJ3N1c3BlbmQnOiAnU3VzcGVuZGVkJyB9O1xuZXhwb3J0IGNvbnN0IENPVVJTRV9NRU1CRVJfRU5ST0xMX1NUQVRVUyA9IHsgJ2luLXN0dWR5JzogJ0luLXN0dWR5JywgJ2NvbXBsZXRlZCc6ICdDb21wbGV0ZScsICdyZWdpc3RlcmVkJzogJ1JlZ2lzdGVyZWQnIH07XG5leHBvcnQgY29uc3QgUVVFU1RJT05fVFlQRSA9IHsgJ3NjJzogJ1NpbmdsZS1jaG9pY2UnLCAnbWMnOiAnTXVsdGlwbGUtY2hvaWNlJywgJ2ZiJzogJ0ZpbGwtdGhlLWJsYW5rJywgJ3JhdGUnOiAnUmF0aW5nJywgJ2V4dCc6ICdPcGVuLWVuZGVkJyB9O1xuZXhwb3J0IGNvbnN0IFFVRVNUSU9OX0xFVkVMID0geyAnZWFzeSc6ICdFYXN5JywgJ21lZGl1bSc6ICdNZWRpdW0nLCAnaGFyZCc6ICdIYXJkJyB9O1xuZXhwb3J0IGNvbnN0IExBTkdTID0geyAndm4nOiAnVmlldG5hbWVzZScsICdnYic6ICdFbmdsaXNoJyB9O1xuZXhwb3J0IGNvbnN0IFJFVklFV19TVEFURSA9IHsgJ2luaXRpYWwnOiAnSW5pdGlhbCcsICdhcHByb3ZlZCc6ICdBcHByb3ZlZCcsICdyZWplY3RlZCc6ICdSZWplY3RlZCcsICdwZW5kaW5nJzonUGVuZGluZycgfTtcbmV4cG9ydCBjb25zdCBUSUNLRVRfU1RBVFVTID0geyAnaW5pdGlhbCc6ICdJbml0aWFsJywgJ29wZW4nOiAnT3BlbicsICdhcHByb3ZlZCc6ICdBcHByb3ZlZCcsICdyZWplY3RlZCc6ICdSZWplY3RlZCcsJ3BlbmRpbmcnOidQZW5kaW5nJyB9O1xuZXhwb3J0IGNvbnN0IEVYQU1fVElNRV9XQVJOSU5HID0gNjAwMDA7XG5leHBvcnQgY29uc3QgREVGQVVMVF9MQU5HID0gJ2diJztcbmV4cG9ydCBjb25zdCBTQ0hFRFVMRVJfSEVBREVSID0ge1xuICAgIGxlZnQ6ICdwcmV2LCB0b2RheSwgbmV4dCcsXG4gICAgY2VudGVyOiAndGl0bGUnLFxuICAgIHJpZ2h0OiAnbW9udGgsYWdlbmRhV2VlayxhZ2VuZGFEYXknXG59XG5leHBvcnQgY29uc3QgQ09MT1JfQkFORCA9IFtcIiNGRjYzODRcIiwgXCIjMzZBMkVCXCIsIFwiIzMzNjZjY1wiLCBcIiNkYzM5MTJcIiwgXCIjZmY5OTAwXCIsIFwiIzEwOTYxOFwiLCBcIiM5OTAwOTlcIl07XG5leHBvcnQgY29uc3QgUFJPSkVDVF9TVEFUVVMgPSB7ICdvcGVuJzogJ09wZW4nLCAnY2xvc2VkJzogJ0Nsb3NlZCcgLCAnZHJhZnQnOidEcmFmdCd9O1xuZXhwb3J0IGNvbnN0IFNVUlZFWV9TVEFUVVMgPSB7ICdvcGVuJzogJ09wZW4nLCAnY2xvc2VkJzogJ0Nsb3NlZCcsICdpbml0aWFsJzogJ0luaXRpYWwnIH07XG5leHBvcnQgY29uc3QgU1VSVkVZX01FTUJFUl9ST0xFID0geyAnY2FuZGlkYXRlJzogJ0NhbmRpZGF0ZScsICdzdXBlcnZpc29yJzogJ1N1cGVydmlzb3InLCAnZWRpdG9yJzonRWRpdG9yJyB9O1xuZXhwb3J0IGNvbnN0IFNVUlZFWV9NRU1CRVJfRU5ST0xMX1NUQVRVUyA9IHsgJ2luLXByb2dyZXNzJzogJ0luLXByb2dyZXNzJywgJ2NvbXBsZXRlZCc6ICdDb21wbGV0ZScsICdyZWdpc3RlcmVkJzogJ1JlZ2lzdGVyZWQnIH07XG5leHBvcnQgY29uc3QgUFJJTlRfRElBTE9HX1NUWUxFID0gYDxzdHlsZT5cbiAgICAgICAgICAgICAgICAgIC8vLi4uLi4uLi5DdXN0b21pemVkIHN0eWxlLi4uLi4uLlxuICAgICAgICAgICAgICAgICAgICAuaGVhZGVye1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC5uYW1lLWN7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1NSU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAubmFtZS1le1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA0MHB4O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLm5hbWUtYywgLm5hbWUtZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC5sYWJlbHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC50aXRsZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDo0MHB4O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLmlucyBwe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dC1pbmRlbnQ6IDI1cHg7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAuZi1wcmludHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjpub25lO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbi10b3A6IC0xMHB4O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAuZi1wcmludCB1bHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMTBweDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC5sLXF1ZXN0aW9ue1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZy1ib3R0b206IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLmwtcXVlc3Rpb24gbGl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0LXN0eWxlLXR5cGU6IGRlY2ltYWw7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAuYm9sZHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLnN0dWRlbnR7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDoxMDBweDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC5yYWRpb3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZy1yaWdodDogNXB4O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPC9zdHlsZT5gOyJdfQ==
