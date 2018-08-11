import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
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
                $(PRINT_DIALOG_STYLE)
            </head>
            <body onload="window.print();window.close()">${printContents}</body>
          </html>`
        );
        popupWin.document.close();
    }
}



