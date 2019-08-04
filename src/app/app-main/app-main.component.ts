import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDo } from '@app/_models/to-do';

// Routes
import { ActivatedRoute } from '@angular/router';

// Services
import { TodoService } from '@app/_services/todo.service';
import { TodoOrderService } from '@app/_services/todo-order.service';

// Components
import { DialogDeleteComponent } from '@app/dialog/dialog-delete/dialog-delete.component';
import { DialogMoreComponent } from '@app/dialog/dialog-more/dialog-more.component';

// Imports
import { map } from 'rxjs/operators';

// Modules
import { MatDialog } from '@angular/material';
import 'hammerjs';

@Component({
    selector: 'app-main',
    templateUrl: './app-main.component.html',
    styleUrls: ['./app-main.component.scss']
})
export class AppMainComponent implements OnInit, OnDestroy {

    consoleTextColorComponent = 'color: cadetblue;';

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
                // console.log(`%c'TodosComponent' _route.params: `, this.consoleTextColorComponent, this._route.params);
                // console.log(`%c'TodosComponent' _route.queryParams: `, this.consoleTextColorComponent, this._route.queryParams);
                // console.log(`%c'TodosComponent' routeConfig.path: `, this.consoleTextColorComponent, this._route.routeConfig.path);

                // console.log(`%cincoming 'resolverData' from resolver: `, this.consoleTextColorComponent, resolverData);
                this.activeRouteState = resolverData.activeRouteState;
                this.hashTagToFilter = resolverData.params;
                this.todos = resolverData.todos;

                this.transformView();
            }
        );
    }

    ngOnDestroy() {
        console.log('%cDo not forget to Unsubscribe!', this.consoleTextColorComponent);
        // this._route.data.unsubscribe();
        // this.todos.unsubscribe();
    }

    // Method to handle event emitted by TodoListHeaderComponent
    onAddTodo(todo: ToDo) {
        this._todoService.addTodo(todo, this.todos).subscribe((updatedTodos) => {
            console.log('%cin onAddTodo() updatedTodos: ', this.consoleTextColorComponent, updatedTodos);
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
            console.log('%cin onToggleTodoComplete updatedTodos: ', this.consoleTextColorComponent, updatedTodos);
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
        console.log('%cremoveTodo emited evt removeTodoListItemEmitter from TodoListItemView with ttl: %s (id: %d)', this.consoleTextColorComponent, todo.title, todo.id);
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
                    console.log('%cin TodosComponent in onMoreTodo() result: ', this.consoleTextColorComponent, result);

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
            console.log('%cin onPinTodo updatedTodos: ', this.consoleTextColorComponent, updatedTodos);
            this.todos = updatedTodos;
            this.transformView();
        });
    }

    onToggleAll(toggleState: boolean) {
        console.log('%ctoggleState() called', this.consoleTextColorComponent);
        this._todoService.toggleAll(toggleState, this.activeRouteState).subscribe((todos) => {
            console.log('%cin onToggleAll incoming todos:', this.consoleTextColorComponent, todos);
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
        console.log('%conClearCompleted (remove %s in TodosComponent): ', this.consoleTextColorComponent, clearState);
        this._todoService.clearCompleted(this.activeRouteState).subscribe((todos) => {
            this.todos = todos;
            // this.updateOrder();    // Order was updated previously in service
            this.transformView();
            this.onClearHoverSetState(false);
        });
    }

    onClearHoverSetState(clearCompletetHoverState: boolean) {
        // tslint:disable-next-line:max-line-length
        // console.log('%conClearHoverSetState emited evt clearHoverStateTodoListItemEmitter from TodoListItemView with state: ', this.consoleTextColorComponent, clearCompletetHoverState);
        this.clearHoverState = clearCompletetHoverState;
    }

    onToggleAllHoverSetState(toggleAllHoverState: boolean) {
        // tslint:disable-next-line:max-line-length
        // console.log('%conToggleAllHoverSetState emited evt toggleAllHoverStateTodoListHeaderEmitter from TodoListItemView with state: ', this.consoleTextColorComponent, toggleAllHoverState);
        this.toggleAllHoverState = toggleAllHoverState;
    }

    onMoveTodo(todosUpdated: ToDo[]) {
        // tslint:disable-next-line:max-line-length
        console.log('%conMoveTodo (in TodoListComponent and) in current method todosUpdated is: ', this.consoleTextColorComponent, todosUpdated);
        // this._todoService.moveTodo(moveState, this.activeRouteState).subscribe((todos) => {
        //     console.log('%cin onMoveTodo incoming todos:', this.consoleTextColorComponent, todos);
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
                // console.log('%cin TodosComponent todo.complete: ', this.consoleTextColorComponent, todo.complete);
                // console.log('%cin TodosComponent todo.pin: ', this.consoleTextColorComponent, todo.pin);
                // console.log('%cin TodosComponent todo.title: ', this.consoleTextColorComponent, todo.title);
                // tslint:disable-next-line:max-line-length
                // console.log('%cin TodosComponent todo.title.indexOf: ', this.consoleTextColorComponent, todo.title.toLowerCase().indexOf(this.hashTagToFilter.toLowerCase()));
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

        console.log('%cin TodosComponent pinnedTodos', this.consoleTextColorComponent, pinnedTodos);
        console.log('%cin TodosComponent unpinnedTodos', this.consoleTextColorComponent, unpinnedTodos);
        console.log('%cin TodosComponent completedTodos', this.consoleTextColorComponent, completedTodos);

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
        // console.log('%ccontainerClick called with event: ', this.consoleTextColorComponent, event);
        // console.log('%ccontainerClick called with event.target: ', this.consoleTextColorComponent, event.target);
        // console.log('%ccontainerClick called with event.target.innerHTML: ', this.consoleTextColorComponent, event.target.innerHTML);
        // console.log('%ccontainerClick called with event.target.parentNode: ', this.consoleTextColorComponent, event.target.parentNode);
        if (event.target.className === 'content-container') {
            console.log('%ccontainerClick called with event: ', this.consoleTextColorComponent, event);
        } else {
            // console.log('%ccontainerClick called with event: ', this.consoleTextColorComponent, event);
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
        // console.log('%cpomoStateAppMain: ', this.consoleTextColorComponent, this.pomoStateAppMain);
    }

}
