import { Injectable } from '@angular/core';

// Models
import { ToDo } from '@app/_models/to-do';

@Injectable()
export class PomoStateMockService {

    recentPomosView = [];

    constructor() { }

    public initPomoState(isRestState: boolean) { }

    public savePomoState() { }

    public loadPomoState() { }

    public interruptPomo() { }

    public setIdlePomoState() { }

    public saveCompletedPomo(pomoName: string) { }

    public savePomoList() { }

    public loadPomoList() { }

    public generatePomoListView() { }

    public getPomosCount() { }

}
