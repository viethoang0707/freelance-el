import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, Http, BaseRequestOptions, XHRBackend } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { TeacherGuard } from './guards/teacher.guard';
import { SupervisorGuard } from './guards/supervisor.guard';
import { APIService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { LangService } from './services/lang.service';
import { CacheService } from './services/cache.service';
import { ExcelService } from './services/excel.service';
import { SettingService } from './services/setting.service';
import { MeetingService } from './services/meeting.service';
import { WindowRef } from './helpers/windonw.ref';
import { TreeUtils } from './helpers/tree.utils';
import { SyllabusUtils } from './helpers/syllabus.utils';
import { ReportUtils } from './helpers/report.utils';
import { MatchInputValidatorDirective } from './validators/match-input.directive';
import { ValuesPipe } from './pipes/map.pipe';
import { KeysPipe } from './pipes/map.pipe';
import { GroupsPipe } from './pipes/group.pipe';
import { TimeConvertPipe, ClockPipe } from './pipes/time.pipe';
import { ImageBase64Pipe } from './pipes/image-base64.pipe';
import { ImageBase64Component } from './components/image-base64/image-base64.component';
import { GroupDialog } from './components/group-dialog/group-dialog.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { SelectCoursesDialog } from './components/select-course-dialog/select-course-dialog.component';
import { SelectQuestionsDialog } from './components/select-question-dialog/select-question-dialog.component';
import { SelectGroupDialog } from './components/select-group-dialog/select-group-dialog.component';
import { SelectUsersDialog } from './components/select-user-dialog/select-user-dialog.component';
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
import { MessagesModule } from 'primeng/primeng';
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
        TranslateModule],
    declarations: [
        // App components
        MatchInputValidatorDirective,
        ValuesPipe,
        KeysPipe,
        GroupsPipe,
        TimeConvertPipe,
        ClockPipe,
        ImageBase64Pipe,
        ImageBase64Component,
        GroupDialog,
        GroupListComponent,
        SelectUsersDialog,
        SelectCoursesDialog,
        SelectQuestionsDialog,
        SelectGroupDialog
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
        GroupsPipe,
        ImageBase64Pipe,
        TimeConvertPipe,
        ClockPipe,
        MatchInputValidatorDirective,
        ImageBase64Component,
        GroupDialog,
        GroupListComponent,
        SelectCoursesDialog,
        SelectUsersDialog,
        SelectGroupDialog,
        SelectQuestionsDialog,
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
        TranslateModule],
})
export class ErpSharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AuthGuard,
                AdminGuard,
                TeacherGuard,
                SupervisorGuard,
                APIService,
                AuthService,
                MessageService,
                LangService,
                CacheService,
                MeetingService,
                TreeUtils,
                WindowRef,
                SyllabusUtils,
                ExcelService,
                SettingService,
                ConfirmationService]
        };
    }
}
