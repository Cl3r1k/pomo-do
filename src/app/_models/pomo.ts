export class Pomo {
    id: number;
    canceled: boolean;
    created_time: string;
    deleted: boolean;
    deleted_time: string;
    duration: number;
    end_time: string;
    uuid: string;
    manual: boolean;
    start_time: string;
    title: string;
    updated_time: string;
    __accound_id: string;
    __dirty: boolean;
    _local_created_time: number;
    _local_deleted_time: number;
    _local_end_time: number;
    _local_start_time: number;
    _local_updated_time: number;

    constructor(title: string, start_time: string, uuid: string, canceled: boolean) {
        this.canceled = canceled;
        const tmpCreatedTime = new Date();
        tmpCreatedTime.setMilliseconds(0);
        this.created_time = tmpCreatedTime.toISOString();
        this.deleted = false;
        this.deleted_time = null;
        this.duration = 1500;
        this.end_time = this.created_time;
        this.uuid = uuid;
        this.manual = false;
        this.start_time = start_time;
        this.title = title;
        this.updated_time = this.created_time;
        this.__accound_id = '123456';
        this.__dirty = false;
        this._local_created_time = new Date(this.created_time).getTime();
        this._local_updated_time = new Date(this.created_time).getTime();
        this._local_end_time = new Date(this.created_time).getTime();
        this._local_start_time = new Date(this.start_time).getTime();
        this._local_deleted_time = null;
    }
}
