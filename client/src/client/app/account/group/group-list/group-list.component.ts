import { Component, Input, OnInit, AfterViewInit} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { MenuBuilder} from '../../../shared/helpers/menu-builder';
import { ToolbarManager} from '../../../shared/components/base/toolbar.manager';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { Group } from '../../../shared/models/group.model';
import { ListingViewComponent, } from '../../../shared/components/listing-view/listing-view.component';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'hrm-group-list',
    templateUrl: 'group-list.component.html',
    styleUrls: ['group-list.component.css'],
    providers: [ ToolbarManager ]
})
export class GroupListComponent extends ListingViewComponent<Group> implements OnInit {

    $: any = $;
    $tree: any;

    constructor(private menuBuilder: MenuBuilder,
                toolbarService: ToolbarManager) {
        super(toolbarService);
       
        this.toolbarService.deleteEvents.subscribe(() => {
             this.deselectAllTree();
        });

        this.toolbarService.editCompleteEvents.subscribe(() => {
            this.deselectAllTree();
        });
    }

    ngOnInit() {
        super.ngOnInit();
        this.initMenuTree(this.selectedRecord.ui_access || []);
    }

    onSelectRow(index:number) {
        super.onSelectRow(index);
        this.deselectAllTree();
        this.initMenuTree(this.selectedRecord.ui_access || []);
    }

    saveMenu() {
        var nodes = this.$tree.treeview('getChecked');
        var menuIds = _.map(nodes, function (node:any) {
            return node.tag[0];
        });
        this.selectedRecord.ui_access = menuIds;
        this.selectedRecord.save(this).subscribe(()=> {
            this.toastrService.pop('success', 'Cập nhật phân quyền thành công');
        });
    }

    initMenuTree(checkedIds:string[]) {
        var treeData = this.menuBuilder.buildMenuTree(checkedIds);
        var self = this;
        this.$tree = $('#menuTree').treeview({
            data: treeData,
            showIcon: false,
            showCheckbox: true,
            onNodeSelected: function(event:any, data:any) {
                var node = self.$tree.treeview('getNode', data.nodeId);
                  node.state.checked =  true;
                }
        });
    }

    selectAllTree() {
        this.$tree.treeview('checkAll', {
            silent: $('#chk-check-silent').is(':checked')
        });
    }

    deselectAllTree() {
        this.$tree.treeview('uncheckAll', {
            silent: $('#chk-check-silent').is(':checked')
        });
    }

    getTableDatal():Observable<any[]> {
        return Group.listUIAccessGroup(this);
    }
    
    createEmptyModel():Group {
        return new Group();
    }

    populateRow(obj:Group):any[] {
        return [ obj.name, obj.comment]
    }

}
