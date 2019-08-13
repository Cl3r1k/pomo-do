import { Pipe, PipeTransform } from '@angular/core';

// Environments
import { environment as environmentProd } from '@env/environment.prod';

// Services
import { TagService } from '@app/_services/tag.service';

const CONSOLE_TEXT_COLOR_PIPE = environmentProd.consoleTextColorPipe;

@Pipe({
    name: 'filterTagPipe'
})
export class FilterTagPipe implements PipeTransform {

    constructor(private _tagService: TagService) { }

    transform(text: string): string {
        return this.filterTag(text);
    }

    filterTag(text: string): string {

        let colorInTagService = 'gray';
        colorInTagService = this._tagService.getTagColorByName(text);
        // console.log(`%cin ParseTagPipe for %s colorInTagService is:`, CONSOLE_TEXT_COLOR_PIPE, text, colorInTagService);

        return `<div class='hashtag' style='background-color: ` + colorInTagService + `;'>` + text + `</div>`;
    }

}
