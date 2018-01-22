import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { APIContext } from '../../models/context';
import { ServiceLocator } from "../../../service.locator";

export abstract class BaseComponent implements APIContext {
	apiService: APIService;
	authService: AuthService;
	messageService: MessageService;

	constructor() {
		this.apiService = ServiceLocator.injector.get(APIService);
		this.authService = ServiceLocator.injector.get(AuthService);;
		this.messageService = ServiceLocator.injector.get(MessageService);;
	}

}
