import 'rxjs/add/operator/map';
import { Observable, Subject } from 'rxjs/Rx';
import { BaseComponent } from '../base/base.component';
import { Component, OnInit, Input } from '@angular/core';
import { BaseModel } from '../../models/base.model';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

export abstract class BaseDialog<T extends BaseModel> extends BaseComponent {

    object: any;
    display: boolean;
    private onCreateCompleteReceiver: Subject<any> = new Subject();
    private onUpdateCompleteReceiver: Subject<any> = new Subject();
    private onShowReceiver: Subject<any> = new Subject();
    private onHideReceiver: Subject<any> = new Subject();
    onCreateComplete: Observable<any> = this.onCreateCompleteReceiver.asObservable();
    onUpdateComplete: Observable<any> = this.onUpdateCompleteReceiver.asObservable();
    onShow: Observable<any> = this.onShowReceiver.asObservable();
    onHide: Observable<any> = this.onHideReceiver.asObservable();

    constructor() {
        super();
        this.display = false;
        this.object = {};
    }


    show(object: any) {
        this.object = object;
        this.display = true;
        this.onShowReceiver.next(object);
    }

    hide() {
        this.display = false;
        this.onHideReceiver.next();
    }

    save() {
        if (!this.object.id) {
            this.object.save(this).subscribe(() => {
                this.hide();
                this.onCreateCompleteReceiver.next(this.object);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: this.translateService.instant('Object created successfully.') });
            })
        }
        else {
            this.object.save(this).subscribe(() => {
                this.hide();
                this.onUpdateCompleteReceiver.next(this.object);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: this.translateService.instant('Object saved successfully.') });
            })
        }
    }
}

