import { Component, ViewEncapsulation, Input, OnInit, AfterViewInit, OnDestroy, ElementRef, Renderer, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/primeng';
import { HomeEventManager } from '../home-manager.service';
import { HomeComponent } from '../home.component';
import { Credential } from '../../shared/models/credential.model';
import { BaseComponent } from '../../shared/components/base/base.component';
declare var jQuery: any;


@Component({
    moduleId: module.id,
    selector: 'etraining-menu',
    templateUrl: 'side-menu.component.html',
    styleUrls: ['side-menu.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class SideMenuComponent extends BaseComponent implements OnInit {

    @Input() reset: boolean;
    model: any[];
    credential: Credential
    layoutMenuScroller: HTMLDivElement;
    @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ElementRef;

    constructor(public app: HomeComponent, private eventManager: HomeEventManager) {
        super();
        this.credential = this.authService.StoredCredential;
    }

    ngOnInit() {
        this.model = [
            { label: 'Bàn làm việc', icon: 'dashboard', routerLink: ['/dashboard'] },
            { label: '', separator: true, styleClass: 'menu-separator' },
            {
                label: 'Tuyển dụng', icon: 'account_circle',
                items: [
                    { label: 'Hồ sơ', routerLink: ['/employee/record'] },
                    { label: 'Hợp đồng', routerLink: ['/employee/contract'] },
                    { label: 'Quyết định lương', routerLink: ['/employee/salary'] },
                    { label: 'Quyết định thôi việc', routerLink: ['/employee/terminate'] },
                ]
            },
            {
                label: 'Chấm công', icon: 'access_time',
                items: [
                    {
                        label: 'Thông số',
                        items: [
                            { label: 'Ký hiệu chấm công', routerLink: ['/attendance/symbol'] },
                            { label: 'Ca làm việc', routerLink: ['/attendance/shift'] },
                            { label: 'Bảng mã chấm công', routerLink: ['/attendance/code-register'] },
                            { label: 'Đăng ký ca làm việc', routerLink: ['/attendance/shift-register'] },
                        ]
                    },
                    {
                        label: 'Chấm công',
                        items: [
                            { label: 'Vào ra ca', routerLink: ['/attendance/timesheet'] },
                        ]
                    },
                    {
                        label: 'Tổng hợp',
                        items: [
                            { label: 'Chấm công ngày', routerLink: ['/attendance/timesheet-daily'] },
                            { label: 'Chấm công tháng', routerLink: ['/attendance/timesheet-monthly'] },
                        ]
                    },
                ]
            },
            {
                label: 'Bảng lương', icon: 'payment',
                items: [
                    { label: 'Tạo bảng lương', routerLink: ['/payroll/create'] },
                    { label: 'Xuất bảng lương', routerLink: ['/payroll/apply'] },
                ]
            },
            { label: '', separator: true, styleClass: 'menu-separator' },
            {
                label: 'Thông tin hồ sơ', icon: 'menu',
                items: [
                    { label: 'Dân tộc', routerLink: ['/directory/listing-view', { 'model': 'viethrm-ethnic', title: 'Dân tộc' }] },
                    { label: 'Tôn giáo', routerLink: ['/directory/listing-view', { 'model': 'viethrm-religion', title: 'Tôn giáo' }] },
                    { label: 'Tình trạng sức khỏe', routerLink: ['/directory/listing-view', { 'model': 'viethrm-health_status', title: 'Tình trạng sức khỏe' }] },
                    { label: 'Nơi khám sức khỏe', routerLink: ['/directory/listing-view', { 'model': 'viethrm-hospital', title: 'Nơi khám sức khỏe' }] },
                    { label: 'Nơi cấp BHXH', routerLink: ['/directory/listing-view', { 'model': 'viethrm-soc_insurance', title: 'Nơi cấp BHXH' }] },
                    { label: 'Nơi cấp BHYT', routerLink: ['/directory/listing-view', { 'model': 'viethrm-med_insurance', title: 'Nơi cấp BHYT' }] },
                    { label: 'Nơi cấp CMT', routerLink: ['/directory/listing-view', { 'model': 'viethrm-id_place', title: 'Nơi cấp CMT' }] },
                    { label: 'Nơi cấp hộ chiếu', routerLink: ['/directory/listing-view', { 'model': 'viethrm-passport_place', title: 'Nơi cấp hộ chiếu' }] },
                    { label: 'Quan hệ họ hàng', routerLink: ['/directory/listing-view', { 'model': 'viethrm-relatives', title: 'Quan hệ họ hàng' }] },
                    { label: 'Đối tượng chính sách', routerLink: ['/directory/listing-view', { 'model': 'viethrm-policy_class', title: 'Đối tượng chính sách' }] },
                    { label: 'Tỉnh thành', routerLink: ['/directory/listing-view', { 'model': 'res-country-state', title: 'Tỉnh thành' }] },
                    { label: 'Ngân hàng', routerLink: ['/directory/listing-view', { 'model': 'viethrm-bank', title: 'Ngân hàng' }] },
                    { label: 'Quốc tịch', routerLink: ['/directory/listing-view', { 'model': 'viethrm-nationality', title: 'Quốc tịch' }] },
                ]
            },
            {
                label: 'Thông tin công việc', icon: 'menu',
                items: [
                    { label: 'Phòng ban', routerLink: ['/directory/tree-view', { 'model': 'hr-department', title: 'Phòng ban' }] },
                    { label: 'Vị trí', routerLink: ['/directory/listing-view', { 'model': 'viethrm-position', title: 'Vị trí' }] },
                    { label: 'Tình trạng làm việc', routerLink: ['/directory/listing-view', { 'model': 'viethrm-job_status', title: 'Tình trạng làm việc' }] },
                    { label: 'Hình thức làm việc', routerLink: ['/directory/listing-view', { 'model': 'viethrm-work_mode', title: 'Hình thức làm việc' }] },
                    { label: 'Loại hợp dồng', routerLink: ['/directory/listing-view', { 'model': 'hr-contract-type', title: 'Loại hợp dồng' }] },
                ]
            },
            {
                label: 'Trình độ - Chứng chỉ', icon: 'menu',
                items: [
                    { label: 'Trình độ văn hóa', routerLink: ['/directory/tree-view', { 'model': 'hr-recruitment-degree', title: 'Trình độ văn hóa' }] },
                    { label: 'Chuyên ngành', routerLink: ['/directory/listing-view', { 'model': 'viethrm-speciality', title: 'Chuyên ngành' }] },
                    { label: 'Trường đào tạo', routerLink: ['/directory/listing-view', { 'model': 'viethrm-school', title: 'Trường đào tạo' }] },
                    { label: 'Chứng chỉ', routerLink: ['/directory/listing-view', { 'model': 'viethrm-certificate', title: 'Chứng chỉ' }] },
                    { label: 'Loại tốt nghiệp', routerLink: ['/directory/listing-view', { 'model': 'viethrm-graduation', title: 'Loại tốt nghiệp' }] },
                    { label: 'Ngoại ngữ', routerLink: ['/directory/listing-view', { 'model': 'viethrm-language_skill', title: 'Ngoại ngữ' }] },
                    { label: 'Tin học', routerLink: ['/directory/listing-view', { 'model': 'viethrm-info_skill', title: 'Tin học' }] },
                    { label: 'Xếp loại', routerLink: ['/directory/listing-view', { 'model': 'viethrm-skill_level', title: 'Xếp loại' }] },
                    { label: 'Kỹ năng', routerLink: ['/directory/listing-view', { 'model': 'viethrm-skill', title: 'Kỹ năng' }] },
                ]
            },
            { label: '', separator: true, styleClass: 'menu-separator' },
            { label: 'Hồ sơ công ty', icon: 'domain', command: (event) => { this.eventManager.showCompanyProfile(); } },
            { label: 'Phân quyền', icon: 'visibility', routerLink: ['/setting/group'] },
            { label: 'Tài khoản', icon: 'people', routerLink: ['/setting/user'] },
            { label: 'Hệ thống', icon: 'settings' },
        ];
    }


    ngAfterViewInit() {
        this.layoutMenuScroller = <HTMLDivElement>this.layoutMenuScrollerViewChild.nativeElement;

        setTimeout(() => {
            jQuery(this.layoutMenuScroller).nanoScroller({ flash: true });
        }, 10);
    }


    updateNanoScroll() {
        setTimeout(() => {
            jQuery(this.layoutMenuScroller).nanoScroller();
        }, 500);
    }

    ngOnDestroy() {
        jQuery(this.layoutMenuScroller).nanoScroller({ flash: true });
    }
}
