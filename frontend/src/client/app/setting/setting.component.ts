import {Component, ViewEncapsulation, OnInit, OnDestroy} from '@angular/core';

declare var $: any;

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'setting',
    template: '<p-growl ></p-growl><router-outlet></router-outlet>',
})

export class SettingComponent  {



}
