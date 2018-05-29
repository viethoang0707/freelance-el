import { Component, OnInit } from '@angular/core';
import { Config } from './env.config';
import './operators';
import { BaseComponent } from './shared/components/base/base.component';
import { DEFAULT_LANG } from './shared/models/constants';


@Component({
	moduleId: module.id,
	selector: 'app',
	template: `<router-outlet></router-outlet>`
})
export class AppComponent extends BaseComponent{

	constructor() {
		super();
		this.translateService.setDefaultLang(DEFAULT_LANG);
        this.translateService.use(this.settingService.Lang;);
		console.log('Environment config', Config);
	}


}
