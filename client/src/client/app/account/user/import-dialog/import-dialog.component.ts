import { Component, OnInit, Input} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/user.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { ExcelService, EXCEL_TYPE } from '../../../shared/services/excel.service';

@Component({
    moduleId: module.id,
    selector: 'etraining-user-import-dialog',
    templateUrl: 'import-dialog.component.html',
})
export class UserImportDialog extends BaseComponent {

	display:boolean;
	fileType:string;

	constructor(private excelService: ExcelService) {
		super();
		this.display = false;
		this.fileType = EXCEL_TYPE;
	}

	show(users:any) {
        this.display = true;
    }

    hide() {
        this.display = false;
    }

	import() {

	}

	changeListner(event: any) {
		var file = event.files[0];
        this.excelService.importFromExcelFile(file).subscribe(data=> {
        	console.log(data);
        })
    }


}

