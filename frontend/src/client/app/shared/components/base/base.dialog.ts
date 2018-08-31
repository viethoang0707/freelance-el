import 'rxjs/add/operator/map';
import { Observable, Subject } from 'rxjs/Rx';
import { BaseComponent } from '../base/base.component';
import { Component, OnInit, Input } from '@angular/core';
import { BaseModel } from '../../models/base.model';

import { AuthService } from '../../services/auth.service';

export abstract class BaseDialog<T extends BaseModel> extends BaseComponent {

    originalObject: any;
    object: any;
    display: boolean;
    protected onCreateCompleteReceiver: Subject<any> = new Subject();
    protected onUpdateCompleteReceiver: Subject<any> = new Subject();
    protected onShowReceiver: Subject<any> = new Subject();
    protected onHideReceiver: Subject<any> = new Subject();
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
        this.originalObject = {};
        Object.assign(this.originalObject, this.object);
        this.display = true;
        this.onShowReceiver.next(object);
    }

    cancel() {
        Object.assign(this.object, this.originalObject);
        this.hide();
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
            }, (e) => {
                this.error(this.translateService.instant('Operation failed'));
            });
        }
        else {
            this.object.save(this).subscribe(() => {
                this.onUpdateCompleteReceiver.next(this.object);
                this.hide();
            }, (e) => {
                this.error(this.translateService.instant('Operation failed'));
            });
        }
    }
}

