import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { APIContext } from '../../models/elearning/context';
import { ServiceLocator } from "../../../service.locator";
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { CacheService } from '../../services/cache.service';
import { SettingService } from '../../services/setting.service';
import { LangService } from '../../services/lang.service';

export abstract class BaseComponent implements APIContext {
	apiService: APIService;
	authService: AuthService;
	messageService: MessageService;
	confirmationService: ConfirmationService;
	translateService: TranslateService;
	cacheService: CacheService;
	settingService: SettingService;
	langService: LangService;

	constructor() {
		this.apiService = ServiceLocator.injector.get(APIService);
		this.authService = ServiceLocator.injector.get(AuthService);
		this.messageService = ServiceLocator.injector.get(MessageService);
		this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
		this.translateService = ServiceLocator.injector.get(TranslateService);
		this.cacheService = ServiceLocator.injector.get(CacheService);
		this.settingService = ServiceLocator.injector.get(SettingService);
		this.langService = ServiceLocator.injector.get(LangService);
	}

	error(msg:string) {
		this.messageService.add({ severity: 'error', summary: 'Error', detail: this.translateService.instant(msg) });
	}

	info(msg:string) {
		this.messageService.add({ severity: 'info', summary: 'Info', detail: this.translateService.instant(msg) });
	}

	success(msg:string) {
		this.messageService.add({ severity: 'success', summary: 'Success', detail: this.translateService.instant(msg) });
	}

	warn(msg:string) {
		this.messageService.add({ severity: 'warn', summary: 'Warn', detail: this.translateService.instant(msg) });
	}

	confirm(prompt:string, callback:()=> any) {
		this.confirmationService.confirm({
            message: this.translateService.instant(prompt),
            accept: () => {
                callback();
            }
        });
	}


}
