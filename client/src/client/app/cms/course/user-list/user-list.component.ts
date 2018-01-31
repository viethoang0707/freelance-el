import { Component, Input, OnInit, AfterViewInit} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { ToolbarManager} from '../../../shared/components/base/toolbar.manager';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { USER_STATUS } from '../../../shared/models/constants'
import { User } from '../../../shared/models/user.model';
import { Group } from '../../../shared/models/group.model';
import { Employee } from '../../../shared/models/employee.model';
import { ListingViewComponent, } from '../../../shared/components/listing-view/listing-view.component';

@Component({
    moduleId: module.id,
    selector: 'hrm-user-list',
    templateUrl: 'user-list.component.html',
    styleUrls: ['user-list.component.css'],
    providers: [ ToolbarManager ]
})
export class UserListComponent extends ListingViewComponent<User> {

    groups: Group[];
    filteredGroup: Group;
    employee: Employee;
    employeeId: number;

    constructor(
                toolbarService: ToolbarManager) {
        super( toolbarService);
        this.filteredGroup = new Group();
        Group.listUIAccessGroup(this).subscribe( data => this.groups = data);
    }

    tableOptios() {
       return {
                dom: 't<"col-md-7"il><"col-md-5"p>',
                language: {
                    url: "./assets/locale/datatable.vn.json"
                },
                scrollX: true
            };
    }

    selectGroupFilter(group:Group) {
        if (this.filteredGroup.id) {
            if (this.filteredGroup.id == group.id) 
                this.filteredGroup =  new Group();
            else
                this.filteredGroup =  group;
        } else {
            this.filteredGroup = group;
        }
        this.applyFilterGroup( this.filteredGroup);
    }

    onSelectRow(index:number) {
        super.onSelectRow(index);
        this.employeeId =  this.selectedRecord.employee_ids[0];
    }

    applyFilterGroup( group:Group) {
        var filterUsers = _.filter(this.records, function(item) {
            return (!group.id || item.ui_access_group == group.id) 
        });
        this.populateTable(filterUsers);
    }

    getTableDatal():Observable<User[]> {
        var users =  User.allUserWithEmployee(this);
        return users;
    }
    
    createEmptyModel():User {
        return new User();
    }
    
    populateRow(obj:User):any[] {
        return [obj.login, obj.name, obj.mobile, obj.email, '',obj.create_date, obj.active? USER_STATUS[obj.active.toString()]:''];
    }

}
