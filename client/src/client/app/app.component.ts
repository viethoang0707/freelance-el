import { Component } from '@angular/core';
import { Config } from './env.config';
import { TranslateService } from '@ngx-translate/core';
import './operators';

/**
 * This class represents the main application component.
 */
@Component({
	moduleId: module.id,
	selector: 'etraining-app',
	template: `<router-outlet></router-outlet>`
})
export class AppComponent {

	constructor(translate: TranslateService) {
		translate.setDefaultLang('vi');
		translate.use('en');
		console.log('Environment config', Config);
	}


}
