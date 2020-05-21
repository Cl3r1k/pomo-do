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
import { Utils } from '@app/_common/utils';
import { MatDialog } from '@angular/material';
import 'hammerjs';
import { padLeftWithString } from '@app/utils/padUtils';
import { getDayTimeLabel } from '@app/utils/dateTimeUtils';
import { describeArcExtended } from '@app/utils/chartUtils';
import { getAngleInRad } from '@app/_utils/canvasUtils';

// Constants
import {
  WORK_DAYS,
  START_DAY_TIME,
  END_DAY_TIME,
  HOURS_IN_DAY,
  EFFECTIVE_POMO_PERCENT,
  CANVAS_SETTINGS,
} from '@app/_constants/constants';
const CONSOLE_TEXT_COLOR_COMPONENT = environmentProd.consoleTextColorComponent;

@Component({
  selector: 'app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.scss'],
})
export class AppMainComponent implements OnInit, OnDestroy {
  todos: ToDo[] = [];
  todo: ToDo = null;
  todosToView: [ToDo[], ToDo[], ToDo[]] = [[], [], []];
  allCompleted: boolean; // The variable is for toggleAll checkbox
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
  dailyGoalCountPercent = 0;
  monthlyPomosPolylinePoints = '';
  monthlyTodosPolylinePoints = '';
  todosCompleted = [];
  bestWorkDay = WORK_DAYS.EMPTY_DATA_MESSAGE;
  aboveAveragePercent = '';
  workDaysStatsPercents = [];
  topHashtagName = '';
  hashtagsChartValues = [];
  bestWorkHours = WORK_DAYS.EMPTY_DATA_MESSAGE;
  dayTimeLabel = '';
  hoursData: Object[] = [];

  // Ask Angular DI system to inject the dependency
  // associated with the dependency injection token 'TodoDataService'
  // and assign it to a property called _todoDataService
  constructor(
    private _todoService: TodoService,
    private _route: ActivatedRoute,
    public dialog: MatDialog,
    private _todoOrderService: TodoOrderService,
    private _utils: Utils
  ) {}

  public ngOnInit() {
    this._route.data
      .pipe(map((data) => data['resolverData']))
      .subscribe((resolverData) => {
        // console.log(`%c 'TodosComponent' _route.params: `, CONSOLE_TEXT_COLOR_COMPONENT, this._route.params);
        // console.log(`%c 'TodosComponent' _route.queryParams: `, CONSOLE_TEXT_COLOR_COMPONENT, this._route.queryParams);
        // console.log(`%c 'TodosComponent' routeConfig.path: `, CONSOLE_TEXT_COLOR_COMPONENT, this._route.routeConfig.path);

        // console.log(`%c incoming 'resolverData' from resolver: `, CONSOLE_TEXT_COLOR_COMPONENT, resolverData);
        this.activeRouteState = resolverData.activeRouteState;
        this.hashTagToFilter = resolverData.params;
        this.todos = resolverData.todos;

        this.transformView();
        this.transformViewTodoStats();
      });
  }

  ngOnDestroy() {
    console.log(
      '%cDo not forget to Unsubscribe!',
      CONSOLE_TEXT_COLOR_COMPONENT
    );
    // this._route.data.unsubscribe();
    // this.todos.unsubscribe();
  }

  // Method to handle event emitted by TodoListHeaderComponent
  onAddTodo(todo: ToDo) {
    this._todoService.addTodo(todo, this.todos).subscribe((updatedTodos) => {
      console.log(
        '%cin onAddTodo() updatedTodos: ',
        CONSOLE_TEXT_COLOR_COMPONENT,
        updatedTodos
      );
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

    this._todoService
      .toggleTodoComplete(todo, this.todos)
      .subscribe((updatedTodos) => {
        console.log(
          '%cin onToggleTodoComplete updatedTodos: ',
          CONSOLE_TEXT_COLOR_COMPONENT,
          updatedTodos
        );
        this.todos = updatedTodos;
        this.transformView();
        this.transformViewTodoStats();
      });
  }

  // Method to handle event emitted by TodoListComponent and call DialogDelete
  onRemoveTodo(todo: ToDo) {
    this.todo = todo;

    const dataForDialog = {
      dialogTitle: 'Delete Todo',
      contentTitle: 'Are you sure want to delete todo with name:',
      contentData: todo.title,
      isClearCompleted: false,
    };

    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '600px',
      data: {
        data: dataForDialog,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Confirm') {
        this.removeTodo(todo); // User confirmed action, call 'removeTodo()'
      } else {
        // User clicked 'Cancel' or clicked outside of the dialog
      }
    });
  }

