import { Component, OnInit, OnDestroy } from '@angular/core';

// Environments
import { environment as environmentProd } from '@env/environment.prod';

// Models
import { ToDo } from '@app/_models/to-do';
import { Pomo } from '@app/_models/pomo';

// Routes
import { ActivatedRoute } from '@angular/router';

// Services
import { TodoService } from '@app/_services/todo.service';
import { TodoOrderService } from '@app/_services/todo-order.service';

// Components
import { DialogDeleteComponent } from '@app/dialogs/dialog-delete/dialog-delete.component';
import { DialogMoreComponent } from '@app/dialogs/dialog-more/dialog-more.component';

// Imports
import { map } from 'rxjs/operators';

// Modules
import { MatDialog } from '@angular/material';
import 'hammerjs';

// Constants
const CONSOLE_TEXT_COLOR_COMPONENT = environmentProd.consoleTextColorComponent;

@Component({
    selector: 'app-main',
    templateUrl: './app-main.component.html',
    styleUrls: ['./app-main.component.scss']
})
export class AppMainComponent implements OnInit, OnDestroy {

    todos: ToDo[] = [];
    todo: ToDo = null;
    todosToView: [ToDo[], ToDo[], ToDo[]] = [[], [], []];
    allCompleted: boolean;                    // The variable is for toggleAll checkbox
    activeRouteState = 0;
    clearHoverState = false;
    toggleAllHoverState = false;
    hashTagToFilter = '';
    showSubmenuState = false;
    currentTodo: ToDo = null;
    currentActiveTaskName = '';
    pomoStateAppMain = 0;
    isEmptyTodoList = true;

    selectedLanguage = 'optionEnglish';
    nightMode = false;
    recentPomos: Pomo[] = [];
    dailyGoalList: Pomo[] = [];
    weeklyCumulationList: Pomo[] = [];
    weeklyCumulationChartValues: number[] = [];

    // Ask Angular DI system to inject the dependency
    // associated with the dependency injection token 'TodoDataService'
    // and assign it to a property called _todoDataService
    constructor(private _todoService: TodoService,
        private _route: ActivatedRoute,
        public dialog: MatDialog,
        private _todoOrderService: TodoOrderService) { }

    public ngOnInit() {
        this._route.data.pipe(
            map((data) => data['resolverData'])
        ).subscribe(
            (resolverData) => {
                // console.log(`%c'TodosComponent' _route.params: `, CONSOLE_TEXT_COLOR_COMPONENT, this._route.params);
                // console.log(`%c'TodosComponent' _route.queryParams: `, CONSOLE_TEXT_COLOR_COMPONENT, this._route.queryParams);
                // console.log(`%c'TodosComponent' routeConfig.path: `, CONSOLE_TEXT_COLOR_COMPONENT, this._route.routeConfig.path);

                // console.log(`%cincoming 'resolverData' from resolver: `, CONSOLE_TEXT_COLOR_COMPONENT, resolverData);
                this.activeRouteState = resolverData.activeRouteState;
                this.hashTagToFilter = resolverData.params;
                this.todos = resolverData.todos;

                this.transformView();
            }
        );
    }

    ngOnDestroy() {
        console.log('%cDo not forget to Unsubscribe!', CONSOLE_TEXT_COLOR_COMPONENT);
        // this._route.data.unsubscribe();
        // this.todos.unsubscribe();
    }

    // Method to handle event emitted by TodoListHeaderComponent
    onAddTodo(todo: ToDo) {
        this._todoService.addTodo(todo, this.todos).subscribe((updatedTodos) => {
            console.log('%cin onAddTodo() updatedTodos: ', CONSOLE_TEXT_COLOR_COMPONENT, updatedTodos);
            this.todos = updatedTodos;
            this.transformView();
        });
    }

    // Service is now available as this._todoService
    onToggleTodoComplete(todo: ToDo) {
        // this._todoService.toggleTodoComplete(todo).subscribe((updatedTodo) => {
        //     todo = updatedTodo;
        //     if (todo.complete) {
        //         if (this.activeRouteState === 1) {
        //             this.todos = this.todos.filter((val) => val.id !== todo.id);
        //         }
        //     } else {
        //         if (this.activeRouteState === 2) {
        //             this.todos = this.todos.filter((val) => val.id !== todo.id);
        //         }
        //     }
        //     this.transformView();
        //     this.updateFooterAndToggleAllInfo();
        // });

        this._todoService.toggleTodoComplete(todo, this.todos).subscribe((updatedTodos) => {
            console.log('%cin onToggleTodoComplete updatedTodos: ', CONSOLE_TEXT_COLOR_COMPONENT, updatedTodos);
            this.todos = updatedTodos;
            this.transformView();
        });
    }

