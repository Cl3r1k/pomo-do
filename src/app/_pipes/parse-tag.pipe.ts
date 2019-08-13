import { Pipe, PipeTransform } from '@angular/core';

// Environments
import { environment as environmentProd } from '@env/environment.prod';

// Services
import { TagService } from '@app/_services/tag.service';

const CONSOLE_TEXT_COLOR_PIPE = environmentProd.consoleTextColorPipe;

@Pipe({
    name: 'parseTagPipe'
})
export class ParseTagPipe implements PipeTransform {

    // tslint:disable-next-line:max-line-length
    urlsRegExp = /(\b(https?|http|ftp|ftps|Https|rtsp|Rtsp):\/\/[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim; // Find/Replace URL's in text
    hashtagsRegExp = /(^|\s)(#[a-z\d][\w-]*)/ig; // Find/Replace #hashtags in text

    constructor(private _tagService: TagService) { }

    transform(text: string): string {
        return this.parseTag(text);
    }

    parseTag(text: string): string {
        // Find/Replace URL's in text
        if (text.match(this.urlsRegExp)) {
            text = text.replace(this.urlsRegExp, function replacer($1, $2, $3) {
                const url = $1;
                const urlClean = url.replace('' + $3 + '://', '');

                return `<a class='url-class' href='` + url + `' target='_blank'>` + urlClean + `</a>`;
            });
        }

        // Find/Replace #hashtags in text
        if (text.match(this.hashtagsRegExp)) {
            // text = text.replace(this.hashtagsRegExp, `$1<span class='tag-class'>$2</span>`);    // Old text without color

            // const color = '#efefef';
            // text = text.replace(this.hashtagsRegExp, `$1<span class='tag-class' style='background-color: ` + color + `;'>$2</span>`);
            const scope = this;

            text = text.replace(this.hashtagsRegExp, function replacer($1, $2, $3) {
                const space = $2;
                const tagName = $3;

                let colorInTagService = '';
                colorInTagService = scope._tagService.getTagColorByName(tagName);
                console.log(`%cin ParseTagPipe for %s colorInTagService is:`, CONSOLE_TEXT_COLOR_PIPE, tagName, colorInTagService);
                // console.log(`%cin ParseTagPipe for %s tags is:`, CONSOLE_TEXT_COLOR_PIPE, tagName, scope._tagService.tags);

                return space + `<span class='tag-class' style='background-color: ` + colorInTagService + `;'>` + tagName + `</span>`;
            });
        }

        return text;
    }

    // TODO: Delete code bellow later
    // parseTag(text: string): Observable<string> {
    //     // Find/Replace URL's in text
    //     if (text.match(this.urlsRegExp)) {
    //         text = text.replace(this.urlsRegExp, function replacer($1, $2, $3) {
    //             const url = $1;
    //             const urlClean = url.replace('' + $3 + '://', '');

    //             return `<a href='` + url + `' target='_blank'>` + urlClean + `</a>`;
    //         });
    //     }

    //     // Find/Replace #hashtags in text
    //     if (text.match(this.hashtagsRegExp)) {
    //         return this._indexedDbService.getTagColor('#tagName').pipe(
    //             map(result => {
    //                 const colorInTagService = result;
    //                 const tagName = '#someKindOfTag';
    //                 text = `Todo <span class='tag-class' style='background-color: ` + colorInTagService + `;'>` + tagName + `</span>`;
    //                 return text;
    //             })
    //         );
    //     }

    //     return Observable.of(text);
    // }
}