  // Additional method to perform deletion after modal confirmation
  removeTodo(todo: ToDo) {
    // tslint:disable-next-line:max-line-length
    console.log(
      '%c removeTodo emitted evt removeTodoListItemEmitter from TodoListItemView with ttl: %s (id: %d)',
      CONSOLE_TEXT_COLOR_COMPONENT,
      todo.title,
      todo.id
    );
    this._todoService.deleteTodoById(todo.id).subscribe((_) => {
      this.todo = _;
      this.todos = this.todos.filter((val) => val.id !== todo.id);
      this.updateOrder();
      this.transformView();
      this.transformViewTodoStats();
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
      note: todo.note,
    };

    const dialogRef = this.dialog.open(DialogMoreComponent, {
      width: '400px',
      data: {
        data: dataForDialog,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (
        result &&
        (result['dialogResult'] === 'ConfirmSave' ||
          result['dialogResult'] === 'ConfirmDelete')
      ) {
        // User confirmed actions, call 'removeTodo()' or 'onUpdateTodo()'
        if (result['dialogResult'] === 'ConfirmDelete') {
          this.removeTodo(todo);
        } else {
          console.log(
            '%cin TodosComponent in onMoreTodo() result: ',
            CONSOLE_TEXT_COLOR_COMPONENT,
            result
          );

          todo.costed_pomo = result['pomoCost'];
          todo.estimated_pomos = result['estimatedPomos'];
          todo.remind_me = result['remind'];
          todo.remind_time = result['remindTime'];
          todo.note = result['note'];

          this.onUpdateTodo(todo); // Save changes by calling 'onUpdateTodo()'
        }
      } else {
        // User clicked 'Cancel' or clicked outside of the dialog
      }
    });
  }

  onPinTodo(todo: ToDo) {
    this._todoService.pinTodo(todo, this.todos).subscribe((updatedTodos) => {
      // todo = updatedTodo;        // We even do not need to update inner todo
      console.log(
        '%cin onPinTodo updatedTodos: ',
        CONSOLE_TEXT_COLOR_COMPONENT,
        updatedTodos
      );
      this.todos = updatedTodos;
      this.transformView();
    });
  }

  onToggleAll(toggleState: boolean) {
    console.log('%c toggleState() called', CONSOLE_TEXT_COLOR_COMPONENT);
    this._todoService
      .toggleAll(toggleState, this.activeRouteState)
      .subscribe((todos) => {
        console.log(
          '%cin onToggleAll incoming todos:',
          CONSOLE_TEXT_COLOR_COMPONENT,
          todos
        );
        this.todos = todos;
        this.transformView();
        this.transformViewTodoStats();
      });
  }

  // TODO: Change behavior of this method (all completed todos should be marked as 'cleaned' = true, not delete todo)
  // Method to handle event 'clearTodoListEmitter' and call Dialog
  onClearCompleted(clearState: boolean) {
    const dataForDialog = {
      dialogTitle: 'Delete Todos',
      contentTitle: 'Are you sure want to delete todos amount: ',
      contentData: this.todos.filter((todo) => todo.complete === true).length,
      isClearCompleted: true,
    };

    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '600px',
      data: {
        data: dataForDialog,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Confirm') {
        this.clearCompleted(clearState); // User confirmed action, call 'clearCompleted()'
      } else {
        // User clicked 'Cancel' or clicked outside of the dialog
      }
    });
  }

  clearCompleted(clearState: boolean) {
    // tslint:disable-next-line:max-line-length
    console.log(
      '%conClearCompleted (remove %s in TodosComponent): ',
      CONSOLE_TEXT_COLOR_COMPONENT,
      clearState
    );
    this._todoService
      .clearCompleted(this.activeRouteState)
      .subscribe((todos) => {
        this.todos = todos;
        // this.updateOrder();    // Order was updated previously in service
        this.transformView();
        this.transformViewTodoStats();
        this.onClearHoverSetState(false);
      });
  }

  onClearHoverSetState(clearCompletedHoverState: boolean) {
    // tslint:disable-next-line:max-line-length
    // console.log('%conClearHoverSetState emitted evt clearHoverStateTodoListItemEmitter from TodoListItemView with state: ', CONSOLE_TEXT_COLOR_COMPONENT, clearCompletedHoverState);
    this.clearHoverState = clearCompletedHoverState;
  }

  onToggleAllHoverSetState(toggleAllHoverState: boolean) {
    // tslint:disable-next-line:max-line-length
    // console.log('%conToggleAllHoverSetState emitted evt toggleAllHoverStateTodoListHeaderEmitter from TodoListItemView with state: ', CONSOLE_TEXT_COLOR_COMPONENT, toggleAllHoverState);
    this.toggleAllHoverState = toggleAllHoverState;
  }

  onMoveTodo(todosUpdated: ToDo[]) {
    // tslint:disable-next-line:max-line-length
    console.log(
      '%conMoveTodo (in TodoListComponent and) in current method todosUpdated is: ',
      CONSOLE_TEXT_COLOR_COMPONENT,
      todosUpdated
    );
    // this._todoService.moveTodo(moveState, this.activeRouteState).subscribe((todos) => {
    //     console.log('%cin onMoveTodo incoming todos:', CONSOLE_TEXT_COLOR_COMPONENT, todos);
    //     this.todos = todos;
    // });

    this.todos = todosUpdated;
    this.updateOrder();
    this.getTopMostTodo();
  }

  updateOrder() {
    const todoOrderList = this.todos.map((todo) => {
      return todo.inner_id;
    });

    const updatedOrder = this._todoOrderService.updateOrder(todoOrderList);
  }

