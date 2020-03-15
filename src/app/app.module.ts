import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from '@app/app.component';
import { TodosComponent } from '@app/todos/todos.component';
import { AppHeaderComponent } from '@app/app-header/app-header.component';
import { TodoListHeaderComponent } from '@app/todos/todo-list-header/todo-list-header.component';
import { TodoListComponent } from '@app/todos/todo-list/todo-list.component';
import { TodoListItemComponent } from '@app/todos/todo-list/todo-list-item/todo-list-item.component';
import { TodoListItemEditComponent } from '@app/todos/todo-list/todo-list-item/todo-list-item-edit/todo-list-item-edit.component';
import { TodoListItemViewComponent } from '@app/todos/todo-list/todo-list-item/todo-list-item-view/todo-list-item-view.component';
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';
import { DialogDeleteComponent } from '@app/dialogs/dialog-delete/dialog-delete.component';
import { DialogMoreComponent } from '@app/dialogs/dialog-more/dialog-more.component';
import { SignInComponent } from '@app/sign-in/sign-in.component';
import { DialogAccountComponent } from '@app/dialogs/dialog-account/dialog-account.component';
import { DialogSettingsComponent } from '@app/dialogs/dialog-settings/dialog-settings.component';
import { ActiveTaskComponent } from '@app/active-task/active-task.component';
import { AppMainComponent } from '@app/app-main/app-main.component';
import { PomosComponent } from '@app/pomos/pomos.component';
import { PomoHeaderComponent } from '@app/pomos/pomo-header/pomo-header.component';
import { DialogCancelComponent } from '@app/dialogs/dialog-cancel/dialog-cancel.component';
import { PomoListComponent } from '@app/pomos/pomo-list/pomo-list.component';
import { StatHistoryComponent } from '@app/stat-history/stat-history.component';
import { StatDetailsComponent } from '@app/stats-details/stat-details.component';
import { HoursChartComponent } from '@app/hours-chart/hours-chart.component';
import { StatCardComponent } from '@app/stat-card/stat-card.component';
import { StatCardDescriptionComponent } from '@app/stat-card-description/stat-card-description.component';
import { WeeklyDaysChartComponent } from './weekly-days-chart/weekly-days-chart.component';
import { TagsPieChartComponent } from './tags-pie-chart/tags-pie-chart.component';

// Services
import { TodoService } from '@app/_services/todo.service';
import { ApiService } from '@app/_services/api.service';
import { IndexedDbService } from '@app/_services/indexed-db.service';
import { TodoOrderService } from '@app/_services/todo-order.service';
import { TagService } from '@app/_services/tag.service';
import { TagLayerService } from '@app/_services/tag-layer.service';
import { SessionStorageService } from '@app/_services/session-storage.service';
import { AuthService } from '@app/_services/auth.service';
import { JwtService } from '@app/_services/jwt.service';
import { PomoStateService } from '@app/_services/pomo-state.service';
import { PomoTitleService } from '@app/_services/pomo-title.service';

// Routings
import { AppRoutingModule } from '@app/app-routing.module';

// Directives
import { RouterLinkActiveStubsDirective } from '@app/_testing/router-stubs.directive';
import { DynamicContentDirective } from '@app/_directives/dynamic-content.directive';
import { TooltipDirective } from '@app/_directives/tooltip.directive';

// Pipes
import { ParseTagPipe } from '@app/_pipes/parse-tag.pipe';
import { SafePipe } from '@app/_pipes/safe.pipe';
import { FilterTagPipe } from '@app/_pipes/filter-tag.pipe';

// Modules
import { DndModule } from '@beyerleinf/ngx-dnd';
import { Autosize } from 'ng-autosize/src/autosize.directive';
// tslint:disable-next-line:max-line-length
import { MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatTooltipModule, MatIconModule, MatProgressBarModule, MatSelectModule } from '@angular/material';
import { Utils } from '@app/_common/utils';

// Guards
import { CanActivateTodosGuard } from '@app/_guards/can-activate-todos.guard';

@NgModule({
    declarations: [
        AppComponent,
        TodoListHeaderComponent,
        TodoListComponent,
        TodoListItemComponent,
        TodosComponent,
        PageNotFoundComponent,
        TodoListItemViewComponent,
        TodoListItemEditComponent,
        RouterLinkActiveStubsDirective,
        Autosize,
        AppHeaderComponent,
        DialogDeleteComponent,
        DialogMoreComponent,
        ParseTagPipe,
        DynamicContentDirective,
        SafePipe,
        FilterTagPipe,
        TooltipDirective,
        SignInComponent,
        DialogAccountComponent,
        DialogSettingsComponent,
        ActiveTaskComponent,
        PomosComponent,
        AppMainComponent,
        PomoHeaderComponent,
        DialogCancelComponent,
        PomoListComponent,
        StatHistoryComponent,
        StatDetailsComponent,
        HoursChartComponent,
        StatCardComponent,
        StatCardDescriptionComponent,
        WeeklyDaysChartComponent,
        TagsPieChartComponent
    ],
    imports: [
        AppRoutingModule,
        HttpClientModule,
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        DndModule.forRoot(),
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatIconModule,
        MatProgressBarModule,
        MatSelectModule
    ],
    providers: [
        TodoService,
        ApiService,
        IndexedDbService,
        TodoOrderService,
        TagService,
        Utils,
        TagLayerService,
        SessionStorageService,
        AuthService,
        CanActivateTodosGuard,
        JwtService,
        PomoStateService,
        PomoTitleService
    ],
    bootstrap: [AppComponent],
    entryComponents: [DialogDeleteComponent, DialogMoreComponent, DialogAccountComponent, DialogSettingsComponent, DialogCancelComponent]
})
export class AppModule { }