    // Method to handle event emitted by TodoListComponent and call DialogDelete
    onRemoveTodo(todo: ToDo) {
        this.todo = todo;

        const dataForDialog = {
            dialogTitle: 'Delete Todo',
            contentTitle: 'Are you sure want to delete todo with name:',
            contentData: todo.title,
            isClearCompleted: false
        };

        const dialogRef = this.dialog.open(DialogDeleteComponent, {
            width: '600px',
            data: {
                data: dataForDialog
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'Confirm') {
                this.removeTodo(todo);    // User confirmed action, call 'removeTodo()'
            } else {
                // User clicked 'Cancel' or clicked outside of the dialog
            }
        });
    }

    // Additional method to perform deletion after modal confirmation
    removeTodo(todo: ToDo) {
        // tslint:disable-next-line:max-line-length
        console.log('%cremoveTodo emited evt removeTodoListItemEmitter from TodoListItemView with ttl: %s (id: %d)', CONSOLE_TEXT_COLOR_COMPONENT, todo.title, todo.id);
        this._todoService.deleteTodoById(todo.id).subscribe((_) => {
            this.todo = _;
            this.todos = this.todos.filter((val) => val.id !== todo.id);
            this.updateOrder();
            this.transformView();
        });
    }

    onUpdateTodo(todo: ToDo) {
        this._todoService.updateTodo(todo).subscribe((updatedTodo) => {
            // todo = updatedTodo;        // We even do not need to update inner todo
            this.getTopMostTodo();
        });
    }

    // Method to handle event emitted by TodoListComponent and call DialogMore
    onMoreTodo(todo: ToDo) {
        // Call dialog with name 'Advanced settings'

        const dataForDialog = {
            dialogTitle: 'Advanced settings',
            pomoCost: todo.costed_pomo,
            estimatedPomos: todo.estimated_pomos,
            remind: todo.remind_me,
            remindTime: todo.remind_time,
            note: todo.note
        };

        const dialogRef = this.dialog.open(DialogMoreComponent, {
            width: '400px',
            data: {
                data: dataForDialog
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && (result['dialogResult'] === 'ConfirmSave' || result['dialogResult'] === 'ConfirmDelete')) {
                // User confirmed actions, call 'removeTodo()' or 'onUpdateTodo()'
                if (result['dialogResult'] === 'ConfirmDelete') {
                    this.removeTodo(todo);
                } else {
                    console.log('%cin TodosComponent in onMoreTodo() result: ', CONSOLE_TEXT_COLOR_COMPONENT, result);

                    todo.costed_pomo = result['pomoCost'];
                    todo.estimated_pomos = result['estimatedPomos'];
                    todo.remind_me = result['remind'];
                    todo.remind_time = result['remindTime'];
                    todo.note = result['note'];

                    this.onUpdateTodo(todo);    // Save changes by calling 'onUpdateTodo()'
                }
            } else {
                // User clicked 'Cancel' or clicked outside of the dialog
            }
        });
    }

    onPinTodo(todo: ToDo) {
        this._todoService.pinTodo(todo, this.todos).subscribe((updatedTodos) => {
            // todo = updatedTodo;        // We even do not need to update inner todo
            console.log('%cin onPinTodo updatedTodos: ', CONSOLE_TEXT_COLOR_COMPONENT, updatedTodos);
            this.todos = updatedTodos;
            this.transformView();
        });
    }

    onToggleAll(toggleState: boolean) {
        console.log('%ctoggleState() called', CONSOLE_TEXT_COLOR_COMPONENT);
        this._todoService.toggleAll(toggleState, this.activeRouteState).subscribe((todos) => {
            console.log('%cin onToggleAll incoming todos:', CONSOLE_TEXT_COLOR_COMPONENT, todos);
            this.todos = todos;
            this.transformView();
        });
    }

