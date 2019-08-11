import { Pipe, PipeTransform } from '@angular/core';

// Environments
import { environment } from '@env/environment.prod';

// Services
import { TagService } from '@app/_services/tag.service';

@Pipe({
    name: 'filterTagPipe'
})
export class FilterTagPipe implements PipeTransform {

    CONSOLETEXTCOLORPIPE = environment.consoleTextColorPipe;

    constructor(private _tagService: TagService) { }

    transform(text: string): string {
        return this.filterTag(text);
    }

    filterTag(text: string): string {

        let colorInTagService = 'gray';
        colorInTagService = this._tagService.getTagColorByName(text);
        // console.log(`%cin ParseTagPipe for %s colorInTagService is:`, this.CONSOLETEXTCOLORPIPE, text, colorInTagService);

        return `<div class='hashtag' style='background-color: ` + colorInTagService + `;'>` + text + `</div>`;
    }

}
