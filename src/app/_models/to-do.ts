import { v4 as uuidv4 } from 'uuid';

export class ToDo {
    // As far this class used to store data in 'DB' here used Snake_case notation for variables
    id: number;
    title = '';
    complete = false;
    inner_id: string;
    created_time: string;
    updated_time: string;
    completed_time: string;
    deleted_time: string;
    pin = false;
    costed_pomo = 0;
    estimated_pomos = 0;
    remind_me = false;
    remind_time = null;
    note = null;

    constructor(values: Object = {}) {
        Object.assign(this, values);
        this.created_time = new Date().toISOString();
        this.completed_time = null;
        this.updated_time = null;
        this.deleted_time = null;
        this.inner_id = uuidv4();    // Generate new UUID
    }

}
