import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { AppEventManager } from '../../services/app-event-manager.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { APIContext } from '../../models/context';
import { ServiceLocator } from "../../../service.locator";
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { SettingService } from '../../services/setting.service';
import { Observable, Subject, Subscription } from 'rxjs/Rx';
import { NotificationService } from '../../../shared/services/notification.service';
import { User } from '../../models/elearning/user.model';
import { Permission } from '../../models/elearning/permission.model';
import { WorkflowService } from '../../services/workflow.service';
import { LMSProfileService } from '../../services/lms-profile.service';

export abstract class BaseComponent implements APIContext {
	apiService: APIService;
	authService: AuthService;
	messageService: MessageService;
	confirmationService: ConfirmationService;
	translateService: TranslateService;
	settingService: SettingService;
	workflowService: WorkflowService;
	lmsProfileService: LMSProfileService;
	appEvent: AppEventManager;

	loading: boolean;

	constructor() {
		this.apiService = ServiceLocator.injector.get(APIService);
		this.appEvent = ServiceLocator.injector.get(AppEventManager);
		this.authService = ServiceLocator.injector.get(AuthService);
		this.messageService = ServiceLocator.injector.get(MessageService);
		this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
		this.translateService = ServiceLocator.injector.get(TranslateService);
		this.settingService = ServiceLocator.injector.get(SettingService);
		this.workflowService = ServiceLocator.injector.get(WorkflowService);
		this.lmsProfileService = ServiceLocator.injector.get(LMSProfileService);

		this.appEvent.onStartHTTP.subscribe(()=> {
			this.loading =  true;
		});
		this.appEvent.onFinishHTTP.subscribe(()=> {
			this.loading =  false;
		});
	}

	get ContextUser():User {
		return this.authService.UserProfile;
	}

	get ContextPermission(): Permission {
		return this.authService.UserPermission;
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