    // Method to handle event 'clearTodoListEmitter' and call Dialog
    onClearCompleted(clearState: boolean) {
        const dataForDialog = {
            dialogTitle: 'Delete Todos',
            contentTitle: 'Are you sure want to delete todos amount: ',
            contentData: this.todos.filter(todo => todo.complete === true).length,
            isClearCompleted: true
        };

        const dialogRef = this.dialog.open(DialogDeleteComponent, {
            width: '600px',
            data: {
                data: dataForDialog
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'Confirm') {
                this.clearCompleted(clearState);    // User confirmed action, call 'clearCompleted()'
            } else {
                // User clicked 'Cancel' or clicked outside of the dialog
            }
        });
    }

    clearCompleted(clearState: boolean) {
        // tslint:disable-next-line:max-line-length
        console.log('%conClearCompleted (remove %s in TodosComponent): ', CONSOLE_TEXT_COLOR_COMPONENT, clearState);
        this._todoService.clearCompleted(this.activeRouteState).subscribe((todos) => {
            this.todos = todos;
            // this.updateOrder();    // Order was updated previously in service
            this.transformView();
            this.onClearHoverSetState(false);
        });
    }

    onClearHoverSetState(clearCompletetHoverState: boolean) {
        // tslint:disable-next-line:max-line-length
        // console.log('%conClearHoverSetState emited evt clearHoverStateTodoListItemEmitter from TodoListItemView with state: ', CONSOLE_TEXT_COLOR_COMPONENT, clearCompletetHoverState);
        this.clearHoverState = clearCompletetHoverState;
    }

    onToggleAllHoverSetState(toggleAllHoverState: boolean) {
        // tslint:disable-next-line:max-line-length
        // console.log('%conToggleAllHoverSetState emited evt toggleAllHoverStateTodoListHeaderEmitter from TodoListItemView with state: ', CONSOLE_TEXT_COLOR_COMPONENT, toggleAllHoverState);
        this.toggleAllHoverState = toggleAllHoverState;
    }

    onMoveTodo(todosUpdated: ToDo[]) {
        // tslint:disable-next-line:max-line-length
        console.log('%conMoveTodo (in TodoListComponent and) in current method todosUpdated is: ', CONSOLE_TEXT_COLOR_COMPONENT, todosUpdated);
        // this._todoService.moveTodo(moveState, this.activeRouteState).subscribe((todos) => {
        //     console.log('%cin onMoveTodo incoming todos:', CONSOLE_TEXT_COLOR_COMPONENT, todos);
        //     this.todos = todos;
        // });

        this.todos = todosUpdated;
        this.updateOrder();
        this.getTopMostTodo();
    }

    updateOrder() {

        const todoOrderList = this.todos.map(todo => {
            return todo.inner_id;
        });

        const updatedOrder = this._todoOrderService.updateOrder(todoOrderList);
    }

    transformView() {
        let pinnedTodos: ToDo[];
        let unpinnedTodos: ToDo[];
        let completedTodos: ToDo[];

        pinnedTodos = this.todos.filter(todo => {
            if (this.activeRouteState === 3) {
                return !todo.complete && todo.pin && this.hashtagIsPresent(todo.title, this.hashTagToFilter);
            } else {
                return !todo.complete && todo.pin;
            }
        });

        unpinnedTodos = this.todos.filter(todo => {
            if (this.activeRouteState === 3) {
                // console.log('%cin TodosComponent todo.complete: ', CONSOLE_TEXT_COLOR_COMPONENT, todo.complete);
                // console.log('%cin TodosComponent todo.pin: ', CONSOLE_TEXT_COLOR_COMPONENT, todo.pin);
                // console.log('%cin TodosComponent todo.title: ', CONSOLE_TEXT_COLOR_COMPONENT, todo.title);
                // tslint:disable-next-line:max-line-length
                // console.log('%cin TodosComponent todo.title.indexOf: ', CONSOLE_TEXT_COLOR_COMPONENT, todo.title.toLowerCase().indexOf(this.hashTagToFilter.toLowerCase()));
                return !todo.complete && !todo.pin && this.hashtagIsPresent(todo.title, this.hashTagToFilter);
            } else {
                return !todo.complete && !todo.pin;
            }
        });

        completedTodos = this.todos.filter(todo => {
            if (this.activeRouteState === 3) {
                return todo.complete && this.hashtagIsPresent(todo.title, this.hashTagToFilter);
            } else {
                return todo.complete;
            }
        });

        this.todosToView = [[], [], []];

        this.todosToView[0] = pinnedTodos;
        this.todosToView[1] = unpinnedTodos;
        this.todosToView[2] = completedTodos;

        this.isEmptyTodoList = (pinnedTodos.length + unpinnedTodos.length) > 0 ? false : true;

        console.log('%cin TodosComponent pinnedTodos', CONSOLE_TEXT_COLOR_COMPONENT, pinnedTodos);
        console.log('%cin TodosComponent unpinnedTodos', CONSOLE_TEXT_COLOR_COMPONENT, unpinnedTodos);
        console.log('%cin TodosComponent completedTodos', CONSOLE_TEXT_COLOR_COMPONENT, completedTodos);

        this.getTopMostTodo();
        this.setAllCompletedState();
    }

