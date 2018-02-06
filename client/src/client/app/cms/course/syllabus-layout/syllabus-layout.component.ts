import { Component, OnInit, Input} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/user.model';
import { Syllabus }  from '../../../shared/models/course-syllabus.model';

@Component({
    moduleId: module.id,
    selector: 'etraining-syllabus-layout',
    templateUrl: 'syllabus-layout.component.html',
})
export class SyllabusLayoutComponent extends BaseComponent {


    constructor( ) {
        super();
    }


}