  transformView() {
    let pinnedTodos: ToDo[];
    let unpinnedTodos: ToDo[];
    let completedTodos: ToDo[];

    pinnedTodos = this.todos.filter((todo) => {
      if (this.activeRouteState === 3) {
        return (
          !todo.complete &&
          todo.pin &&
          this.hashtagIsPresent(todo.title, this.hashTagToFilter)
        );
      } else {
        return !todo.complete && todo.pin;
      }
    });

    unpinnedTodos = this.todos.filter((todo) => {
      if (this.activeRouteState === 3) {
        // console.log('%cin TodosComponent todo.complete: ', CONSOLE_TEXT_COLOR_COMPONENT, todo.complete);
        // console.log('%cin TodosComponent todo.pin: ', CONSOLE_TEXT_COLOR_COMPONENT, todo.pin);
        // console.log('%cin TodosComponent todo.title: ', CONSOLE_TEXT_COLOR_COMPONENT, todo.title);
        // tslint:disable-next-line:max-line-length
        // console.log('%cin TodosComponent todo.title.indexOf: ', CONSOLE_TEXT_COLOR_COMPONENT, todo.title.toLowerCase().indexOf(this.hashTagToFilter.toLowerCase()));
        return (
          !todo.complete &&
          !todo.pin &&
          this.hashtagIsPresent(todo.title, this.hashTagToFilter)
        );
      } else {
        return !todo.complete && !todo.pin;
      }
    });

    completedTodos = this.todos.filter((todo) => {
      if (this.activeRouteState === 3) {
        return (
          todo.complete &&
          this.hashtagIsPresent(todo.title, this.hashTagToFilter)
        );
      } else {
        return todo.complete;
      }
    });

    this.todosToView = [[], [], []];

    this.todosToView[0] = pinnedTodos;
    this.todosToView[1] = unpinnedTodos;
    this.todosToView[2] = completedTodos;

    this.isEmptyTodoList =
      pinnedTodos.length + unpinnedTodos.length > 0 ? false : true;

    console.log(
      '%cin TodosComponent pinnedTodos',
      CONSOLE_TEXT_COLOR_COMPONENT,
      pinnedTodos
    );
    console.log(
      '%cin TodosComponent unpinnedTodos',
      CONSOLE_TEXT_COLOR_COMPONENT,
      unpinnedTodos
    );
    console.log(
      '%cin TodosComponent completedTodos',
      CONSOLE_TEXT_COLOR_COMPONENT,
      completedTodos
    );

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
    this.allCompleted =
      this.todos.length === this.todos.filter((todo) => todo.complete).length;
  }

