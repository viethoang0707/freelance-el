import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ExamQuestion } from '../../../shared/models/elearning/exam-question.model';
import { Certificate } from '../../../shared/models/elearning/course-certificate.model';
import { Token } from '../../../shared/models/cloud/token.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { Question } from '../../../shared/models/elearning/question.model';
import { QuestionSheet } from '../../../shared/models/elearning/question-sheet.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { Http, Response } from '@angular/http';
import { GROUP_CATEGORY, PRINT_DIALOG_STYLE } from '../../../shared/models/constants'
import { BaseDialog } from '../../../shared/components/base/base.dialog';

@Component({
    moduleId: module.id,
    selector: 'certificate-print-dialog',
    templateUrl: 'certificate-print.dialog.component.html',
    styleUrls: ['certificate-print.dialog.component.css'],
})
export class CertificatePrintDialog extends BaseDialog<Certificate> {

    @ViewChild('printSection') printSection;

    constructor() {
        super();
    }


    print() {
        let printContents, popupWin;
        printContents = this.printSection.nativeElement.innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
          <html>
            <head>
                <title>Exam paper</title>
                <style>
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
                </style>
            </head>
            <body onload="window.print();window.close()">${printContents}</body>
          </html>`
        );
        popupWin.document.close();
    }
}



