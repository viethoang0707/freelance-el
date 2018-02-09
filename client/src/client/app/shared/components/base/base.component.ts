import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { APIContext } from '../../models/context';
import { ServiceLocator } from "../../../service.locator";
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { CacheService } from '../../services/cache.service';
import { SettingService } from '../../services/setting.service';

export abstract class BaseComponent implements APIContext {
	apiService: APIService;
	authService: AuthService;
	messageService: MessageService;
	confirmationService: ConfirmationService;
	translateService: TranslateService;
	cacheService: CacheService;
	settingService: SettingService;

	constructor() {
		this.apiService = ServiceLocator.injector.get(APIService);
		this.authService = ServiceLocator.injector.get(AuthService);
		this.messageService = ServiceLocator.injector.get(MessageService);
		this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
		this.translateService = ServiceLocator.injector.get(TranslateService);
		this.cacheService = ServiceLocator.injector.get(CacheService);
		this.settingService = ServiceLocator.injector.get(SettingService);
	}

}
