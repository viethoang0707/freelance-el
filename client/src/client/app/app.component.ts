import { Component, OnInit } from '@angular/core';
import { Config } from './env.config';
import './operators';
import { BaseComponent } from './shared/components/base/base.component';


@Component({
	moduleId: module.id,
	selector: 'app',
	template: `<router-outlet></router-outlet>`
})
export class AppComponent extends BaseComponent{

	constructor() {
		super();
		this.translateService.setDefaultLang('vn');
        var defaultLang = this.settingService.Lang?this.settingService.Lang:'vn';
        this.translateService.use(defaultLang);
		console.log('Environment config', Config);
	}


}
