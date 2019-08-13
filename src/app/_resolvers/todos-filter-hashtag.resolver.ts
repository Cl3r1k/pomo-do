import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

// Environments
import { environment as environmentProd } from '@env/environment.prod';

// Models
import { ResolverData } from '@app/_models/resolver-data';

// Services
import { TodoService } from '@app/_services/todo.service';
import { IndexedDbService } from '@app/_services/indexed-db.service';
import { TagLayerService } from '@app/_services/tag-layer.service';

// Imports
import { map, switchMap } from 'rxjs/operators';

const CONSOLE_TEXT_COLOR_RESOLVER = environmentProd.consoleTextColorResolver;

@Injectable()
export class TodosFilterHashtagResolver implements Resolve<Observable<ResolverData>> {

    constructor(
        private _todoService: TodoService,
        private _indexedDbService: IndexedDbService,
        private _tagLayerService: TagLayerService
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolverData> {
        // console.log(`%cin 'TodosFilterHashtagResolver' hashtag: `, CONSOLE_TEXT_COLOR_RESOLVER, route.params['hashtag']);

        return this._todoService.initIndexedDbBase().pipe(
            switchMap(() => this._todoService.getAllTodos(0).pipe(
                switchMap(todos => this._indexedDbService.getAllHashtags().pipe(
                    map(hashtags => {
                        // console.log(`%cin 'TodosFilterHashtagResolver' todos: `, CONSOLE_TEXT_COLOR_RESOLVER, todos);
                        // console.log(`%cin 'TodosFilterHashtagResolver' hashtags: `, CONSOLE_TEXT_COLOR_RESOLVER, hashtags);

                        if (hashtags.length) {
                            this._tagLayerService.setTagsList(hashtags);
                        }

                        const resolverData: ResolverData = new ResolverData(3, route.params['hashtag']);
                        resolverData.todos = todos;

                        // console.log(`%cin 'TodosFilterHashtagResolver' resolverData: `, CONSOLE_TEXT_COLOR_RESOLVER, resolverData);

                        return resolverData;
                    })
                ))
            ))
        );    // Open base anyway
    }

}