    private getTopMostTodo() {
        if (this.todosToView[0].length > 0) {
            this.currentTodo = this.todosToView[0][0];
        } else {
            this.currentTodo = null;
        }

        if (this.currentTodo !== null) {
            this.currentActiveTaskName = this.parseTitle(this.currentTodo);
        }
    }

    private setAllCompletedState() {
        this.allCompleted = this.todos.length === this.todos.filter(todo => todo.complete).length;
    }

    private hashtagIsPresent(title: string, hashTagToFilter: string): boolean {
        const hashtagsRegExp = /(^|\s)(#[a-z\d][\w-]*)/ig; // Find/Replace #hashtags in text

        let isPresent = false;
        if (title.match(hashtagsRegExp)) {
            const hashtagsInTitle = title.match(hashtagsRegExp);

            hashtagsInTitle.map(hashtag => {
                if (hashtag.trim() === hashTagToFilter) {
                    isPresent = true;
                }
            });
        }

        return isPresent;
    }

    containerClickHandler(event) {
        // FEATURE: Here we should check, if there is some edited item -> cancel edit
        // console.log('%ccontainerClick called with event: ', CONSOLE_TEXT_COLOR_COMPONENT, event);
        // console.log('%ccontainerClick called with event.target: ', CONSOLE_TEXT_COLOR_COMPONENT, event.target);
        // console.log('%ccontainerClick called with event.target.innerHTML: ', CONSOLE_TEXT_COLOR_COMPONENT, event.target.innerHTML);
        // console.log('%ccontainerClick called with event.target.parentNode: ', CONSOLE_TEXT_COLOR_COMPONENT, event.target.parentNode);
        if (event.target.className === 'content-container') {
            console.log('%ccontainerClick called with event: ', CONSOLE_TEXT_COLOR_COMPONENT, event);
        } else {
            // console.log('%ccontainerClick called with event: ', CONSOLE_TEXT_COLOR_COMPONENT, event);
        }

        if ((event.target.parentNode &&
            event.target.parentNode.className !== 'profile-menu' &&
            event.target.parentNode.className !== 'profile-name') ||
            event.target.parentNode === null) {
            // console.log('click on profile-menu/profile-name');
            if (this.showSubmenuState) {
                this.showSubmenuState = false;
            }
        }

    }

    onSubmenuAppCall(subMenuAppState) {
        // console.log('subMenuAppState is: ', subMenuAppState);
        this.showSubmenuState = subMenuAppState;
    }

    parseTitle(todo: ToDo) {

        let tmpTitle = todo.title;

        let foundPriority = false;
        let lastIndex: number;
        let counter = 0;

        for (let mainInd = tmpTitle.length - 1; mainInd >= 0; mainInd--) {
            lastIndex = tmpTitle.lastIndexOf('!', mainInd);

            if (lastIndex < 0) {
                break;    // '!' not found, skip parsing
            }

            if (lastIndex === tmpTitle.length - 1 || tmpTitle[lastIndex + 1] === ' ') {
                counter = 0;
                let notPriority = false;
                for (let i = lastIndex; i >= 0; i--) {
                    if (tmpTitle[i] === '!') {
                        counter++;
                        continue;
                    }
                    if (tmpTitle[i] === ' ') {
                        foundPriority = true;
                        break;
                    } else {
                        notPriority = true;
                        break;
                    }
                }

                if (foundPriority) {
                    break;
                }
            } else {
                continue;
            }
        }

        if (foundPriority) {
            let tmpTitleParsed = tmpTitle.slice(0, lastIndex - counter);
            if (lastIndex < tmpTitle.length - 1) {
                tmpTitleParsed += tmpTitle.slice(lastIndex + 1, tmpTitle.length);
            }
            tmpTitle = tmpTitleParsed;
        }

        return tmpTitle;
    }

    onStatePomoChange(state: number) {
        this.pomoStateAppMain = state;
        // console.log('%cpomoStateAppMain: ', CONSOLE_TEXT_COLOR_COMPONENT, this.pomoStateAppMain);
    }

    toggleThemeMode() {
        this.nightMode = !this.nightMode;
        console.log('%c nightMode: ', CONSOLE_TEXT_COLOR_COMPONENT, this.nightMode);
    }

    onRecentPomosChange(recentPomos: Pomo[]) {
        // console.log('%c AppMainComponent onRecentPomosChange() - recentPomos: ', CONSOLE_TEXT_COLOR_COMPONENT, recentPomos);

        this.recentPomos = [];
        this.recentPomos = recentPomos;

        // At first -> let's generate dailyGoalList
        const tmpDailyGoalCount = this.recentPomos.filter(pomoItem => {
            // console.log('%c AppMainComponent onRecentPomosChange() - pomo.end_time: ', CONSOLE_TEXT_COLOR_COMPONENT, pomoItem.end_time);
            const dateOptions = {
                month: 'short',
                day: 'numeric'
            };

            const tmpDateGroup = new Date(pomoItem.end_time).toLocaleString('en-US', dateOptions);
            const currentDate = new Date().toLocaleString('en-US', dateOptions);
            return tmpDateGroup === currentDate;
        });

        // console.log('%c AppMainComponent onRecentPomosChange() - tmpDailyGoalCount: ', CONSOLE_TEXT_COLOR_COMPONENT, tmpDailyGoalCount);
        this.dailyGoalList = tmpDailyGoalCount;

        // Next -> let's form weeklyCumulationList
        const startWeekTime = new Date();
        startWeekTime.setDate(startWeekTime.getDate() - 6);
        startWeekTime.setHours(0, 0, 0, 0);

        const tmpWeeklyCumulationList = this.recentPomos.filter(pomoItem => {
            return new Date(pomoItem.end_time) >= startWeekTime;
        });

        // tslint:disable-next-line:max-line-length
        // console.log('%c AppMainComponent onRecentPomosChange() - weeklyCumulationList: ', CONSOLE_TEXT_COLOR_COMPONENT, tmpWeeklyCumulationList);
        this.weeklyCumulationList = tmpWeeklyCumulationList;

        // Next -> let's form weeklyCumulationChartValues
        const optionsDate = {
            month: 'short',
            day: 'numeric'
        };

        const tmpDateOfWeek = new Date();
        for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
            tmpDateOfWeek.setDate(startWeekTime.getDate() + dayOffset);
            const tmpDateShort = tmpDateOfWeek.toLocaleString('en-US', optionsDate);
            // console.log('%c AppMainComponent onRecentPomosChange() - tmpDateShort: ', CONSOLE_TEXT_COLOR_COMPONENT, tmpDateShort);
            const dateOfWeekPomoCount = tmpWeeklyCumulationList.filter(pomoItem => {
                const tmpDateToFilter = new Date(pomoItem.end_time);
                return tmpDateToFilter.toLocaleString('en-US', optionsDate) === tmpDateShort;
            });

            // tslint:disable-next-line:max-line-length
            console.log('%c AppMainComponent onRecentPomosChange() - dateOfWeekPomoCount: ', CONSOLE_TEXT_COLOR_COMPONENT, dateOfWeekPomoCount);

            // this.weeklyCumulationChartValues[dayOffset] = dateOfWeekPomoCount === 0 ? 1 : dateOfWeekPomoCount;
        }

        // tslint:disable-next-line:max-line-length
        // console.log('%c AppMainComponent onRecentPomosChange() - this.weeklyCumulationChartValues: ', CONSOLE_TEXT_COLOR_COMPONENT, this.weeklyCumulationChartValues);
    }

}