  private hashtagIsPresent(title: string, hashTagToFilter: string): boolean {
    const hashtagsRegExp = /(^|\s)(#[a-z\d][\w-]*)/gi; // Find/Replace #hashtags in text

    let isPresent = false;
    if (title.match(hashtagsRegExp)) {
      const hashtagsInTitle = title.match(hashtagsRegExp);

      hashtagsInTitle.map((hashtag) => {
        if (hashtag.trim() === hashTagToFilter) {
          isPresent = true;
        }
      });
    }

    return isPresent;
  }

  private getHashtagsInTitle(title: string): string[] {
    const hashtagsRegExp = /(^|\s)(#[a-z\d][\w-]*)/gi; // Find/Replace #hashtags in text
    const hashtagsInTitle: string[] = title.match(hashtagsRegExp);

    return hashtagsInTitle;
  }

  onContainerClickHandler(event) {
    // FEATURE: Here we should check, if there is some edited item -> cancel edit
    // console.log('%c containerClick called with event: ', CONSOLE_TEXT_COLOR_COMPONENT, event);
    // console.log('%c containerClick called with event.target: ', CONSOLE_TEXT_COLOR_COMPONENT, event.target);
    // console.log('%c containerClick called with event.target.innerHTML: ', CONSOLE_TEXT_COLOR_COMPONENT, event.target.innerHTML);
    // console.log('%c containerClick called with event.target.parentNode: ', CONSOLE_TEXT_COLOR_COMPONENT, event.target.parentNode);
    if (event.target.className === 'content-container') {
      console.log(
        '%c containerClick called with event: ',
        CONSOLE_TEXT_COLOR_COMPONENT,
        event
      );
    } else {
      // console.log('%c containerClick called with event: ', CONSOLE_TEXT_COLOR_COMPONENT, event);
    }

    if (
      (event.target.parentNode &&
        event.target.parentNode.className !== 'profile-menu' &&
        event.target.parentNode.className !== 'profile-name') ||
      event.target.parentNode === null
    ) {
      // console.log('click on profile-menu/profile-name');
      if (this.showSubmenuState) {
        this.showSubmenuState = false;
      }
    }
  }

  onSubMenuAppCall(subMenuAppState) {
    // console.log('subMenuAppState is: ', subMenuAppState);
    this.showSubmenuState = subMenuAppState;
  }

  // TODO: rename method 'parseTitle' to 'parseTitlePriority'
  parseTitle(todo: ToDo) {
    let tmpTitle = todo.title;

    let foundPriority = false;
    let lastIndex: number;
    let counter = 0;

    for (let mainInd = tmpTitle.length - 1; mainInd >= 0; mainInd--) {
      lastIndex = tmpTitle.lastIndexOf('!', mainInd);

      if (lastIndex < 0) {
        break; // '!' not found, skip parsing
      }

      if (
        lastIndex === tmpTitle.length - 1 ||
        tmpTitle[lastIndex + 1] === ' '
      ) {
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
    // console.log('%c pomoStateAppMain: ', CONSOLE_TEXT_COLOR_COMPONENT, this.pomoStateAppMain);
  }

  toggleThemeMode() {
    this.nightMode = !this.nightMode;
    console.log('%c nightMode: ', CONSOLE_TEXT_COLOR_COMPONENT, this.nightMode);
  }

  onRecentPomosChange(recentPomos: Pomo[]) {
    // console.log('%c AppMainComponent onRecentPomosChange() - recentPomos: ', CONSOLE_TEXT_COLOR_COMPONENT, recentPomos);
    // if (!recentPomos.length) {
    //     console.log('%c AppMainComponent onRecentPomosChange() - recentPomos EMPTY: ', 'color: red;', recentPomos);
    // }

    this.recentPomos = [];
    this.recentPomos = recentPomos.filter((pomo) => {
      return !pomo.canceled;
    });

    const optionsDate = {
      month: 'short',
      day: 'numeric',
    };

    // At first -> let's generate 'dailyGoalList'
    this.dailyGoalList = this.recentPomos.filter((pomoItem) => {
      return (
        new Date(pomoItem.end_time).toLocaleString('en-US', optionsDate) ===
        new Date().toLocaleString('en-US', optionsDate)
      );
    });

    // Next -> let's form 'weeklyCumulationList'
    const startWeekTime = new Date();
    const timeOffset = 24 * 60 * 60 * 1000 * 6; // 6 Days
    startWeekTime.setTime(startWeekTime.getTime() - timeOffset);
    startWeekTime.setHours(0, 0, 0, 0);

    const tmpWeeklyCumulationList = this.recentPomos.filter((pomoItem) => {
      return new Date(pomoItem.end_time) >= startWeekTime;
    });

    // tslint:disable-next-line:max-line-length
    console.log(
      '%c AppMainComponent onRecentPomosChange() - tmpWeeklyCumulationList: ',
      CONSOLE_TEXT_COLOR_COMPONENT,
      tmpWeeklyCumulationList
    );
    this.weeklyCumulationList = tmpWeeklyCumulationList;

    // Next -> let's form 'weeklyCumulationChartValues'
    const tmpDateOfWeek = new Date();
    const tmpWeeklyCumulationChartValues = [];
    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      tmpDateOfWeek.setTime(
        startWeekTime.getTime() + dayOffset * (24 * 60 * 60 * 1000)
      );
      const tmpDateShort = tmpDateOfWeek.toLocaleString('en-US', optionsDate);
      // console.log('%c AppMainComponent onRecentPomosChange() - tmpDateShort: ', CONSOLE_TEXT_COLOR_COMPONENT, tmpDateShort);
      const dateOfWeekPomoCount = tmpWeeklyCumulationList.filter((pomoItem) => {
        const tmpDateToFilter = new Date(pomoItem.end_time);
        if (
          tmpDateToFilter.toLocaleString('en-US', optionsDate) === tmpDateShort
        ) {
          console.log(
            '%c AppMainComponent onRecentPomosChange() - MATCH???: ',
            CONSOLE_TEXT_COLOR_COMPONENT,
            tmpDateShort
          );
        } else {
          console.log(
            '%c tmpDateShort',
            CONSOLE_TEXT_COLOR_COMPONENT,
            tmpDateShort
          );
          console.log(
            '%c tmpDateToFilter',
            CONSOLE_TEXT_COLOR_COMPONENT,
            tmpDateToFilter.toLocaleString('en-US', optionsDate)
          );
        }
        return (
          tmpDateToFilter.toLocaleString('en-US', optionsDate) === tmpDateShort
        );
      }).length;

      tmpWeeklyCumulationChartValues[dayOffset] = dateOfWeekPomoCount;
    }

    // tslint:disable-next-line:max-line-length
    console.log(
      '%c AppMainComponent onRecentPomosChange() - tmpWeeklyCumulationChartValues: ',
      CONSOLE_TEXT_COLOR_COMPONENT,
      tmpWeeklyCumulationChartValues
    );

    let maxWeeklyDayCount = 0;
    tmpWeeklyCumulationChartValues.map((item) => {
      if (item > maxWeeklyDayCount) {
        maxWeeklyDayCount = item;
      }
    });

    maxWeeklyDayCount = maxWeeklyDayCount === 0 ? 1 : maxWeeklyDayCount;

    console.log(
      '%c AppMainComponent onRecentPomosChange() - maxWeeklyDayCount: ',
      CONSOLE_TEXT_COLOR_COMPONENT,
      maxWeeklyDayCount
    );

    for (
      let index = 0;
      index < tmpWeeklyCumulationChartValues.length;
      index++
    ) {
      const tmpColValue =
        tmpWeeklyCumulationChartValues[index] / (maxWeeklyDayCount / 100);
      this.weeklyCumulationChartValues[index] =
        tmpColValue === 0 ? 1 : tmpColValue;
    }

    // tslint:disable-next-line:max-line-length
    console.log(
      '%c AppMainComponent onRecentPomosChange() - this.weeklyCumulationChartValues: ',
      CONSOLE_TEXT_COLOR_COMPONENT,
      this.weeklyCumulationChartValues
    );

    // Next -> let's form 'dailyGoalCountPercent' for round-progress
    // TODO: Do not forget to change value 8 (pomoGoal) to real value from preferences
    this.dailyGoalCountPercent =
      this.dailyGoalList.length / 8 > 1
        ? 100
        : Math.round((this.dailyGoalList.length / 8) * 100);

    this.transformViewPomoStats();

    this.generateWorkDaysData();

    this.generateTopHashtagsData();

    this.generateWorkTimeData();
  }

  transformViewPomoStats() {
    // Next -> let's form 'monthlyPomosPolylinePoints' for 'monthly pomos progress'
    this.monthlyPomosPolylinePoints = '';

    this.monthlyPomosPolylinePoints = this.generatePolylineChartValues(
      this.recentPomos,
      240,
      70,
      31
    );

    // tslint:disable-next-line: max-line-length
    console.log(
      '%c AppMainComponent onRecentPomosChange() - monthlyPomosPolylinePoints: ',
      CONSOLE_TEXT_COLOR_COMPONENT,
      this.monthlyPomosPolylinePoints
    );
  }

  transformViewTodoStats() {
    // let's form 'todosCompleted' and 'monthlyTodosPolylinePoints' for 'todos stats'
    this.monthlyTodosPolylinePoints = '';

    this.todosCompleted = this.todos.filter((todoItem) => {
      return todoItem.complete;
    });

    this.monthlyTodosPolylinePoints = this.generatePolylineChartValues(
      this.todosCompleted,
      240,
      70,
      31
    );

    // tslint:disable-next-line: max-line-length
    console.log(
      '%c AppMainComponent onRecentPomosChange() - monthlyTodosPolylinePoints: ',
      CONSOLE_TEXT_COLOR_COMPONENT,
      this.monthlyTodosPolylinePoints
    );
  }

  generatePolylineChartValues(
    itemsArray,
    chartWidth: number,
    chartHeight: number,
    monthLength: number
  ): string {
    const optionsDate = {
      month: 'short',
      day: 'numeric',
    };

    const startMonthTime = new Date();
    startMonthTime.setTime(
      startMonthTime.getTime() - 24 * 60 * 60 * 1000 * monthLength
    );
    startMonthTime.setHours(0, 0, 0, 0);

    const monthlyItemsArray = itemsArray.filter((item) => {
      return item instanceof ToDo
        ? new Date(item.completed_time) >= startMonthTime
        : new Date(item.end_time) >= startMonthTime;
    });

    // tslint:disable-next-line: max-line-length
    console.log(
      '%c AppMainComponent generatePolylineChartValues() - monthlyItemsArray: ',
      CONSOLE_TEXT_COLOR_COMPONENT,
      monthlyItemsArray
    );

    const currentDateOfMonth = new Date();
    const monthlyItemsValues = [];
    let sumItems = 0;
    for (let dayOffset = 1; dayOffset <= monthLength; dayOffset++) {
      currentDateOfMonth.setTime(
        startMonthTime.getTime() + dayOffset * (24 * 60 * 60 * 1000)
      );
      const currentDateOfMonthShort = currentDateOfMonth.toLocaleString(
        'en-US',
        optionsDate
      );
      // tslint:disable-next-line: max-line-length
      // console.log('%c AppMainComponent generatePolylineChartValues() - currentDateOfMonthShort: ', CONSOLE_TEXT_COLOR_COMPONENT, currentDateOfMonthShort);
      const dateOfMonthItemsCount = monthlyItemsArray.filter((item) => {
        const dateToFilter =
          item instanceof ToDo
            ? new Date(item.completed_time)
            : new Date(item.end_time);
        return (
          dateToFilter.toLocaleString('en-US', optionsDate) ===
          currentDateOfMonthShort
        );
      }).length;

      sumItems += dateOfMonthItemsCount;
      monthlyItemsValues.push(sumItems);
    }

    // tslint:disable-next-line: max-line-length
    console.log(
      '%c AppMainComponent generatePolylineChartValues() - monthlyItemsValues: ',
      CONSOLE_TEXT_COLOR_COMPONENT,
      monthlyItemsValues
    );

    // const monthlyChartValues = [];

    const chartMaxValue =
      monthlyItemsValues[monthlyItemsValues.length - 1] > 0
        ? monthlyItemsValues[monthlyItemsValues.length - 1]
        : 1;
    const stepValueChart = chartWidth / (monthLength - 1);
    let resultMonthlyChartData = '';
    let xValueChart = 0;
    for (let i = 0; i < monthlyItemsValues.length; i++) {
      let yValueChart =
        chartHeight -
        (chartHeight / 100) * ((monthlyItemsValues[i] / chartMaxValue) * 100);
      if (yValueChart === chartHeight) {
        yValueChart--;
      } else if (yValueChart === 0) {
        yValueChart++;
      }
      // tslint:disable-next-line: max-line-length
      // console.log('%c AppMainComponent generatePolylineChartValues() - yValueChart: ', CONSOLE_TEXT_COLOR_COMPONENT, yValueChart);
      resultMonthlyChartData += xValueChart + ',' + yValueChart + ' ';
      xValueChart += stepValueChart; // Increase step for xCoordinate;
    }

    return (
      `0,${chartHeight} ` +
      resultMonthlyChartData +
      `${chartWidth},${chartHeight}`
    );
  }

  generateWorkDaysData({
    startDate = null,
    endDate = new Date(),
    hashtag = '',
  }: { startDate?: Date, endDate?: Date, hashtag?: string } = {}) {
    const workDaysStats = new Array(WORK_DAYS.daysInWeek).fill(0);

    // console.log(`workDaysStats: ${workDaysStats}`);
    // console.log(`WORK_DAYS.daysInWeek: ${WORK_DAYS.daysInWeek}`);

    // console.log('%c AppMainComponent generateWorkDaysData() - hashtag: ', CONSOLE_TEXT_COLOR_COMPONENT, hashtag);

    if (!startDate) {
      startDate = new Date(endDate);
      startDate.setMonth(startDate.getMonth() - 1);
    }

    startDate.setHours(
      START_DAY_TIME[0],
      START_DAY_TIME[1],
      START_DAY_TIME[2],
      START_DAY_TIME[3]
    );
    endDate.setHours(
      END_DAY_TIME[0],
      END_DAY_TIME[1],
      END_DAY_TIME[2],
      END_DAY_TIME[3]
    );

    // console.log('%c AppMainComponent generateWorkDaysData() - startDate: ', CONSOLE_TEXT_COLOR_COMPONENT, startDate);
    // console.log('%c AppMainComponent generateWorkDaysData() - endDate: ', CONSOLE_TEXT_COLOR_COMPONENT, endDate);

    const filteredPomos = this.recentPomos.filter((pomo) => {
      // console.log(`pomo.title.includes(${hashtag}) = ${pomo.title.includes(hashtag)}`);
      return (
        new Date(pomo.end_time) >= startDate &&
        new Date(pomo.end_time) <= endDate &&
        pomo.title.includes(hashtag)
      );
    });

    console.log(
      '%c AppMainComponent generateWorkDaysData() - filteredPomos: ',
      CONSOLE_TEXT_COLOR_COMPONENT,
      filteredPomos
    );

    filteredPomos.forEach((pomo) => {
      const pomoEndTime = new Date(pomo.end_time);
      // const dayOfWeek =  pomoEndTime.toLocaleDateString('en-us', { weekday: 'long' });
      // console.log(`pomoEndTime (${pomoEndTime.getDay()}) for ${pomo.title}`);
      workDaysStats[pomoEndTime.getDay()]++;
      // console.log(`workDaysStats ${workDaysStats}`);
    });

    console.log(
      '%c AppMainComponent generateWorkDaysData() - workDaysStats: ',
      CONSOLE_TEXT_COLOR_COMPONENT,
      workDaysStats
    );

    let maxValue = 0;
    let maxValueIndex = 0;
    let avgValue = 0;
    workDaysStats.map((item, idx) => {
      if (item > maxValue) {
        maxValue = item;
        maxValueIndex = idx;
      }
      avgValue += item;
    });

    avgValue /= workDaysStats.length;

    this.workDaysStatsPercents = workDaysStats.map((item) => {
      return item > 0 ? item / (maxValue / 100) : 2;
    });

    // tslint:disable-next-line: max-line-length
    console.log(
      '%c AppMainComponent generateWorkDaysData() - workDaysStatsPercents',
      CONSOLE_TEXT_COLOR_COMPONENT,
      this.workDaysStatsPercents
    );

    console.log(
      '%c AppMainComponent generateWorkDaysData() - maxValue: ',
      CONSOLE_TEXT_COLOR_COMPONENT,
      maxValue
    );
    console.log(
      '%c AppMainComponent generateWorkDaysData() - maxValueIndex: ',
      CONSOLE_TEXT_COLOR_COMPONENT,
      maxValueIndex
    );
    console.log(
      '%c AppMainComponent generateWorkDaysData() - avgValue: ',
      CONSOLE_TEXT_COLOR_COMPONENT,
      avgValue
    );

    this.bestWorkDay =
      maxValue > 0
        ? WORK_DAYS.daysOfWeek[maxValueIndex]
        : WORK_DAYS.EMPTY_DATA_MESSAGE;
    this.aboveAveragePercent =
      maxValue > 0
        ? ((maxValue - avgValue) / (avgValue / 100)).toFixed(2)
        : '0';

    // tslint:disable-next-line: max-line-length
    console.log(
      '%c AppMainComponent generateWorkDaysData() - aboveAveragePercent',
      CONSOLE_TEXT_COLOR_COMPONENT,
      this.aboveAveragePercent
    );
  }

  generateTopHashtagsData({
    startDate = null,
    endDate = new Date(),
  }: { startDate?: Date, endDate?: Date } = {}) {
    if (!startDate) {
      startDate = new Date(endDate);
      startDate.setMonth(startDate.getMonth() - 1);
    }

    startDate.setHours(
      START_DAY_TIME[0],
      START_DAY_TIME[1],
      START_DAY_TIME[2],
      START_DAY_TIME[3]
    );
    endDate.setHours(
      END_DAY_TIME[0],
      END_DAY_TIME[1],
      END_DAY_TIME[2],
      END_DAY_TIME[3]
    );

    const tagsList = {};
    let maxHashtagCount = 0;
    let maxHashtagName = '';
    this.recentPomos
      .filter((pomo) => {
        return (
          new Date(pomo.end_time) >= startDate &&
          new Date(pomo.end_time) <= endDate
        );
      })
      .map((pomo) => {
        const hashtagsInTitle = this.getHashtagsInTitle(pomo.title);
        console.log(
          '%cAppMainComponent generateTopHashtagsData() - hashtagsInTitle',
          CONSOLE_TEXT_COLOR_COMPONENT,
          hashtagsInTitle
        );
        if (hashtagsInTitle && hashtagsInTitle.length) {
          hashtagsInTitle.map((hashtag) => {
            tagsList[hashtag.trim()] = !tagsList[hashtag.trim()]
              ? 1
              : tagsList[hashtag.trim()] + 1;
            if (tagsList[hashtag.trim()] > maxHashtagCount) {
              maxHashtagCount = tagsList[hashtag.trim()];
              maxHashtagName = hashtag.trim();
            }
            console.log(
              `hashtag.trim():${hashtag.trim()}, tagsList[hashtag.trim()]: ${
                tagsList[hashtag.trim()]
              }`
            );
          });
        }
      });

    console.log(
      '%cAppMainComponent generateTopHashtagsData() - maxHashtagCount',
      CONSOLE_TEXT_COLOR_COMPONENT,
      maxHashtagCount
    );
    console.log(
      '%cAppMainComponent generateTopHashtagsData() - maxHashtagName',
      CONSOLE_TEXT_COLOR_COMPONENT,
      maxHashtagName
    );

    // console.log('%cAppMainComponent generateTopHashtagsData() - tagsList', CONSOLE_TEXT_COLOR_COMPONENT, tagsList);
    // Consider to remove Hashtags that amount is lower than 5% of the top Hashtag

    const totalHashtagCount = Object.entries(tagsList).reduce(
      (acc, curr) => (acc += +curr[1]),
      0
    );

    console.log(
      '%cAppMainComponent generateTopHashtagsData() - tagsList',
      CONSOLE_TEXT_COLOR_COMPONENT,
      tagsList
    );
    console.log(
      '%cAppMainComponent generateTopHashtagsData() - totalHashtagCount',
      CONSOLE_TEXT_COLOR_COMPONENT,
      totalHashtagCount
    );

    // Sort tagsList from big to small
    const sortedTagsList = this._utils.sortObjectByField(tagsList, true);

    // TODO: Fix bug, when there is only one hashtag (the chart is not correct)

    this.hashtagsChartValues = [];
    let angleDelta = 0;
    Object.keys(sortedTagsList).map((key) => {
      // console.log('sortedTagsList[key]', sortedTagsList[key]);
      const chartPercent = sortedTagsList[key] / (totalHashtagCount / 100);
      const angleValue = chartPercent * WORK_DAYS.ANGLE_SINGLE_PERCENT;
      const endAngle =
        angleDelta + angleValue - angleDelta === 360
          ? angleDelta + angleValue - 0.1
          : angleDelta + angleValue;
      // console.log(`key: ${key}, angleValue: ${angleValue}`);

      console.log(
        `angleDelta: ${angleDelta}, angleDelta: ${angleDelta} endAngle: ${endAngle}`
      );

      const svgPath = describeArcExtended(
        WORK_DAYS.START_X_COORDINATE,
        WORK_DAYS.START_Y_COORDINATE,
        WORK_DAYS.RADIUS_VALUE,
        angleDelta,
        endAngle
      );

      const angleVector = endAngle - angleValue / 2;
      // console.log(`angleValue: ${angleValue}, angleVector: ${angleVector}, endAngle: ${endAngle}`);
      console.log(`angleVector: ${angleVector}`);
      const angleInRadians = getAngleInRad(
        angleVector - CANVAS_SETTINGS.ANGLE_CORRECTION
      );
      console.log(`angleInRadians: ${angleInRadians}`);
      const xOffset =
        Math.cos(angleInRadians) * WORK_DAYS.CHART_PART_OFFSET_VALUE;
      const yOffset =
        Math.sin(angleInRadians) * WORK_DAYS.CHART_PART_OFFSET_VALUE;
      const offsetTextValue =
        WORK_DAYS.CHART_TEXT_OFFSET_VALUE + (angleVector > 225 && 10);
      const xOffsetText = Math.cos(angleInRadians) * offsetTextValue;
      const yOffsetText = Math.sin(angleInRadians) * offsetTextValue;
      // console.log(`angleVector: ${angleVector}, offsetValue: ${offsetTextValue}`);
      console.log(`xOffset: ${xOffset}, yOffset: ${yOffset}`);
      angleDelta += angleValue;
      console.log(`for (${key}) svgPath: ${svgPath}`);
      this.hashtagsChartValues.push({
        tagName: key.substr(1),
        pathD: svgPath,
        fillColor: `hsla(${angleDelta}, 80%, 70%, 1)`,
        offset: { x: xOffset, y: yOffset },
        offsetText: { x: xOffsetText, y: yOffsetText },
        percent: Math.floor(chartPercent),
      });
    });

    this.topHashtagName = maxHashtagName;
    console.log(
      '%cAppMainComponent generateTopHashtagsData() - topHashtagName',
      CONSOLE_TEXT_COLOR_COMPONENT,
      this.topHashtagName
    );
    // tslint:disable-next-line: max-line-length
    console.log(
      '%cAppMainComponent generateTopHashtagsData() - hashtagsChartValues',
      CONSOLE_TEXT_COLOR_COMPONENT,
      this.hashtagsChartValues
    );
  }

  generateWorkTimeData({
    startDate = null,
    endDate = new Date(),
    hashtag = '',
  }: { startDate?: Date, endDate?: Date, hashtag?: string } = {}) {
    if (!startDate) {
      startDate = new Date(endDate);
      startDate.setMonth(startDate.getMonth() - 1);
    }

    startDate.setHours(
      START_DAY_TIME[0],
      START_DAY_TIME[1],
      START_DAY_TIME[2],
      START_DAY_TIME[3]
    );
    endDate.setHours(
      END_DAY_TIME[0],
      END_DAY_TIME[1],
      END_DAY_TIME[2],
      END_DAY_TIME[3]
    );

    // TODO: Consider to filter pomos before calling 'generateWorkTimeData' and other related methods
    // * <- because generateWorkDaysData(), generateTopHashtagsData(), generateWorkTimeData() in some ways uses filtered data
    const filteredPomos = this.recentPomos.filter((pomo) => {
      const startTime = new Date(pomo.start_time);
      const endTime = new Date();
      // console.log(
      //   '%cAppMainComponent generateWorkTimeData() - startTime',
      //   CONSOLE_TEXT_COLOR_COMPONENT,
      //   startTime
      // );
      // console.log(
      //   '%cAppMainComponent generateWorkTimeData() - startDate',
      //   CONSOLE_TEXT_COLOR_COMPONENT,
      //   startDate
      // );
      // console.log(
      //   '%cAppMainComponent generateWorkTimeData() - endTime',
      //   CONSOLE_TEXT_COLOR_COMPONENT,
      //   endTime
      // );
      // console.log(
      //   '%cAppMainComponent generateWorkTimeData() - endDate',
      //   CONSOLE_TEXT_COLOR_COMPONENT,
      //   endDate
      // );
      return (
        startTime >= startDate &&
        endTime <= endDate &&
        pomo.title.includes(hashtag)
      );
    });

    console.log(
      '%cAppMainComponent generateWorkTimeData() - filteredPomos',
      CONSOLE_TEXT_COLOR_COMPONENT,
      filteredPomos
    );

    const hoursArray = new Array(HOURS_IN_DAY).fill(0);
    this.hoursData = filteredPomos.map((pomo) => {
      const startTime = new Date(pomo.start_time);
      const endTime = new Date(pomo.end_time);
      hoursArray[startTime.getHours()]++;
      return {
        startHour: startTime.getHours(),
        startMinute: startTime.getMinutes(),
        endHour: endTime.getHours(),
        endMinute: endTime.getMinutes(),
      };
    });

    const maxPomosInHour = hoursArray.reduce(
      (prev, next, index) =>
        next > prev.maxValue ? { maxValue: next, maxIndex: index } : prev,
      { maxValue: 0, maxIndex: 0 }
    );

    const hoursRange = [];
    let isRange = false;
    hoursArray.forEach((pomosCount, index) => {
      // console.log(`pomosCount: ${pomosCount}, index: ${index}`);
      if (
        pomosCount >=
        (maxPomosInHour.maxValue / 100) * EFFECTIVE_POMO_PERCENT
      ) {
        if (isRange) {
          const startHour = hoursRange[hoursRange.length - 1].startHour;
          const hoursAmount =
            index > startHour
              ? index + 1 - startHour
              : HOURS_IN_DAY - (index - startHour);
          hoursRange[hoursRange.length - 1] = {
            ...hoursRange[hoursRange.length - 1],
            endHour: (index + 1) % HOURS_IN_DAY,
            hoursAmount,
          };
        } else {
          isRange = true;
          hoursRange.push({
            startHour: index,
            endHour: undefined,
            hoursAmount: 0,
          });
        }
      } else {
        isRange = false;
      }
    });

    const updatedHoursRange = hoursRange.map((range) => {
      if (range.endHour === undefined) {
        return {
          ...range,
          endHour: range.startHour + 1,
          hoursAmount: 1,
        };
      }
      return range;
    });

    // * Next, we should find most long range of pomos
    const longestRange = updatedHoursRange.reduce(
      (curr, next) => (next.hoursAmount > curr.hoursAmount ? next : curr),
      { startHour: 0, endHour: 0, hoursAmount: 0 }
    );

    // * Consider to add new method to fill pomos base with some fake data

    this.bestWorkHours = `${padLeftWithString(
      longestRange.startHour,
      '0',
      2
    )} - ${padLeftWithString(longestRange.endHour, '0', 2)}`;

    this.dayTimeLabel = getDayTimeLabel(
      +longestRange.startHour,
      longestRange.endHour
    );

    // * Next, we should generate array of triangles with arcs for canvas

    console.log(
      '%cAppMainComponent generateWorkTimeData() - this.hoursData',
      CONSOLE_TEXT_COLOR_COMPONENT,
      this.hoursData
    );
    console.log(
      '%cAppMainComponent generateWorkTimeData() - hoursArray',
      CONSOLE_TEXT_COLOR_COMPONENT,
      hoursArray
    );
    console.log(
      '%cAppMainComponent generateWorkTimeData() - maxPomosInHour',
      CONSOLE_TEXT_COLOR_COMPONENT,
      maxPomosInHour
    );
    console.log(
      '%cAppMainComponent generateWorkTimeData() - hoursRange',
      CONSOLE_TEXT_COLOR_COMPONENT,
      hoursRange
    );
    console.log(
      '%cAppMainComponent generateWorkTimeData() - updatedHoursRange',
      CONSOLE_TEXT_COLOR_COMPONENT,
      updatedHoursRange
    );
    console.log(
      '%cAppMainComponent generateWorkTimeData() - longestRange',
      CONSOLE_TEXT_COLOR_COMPONENT,
      longestRange
    );
    console.log(
      '%cAppMainComponent generateWorkTimeData() - this.bestWorkHours',
      CONSOLE_TEXT_COLOR_COMPONENT,
      this.bestWorkHours
    );
    console.log(
      '%cAppMainComponent generateWorkTimeData() - this.dayTimeLabel',
      CONSOLE_TEXT_COLOR_COMPONENT,
      this.dayTimeLabel
    );
  }

  onToggleSelectedChartPart(selectedHashtag: string) {
    this.generateWorkDaysData({ hashtag: selectedHashtag });
    this.generateWorkTimeData({ hashtag: selectedHashtag });
    console.log(
      'onToggleSelectedChartPart() selectedHashtag: ',
      selectedHashtag
    );
  }
}
