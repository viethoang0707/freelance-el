
import { Component, OnInit, Input} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { ToolbarManager } from '../../../shared/components/base/toolbar.manager';
import { Group } from '../../../shared/models/group.model';
import { ListingItemDialog } from '../../../shared/components/listing-view/listing-view.dialog';
import { User } from '../../../shared/models/user.model';
import { Employee }  from '../../../shared/models/employee.model';

@Component({
    moduleId: module.id,
    selector: 'hrm-user-dialog',
    templateUrl: 'user-dialog.component.html',
})
export class UserDialog extends ListingItemDialog<Group> {
	@Input() employeeId:number;
    groups: Observable<Group[]>;
    employees:Observable<Employee[]>;

    constructor( toolbarService: ToolbarManager) {
        super( toolbarService);
        this.groups = Group.listUIAccessGroup(this);
        this.employees = Employee.all(this);
    }

    onCreateComplete() {
    	var employee = new Employee();
    	employee.fill(+this.employeeId,this).subscribe(()=> {
    		employee.user_id = this.object.id;
    		employee.save(this).subscribe(()=> super.onCreateComplete());
    	});
    }

    onUpdateComplete() {
    	var employee = new Employee();
    	employee.fill(+this.employeeId,this).subscribe(()=> {
    		employee.user_id = this.object.id;
    		employee.save(this).subscribe(()=> super.onCreateComplete());
    	});
    }
}

