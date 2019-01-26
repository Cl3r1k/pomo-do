import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Resolvers
import { TodosResolver } from '@app/_resolvers/todos.resolver';
import { TodosActiveResolver } from '@app/_resolvers/todos-active.resolver';
import { TodosCompletedResolver } from '@app/_resolvers/todos-completed.resolver';
import { TodosFilterHashtagResolver } from '@app/_resolvers/todos-filter-hashtag.resolver';

// Components
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';
import { SignInComponent } from '@app/sign-in/sign-in.component';
import { AppMainComponent } from '@app/app-main/app-main.component';

// Guards
import { CanActivateTodosGuard } from '@app/_guards/can-activate-todos.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
    },
    {
        path: 'sign-in',
        component: SignInComponent
    },
    {
        path: 'app',
        component: AppMainComponent,
        canActivate: [
            CanActivateTodosGuard
        ],
        resolve: {
            resolverData: TodosResolver
        }
    },
    {
        path: 'app/todos/active',
        component: AppMainComponent,
        canActivate: [
            CanActivateTodosGuard
        ],
        resolve: {
            resolverData: TodosActiveResolver
        }
    },
    {
        path: 'app/todos/completed',
        component: AppMainComponent,
        canActivate: [
            CanActivateTodosGuard
        ],
        resolve: {
            resolverData: TodosCompletedResolver
        }
    },
    {
        path: 'app/todos/filter/hashtag/:hashtag',
        component: AppMainComponent,
        canActivate: [
            CanActivateTodosGuard
        ],
        resolve: {
            resolverData: TodosFilterHashtagResolver
        }
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [TodosResolver, TodosActiveResolver, TodosCompletedResolver, TodosFilterHashtagResolver]
})
export class AppRoutingModule { }
