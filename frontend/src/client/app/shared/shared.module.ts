import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, Http, BaseRequestOptions, XHRBackend } from '@angular/http';
import { TranslateModule, } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { CourseGuard } from './guards/course.guard';
import { ExamGuard } from './guards/exam.guard';
import { SurveyGuard } from './guards/survey.guard';
import { SyllabusGuard } from './guards/syllabus.guard';
import { ModelAPIService } from './services/api/model-api.service';
import { FileAPIService } from './services/api/file-api.service';
import { AccountAPIService } from './services/api/account-api.service';
import { AuthService } from './services/auth.service';
import { WorkflowService } from './services/workflow.service';
import { ExcelService } from './services/excel.service';
import { MenuService } from './services/menu.service';
import { LMSProfileService } from './services/lms-profile.service';
import { SettingService } from './services/setting.service';
import { AppEventManager } from './services/app-event-manager.service';
import { NotificationService } from './services/notification.service';
import { MeetingService } from './services/meeting.service';
import { WindowRef } from './helpers/windonw.ref';
import { TreeUtils } from './helpers/tree.utils';
import { SyllabusUtils } from './helpers/syllabus.utils';
import { ReportUtils } from './helpers/report.utils';
import { ScrollTracker } from './helpers/scroll-tracker.directive';
import { VarDirective } from './helpers/ng-var.directive';
import { MatchInputValidatorDirective } from './validators/match-input.directive';
import { ValuesPipe } from './pipes/map.pipe';
import { KeysPipe } from './pipes/map.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { LowercasePipe } from './pipes/lowercase.pipe';
import { GroupsPipe } from './pipes/group.pipe';
import { TimeConvertPipe, ClockPipe } from './pipes/time.pipe';
import { ImageBase64Pipe } from './pipes/image-base64.pipe';
import { ImageBase64Component } from './components/image-base64/image-base64.component';
import { GroupDialog } from './components/group-dialog/group-dialog.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { SelectCoursesDialog } from './components/select-course-dialog/select-course-dialog.component';
import { SelectQuestionsDialog } from './components/select-question-dialog/select-question-dialog.component';
import { SelectGroupDialog } from './components/select-group-dialog/select-group-dialog.component';
import { SelectMultiGroupDialog } from './components/select-multi-group-dialog/select-multi-group-dialog.component';
import { SelectUsersDialog } from './components/select-user-dialog/select-user-dialog.component';
import { SelectAdminDialog } from './components/select-admin-dialog/select-admin-dialog.component';
import { SelectCompetencyDialog } from './components/select-competency-dialog/select-competency-dialog.component';
import { SelectCompetencyLevelDialog } from './components/select-competency-level-dialog/select-competency-level-dialog.component';
import { SelectSurveySheetDialog } from './components/select-survey-sheet-dialog/select-survey-sheet-dialog.component';
import { SelectQuestionSheetDialog } from './components/select-question-sheet-dialog/select-question-sheet-dialog.component';
import { MailMessageDialog } from './components/mail-message/mail-message.dialog.component'
import { AccordionModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { BreadcrumbModule } from 'primeng/primeng';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/primeng';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/primeng';
import { CarouselModule } from 'primeng/primeng';
import { KeyFilterModule } from 'primeng/primeng';
import { ChartModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import { ChipsModule } from 'primeng/primeng';
import { CodeHighlighterModule } from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/api';
import { ColorPickerModule } from 'primeng/primeng';
import { SharedModule } from 'primeng/primeng';
import { ContextMenuModule } from 'primeng/primeng';
import { DataGridModule } from 'primeng/primeng';
import { DataListModule } from 'primeng/primeng';
import { DataScrollerModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { DragDropModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { EditorModule } from 'primeng/primeng';
import { FieldsetModule } from 'primeng/primeng';
import { FileUploadModule } from 'primeng/primeng';
import { GalleriaModule } from 'primeng/primeng';
import { GMapModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { InputMaskModule } from 'primeng/primeng';
import { InputSwitchModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { InputTextareaModule } from 'primeng/primeng';
import { InplaceModule } from 'primeng/inplace';
import { LightboxModule } from 'primeng/primeng';
import { ListboxModule } from 'primeng/primeng';
import { MegaMenuModule } from 'primeng/primeng';
import { MenuModule } from 'primeng/primeng';
import { MenubarModule } from 'primeng/primeng';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/primeng';
import { OrderListModule } from 'primeng/primeng';
import { OrganizationChartModule } from 'primeng/primeng';
import { OverlayPanelModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { PanelMenuModule } from 'primeng/primeng';
import { PasswordModule } from 'primeng/primeng';
import { PickListModule } from 'primeng/primeng';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { RatingModule } from 'primeng/primeng';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScheduleModule } from 'primeng/primeng';
import { SelectButtonModule } from 'primeng/primeng';
import { SlideMenuModule } from 'primeng/primeng';
import { SliderModule } from 'primeng/primeng';
import { SpinnerModule } from 'primeng/primeng';
import { SplitButtonModule } from 'primeng/primeng';
import { StepsModule } from 'primeng/primeng';
import { TabMenuModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/primeng';
import { TerminalModule } from 'primeng/primeng';
import { TieredMenuModule } from 'primeng/primeng';
import { ToggleButtonModule } from 'primeng/primeng';
import { ToolbarModule } from 'primeng/primeng';
import { TooltipModule } from 'primeng/primeng';
import { TreeModule } from 'primeng/primeng';
import { TreeTableModule } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
    imports: [
        // Angular modules
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        // PrimeNG modules
        AccordionModule,
        AutoCompleteModule,
        BlockUIModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CarouselModule,
        CardModule,
        ChartModule,
        CheckboxModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ColorPickerModule,
        SharedModule,
        ContextMenuModule,
        DataGridModule,
        DataListModule,
        DataScrollerModule,
        DataTableModule,
        DialogModule,
        DragDropModule,
        DropdownModule,
        EditorModule,
        FieldsetModule,
        FileUploadModule,
        GalleriaModule,
        GMapModule,
        GrowlModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        InplaceModule,
        KeyFilterModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessagesModule,
        MessageModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        ProgressSpinnerModule,
        RadioButtonModule,
        RatingModule,
        ScrollPanelModule,
        ScheduleModule,
        SelectButtonModule,
        SlideMenuModule,
        SliderModule,
        SpinnerModule,
        SplitButtonModule,
        StepsModule,
        TabMenuModule,
        TabViewModule,
        TableModule,
        TerminalModule,
        TieredMenuModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        TranslateModule,
        PdfViewerModule
    ],
    declarations: [
        // App components
        MatchInputValidatorDirective,
        ValuesPipe,
        KeysPipe,
        GroupsPipe,
        TimeConvertPipe,
        ClockPipe,
        SafePipe,
        ImageBase64Pipe,
        LowercasePipe,
        VarDirective,
        ScrollTracker,
        ImageBase64Component,
        GroupDialog,
        GroupListComponent,
        SelectUsersDialog,
        SelectCoursesDialog,
        SelectQuestionsDialog,
        SelectGroupDialog,
        SelectAdminDialog,
        SelectQuestionSheetDialog,
        SelectMultiGroupDialog,
        SelectCompetencyDialog,
        SelectCompetencyLevelDialog,
        SelectSurveySheetDialog,
        MailMessageDialog
    ],
    exports: [
        // Angular modules
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpModule,
        // App components
        ValuesPipe,
        KeysPipe,
        SafePipe,
        GroupsPipe,
        ImageBase64Pipe,
        TimeConvertPipe,
        ClockPipe,
        VarDirective,
        ScrollTracker,
        LowercasePipe,
        MatchInputValidatorDirective,
        ImageBase64Component,
        GroupDialog,
        GroupListComponent,
        SelectCoursesDialog,
        SelectUsersDialog,
        SelectGroupDialog,
        SelectQuestionsDialog,
        SelectAdminDialog,
        SelectQuestionSheetDialog,
        SelectMultiGroupDialog,
        SelectCompetencyDialog,
        SelectCompetencyLevelDialog,
        SelectSurveySheetDialog,
        MailMessageDialog,
        // PrimeNG modules
        AccordionModule,
        AutoCompleteModule,
        BlockUIModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CarouselModule,
        CardModule,
        ChartModule,
        CheckboxModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ColorPickerModule,
        SharedModule,
        ContextMenuModule,
        DataGridModule,
        DataListModule,
        DataScrollerModule,
        DataTableModule,
        DialogModule,
        DragDropModule,
        DropdownModule,
        EditorModule,
        FieldsetModule,
        FileUploadModule,
        GalleriaModule,
        GMapModule,
        GrowlModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        InplaceModule,
        KeyFilterModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessagesModule,
        MessageModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        ProgressSpinnerModule,
        RadioButtonModule,
        RatingModule,
        ScheduleModule,
        ScrollPanelModule,
        SelectButtonModule,
        SlideMenuModule,
        SliderModule,
        SpinnerModule,
        SplitButtonModule,
        StepsModule,
        TabMenuModule,
        TableModule,
        TabViewModule,
        TerminalModule,
        TieredMenuModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        TranslateModule,
        PdfViewerModule
    ],
})
export class ErpSharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AuthGuard,
                AdminGuard,
                CourseGuard,
                ExamGuard,
                SurveyGuard,
                SyllabusGuard,
                AccountAPIService,
                ModelAPIService,
                FileAPIService,
                AuthService,
                MessageService,
                MeetingService,
                WindowRef,
                ExcelService,
                LMSProfileService,
                AppEventManager,
                WorkflowService,
                MenuService,
                NotificationService,
                SettingService,
                ConfirmationService]
        };
    }
}
