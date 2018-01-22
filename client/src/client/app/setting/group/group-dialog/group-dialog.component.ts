
import { Component, OnInit, Input} from '@angular/core';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { ToolbarManager } from '../../../shared/components/base/toolbar.manager';
import { Group } from '../../../shared/models/group.model';
import { ListingItemDialog } from '../../../shared/components/listing-view/listing-view.dialog';


@Component({
    moduleId: module.id,
    selector: 'hrm-group-dialog',
    templateUrl: 'group-dialog.component.html',
})
export class GroupDialog extends ListingItemDialog<Group> {


    constructor(toolbarService: ToolbarManager) {
        super(toolbarService);
    }

}


