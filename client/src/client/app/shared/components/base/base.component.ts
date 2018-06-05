import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { APIService } from '../../services/api.service';
import { CloudAPIService } from '../../services/cloud-api.service';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { APIContext } from '../../models/context';
import { ServiceLocator } from "../../../service.locator";
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { SettingService } from '../../services/setting.service';
import { CacheService } from '../../services/cache.service';
import { DataAccessService } from '../../services/data-access.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { Observable, Subject, Subscription } from 'rxjs/Rx';

export abstract class BaseComponent implements APIContext {
	apiService: APIService;
	cloudApiService: APIService;
	authService: AuthService;
	messageService: MessageService;
	confirmationService: ConfirmationService;
	translateService: TranslateService;
	settingService: SettingService;
	loadingService: LoadingService;
	dataAccessService: DataAccessService;
	cacheService: CacheService;
	transactionCount: number;

	constructor() {
		this.apiService = ServiceLocator.injector.get(APIService);
		this.cloudApiService = ServiceLocator.injector.get(CloudAPIService);
		this.loadingService = ServiceLocator.injector.get(LoadingService);
		this.authService = ServiceLocator.injector.get(AuthService);
		this.messageService = ServiceLocator.injector.get(MessageService);
		this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
		this.translateService = ServiceLocator.injector.get(TranslateService);
		this.settingService = ServiceLocator.injector.get(SettingService);
		this.cacheService = ServiceLocator.injector.get(CacheService);
		this.dataAccessService = ServiceLocator.injector.get(DataAccessService);
		this.transactionCount =  0;
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

	startTransaction() {
		if (this.transactionCount == 0 ) 
			this.loadingService.start();
		this.transactionCount++;
	}

	closeTransaction() {
		if (this.transactionCount ==1) 
			this.loadingService.finish();
		this.transactionCount--;
	}

}
