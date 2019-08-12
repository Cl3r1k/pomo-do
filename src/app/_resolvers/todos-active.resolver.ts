import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TodoService } from '@app/_services/todo.service';
import { ResolverData } from '@app/_models/resolver-data';

// Environments
import { environment } from '@env/environment.prod';

import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class TodosActiveResolver implements Resolve<Observable<ResolverData>> {

    CONSOLETEXTCOLORRESOLVER = environment.consoleTextColorResolver;

    constructor(private _todoService: TodoService) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolverData> {
        console.log(`%cresolve() in TodosActiveResolver`, this.CONSOLETEXTCOLORRESOLVER);

        return this._todoService.initIndexedDbBase().pipe(
            switchMap(() => this._todoService.getAllTodos(1).pipe(
                map(todos => {
                    // console.log(`%cin 'TodosResolver' todos: `, this.CONSOLETEXTCOLORRESOLVER, todos);

                    const resolverData: ResolverData = new ResolverData(1, '');
                    resolverData.todos = todos;

                    // console.log(`%cin 'TodosResolver' resolverData: `, this.CONSOLETEXTCOLORRESOLVER, resolverData);

                    return resolverData;
                })
            ))
        );    // Open base anyway
    }

}
