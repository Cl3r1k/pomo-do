import { Injectable } from '@angular/core';

// Environments
import { environment as environmentProd } from '@env/environment.prod';

// Models
import { Tag } from '@app/_models/tag';

// Services
import { IndexedDbService } from '@app/_services/indexed-db.service';
import { TagLayerService } from '@app/_services/tag-layer.service';

// Modules
import { Utils } from '@app/_common/utils';

// Constants
const CONSOLE_TEXT_COLOR_SERVICE = environmentProd.consoleTextColorService;

@Injectable()
export class TagService {

    interval;
    updatePending = false;

    constructor(private _utils: Utils, private _tagLayerService: TagLayerService, private _indexedDbService: IndexedDbService) { }

    public getTagColorByName(tagName: string): string {
        console.log('%c getTagByName - incoming tagName: ', CONSOLE_TEXT_COLOR_SERVICE, tagName);
        let tagColor = 'red';
        const tags = this._tagLayerService.tags.filter(tag => {
            return tag.tag_name === tagName;
        });

        if (tags.length) {
            tagColor = tags[0].color;

            if (tags[0].ready_to_delete) {
                this._tagLayerService.tags.map(tag => {
                    if (tag.tag_name === tags[0].tag_name) {
                        tag.ready_to_delete = false;
                    }
                });

                this.updateHashtagsDelayed();
            }
        } else {
            // Add new hashtag to list and run ServiceWorker
            const newHashtag: Tag = new Tag(tagName.trim());
            const maxColorIndex = this._tagLayerService.colorsHashtags.length - 1;
            tagColor = this._tagLayerService.colorsHashtags[this._utils.randomRangeInteger(0, maxColorIndex)];
            newHashtag.color = tagColor;
            // console.log(`%cin 'getTagColorByName' tagColor: `, CONSOLE_TEXT_COLOR_SERVICE, tagColor);
            this._tagLayerService.tags.push(newHashtag);

            console.log('%cPending update in %cIndexedDb!', CONSOLE_TEXT_COLOR_SERVICE, 'color: red;');
            // TODO: Now we should run Sevice Worker or another worker with interval 3 sec, and update tagList in IndexedDb
            // BTW check if SW is running and waiting for update already, than just reset timer to 3 sec
            this.updateHashtagsDelayed();
        }

        return tagColor;    // If something went wrong, return 'tagColor' as red
    }

    public updateHashtagsDelayed() {
        if (this.updatePending) {
            clearInterval(this.interval);
        }

        this.updatePending = true;
        this.interval = setInterval(() => {
            console.log('%c-->Pefrorm update in %cIndexedDb!', CONSOLE_TEXT_COLOR_SERVICE, 'color: red;');

            this._indexedDbService.updateHashtags(this._tagLayerService.tags).subscribe(() => {
                console.log('%c--->Hashtags updated in %cIndexedDb!', CONSOLE_TEXT_COLOR_SERVICE, 'color: red;');
            });
            clearInterval(this.interval);
        }, 100);
    }

}
