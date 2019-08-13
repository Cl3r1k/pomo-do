import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

// Environments
import { environment as environmentProd } from '@env/environment.prod';

// Models
import { ResolverData } from '@app/_models/resolver-data';

// Services
import { TodoService } from '@app/_services/todo.service';

// Imports
import { map, switchMap } from 'rxjs/operators';

const CONSOLE_TEXT_COLOR_RESOLVER = environmentProd.consoleTextColorResolver;

@Injectable()
export class TodosCompletedResolver implements Resolve<Observable<ResolverData>> {

    constructor(private _todoService: TodoService) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolverData> {
        console.log(`%cresolve() in TodosCompletedResolver`, CONSOLE_TEXT_COLOR_RESOLVER);

        return this._todoService.initIndexedDbBase().pipe(
            switchMap(() => this._todoService.getAllTodos(2).pipe(
                map(todos => {
                    // console.log(`%cin 'TodosResolver' todos: `, CONSOLE_TEXT_COLOR_RESOLVER, todos);

                    const resolverData: ResolverData = new ResolverData(2, '');
                    resolverData.todos = todos;

                    // console.log(`%cin 'TodosResolver' resolverData: `, CONSOLE_TEXT_COLOR_RESOLVER, resolverData);

                    return resolverData;
                })
            ))
        );    // Open base anyway
    }

}
