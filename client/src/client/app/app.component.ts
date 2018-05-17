import { Component, OnInit } from '@angular/core';
import { Config } from './env.config';
import './operators';
import { LangService } from './shared/services/lang.service';
import { BaseComponent } from './shared/components/base/base.component';


@Component({
	moduleId: module.id,
	selector: 'app',
	template: `<router-outlet></router-outlet>`
})
export class AppComponent {

	constructor(langService: LangService) {
		langService.initSetting();
		
		console.log('Environment config', Config);
	}


}
