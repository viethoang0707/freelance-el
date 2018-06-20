import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ModelAPIService } from '../../services/api/model-api.service';
import { AccountAPIService } from '../../services/api/account-api.service';
import { FileAPIService } from '../../services/api/file-api.service';
import { AuthService } from '../../services/auth.service';
import { AppEventManager } from '../../services/app-event-manager.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { APIContext } from '../../models/context';
import { ServiceLocator } from "../../../service.locator";
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { SettingService } from '../../services/setting.service';
import { Observable, Subject, Subscription } from 'rxjs/Rx';

export abstract class BaseComponent implements APIContext {
	apiService: ModelAPIService;
	accApiService: AccountAPIService;
	fileApiService: FileAPIService;
	authService: AuthService;
	messageService: MessageService;
	confirmationService: ConfirmationService;
	translateService: TranslateService;
	settingService: SettingService;
	appEvent: AppEventManager;

	constructor() {
		this.apiService = ServiceLocator.injector.get(ModelAPIService);
		this.fileApiService = ServiceLocator.injector.get(FileAPIService);
		this.appEvent = ServiceLocator.injector.get(AppEventManager);
		this.accApiService = ServiceLocator.injector.get(AccountAPIService);
		this.authService = ServiceLocator.injector.get(AuthService);
		this.messageService = ServiceLocator.injector.get(MessageService);
		this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
		this.translateService = ServiceLocator.injector.get(TranslateService);
		this.settingService = ServiceLocator.injector.get(SettingService);
	}

	error(msg:string) {
		this.messageService.add({ severity: 'error', summary: this.translateService.instant('Error'), detail: this.translateService.instant(msg) });
	}

	info(msg:string) {
		this.messageService.add({ severity: 'info', summary: this.translateService.instant('Info'), detail: this.translateService.instant(msg) });
	}

	success(msg:string) {
		this.messageService.add({ severity: 'success', summary: this.translateService.instant('Success'), detail: this.translateService.instant(msg) });
	}

	warn(msg:string) {
		this.messageService.add({ severity: 'warn', summary: this.translateService.instant('Warn'), detail: this.translateService.instant(msg) });
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
