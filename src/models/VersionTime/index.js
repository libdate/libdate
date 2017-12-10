import { schema } from './schema';

export default  {
    schema
};

export class VersionTime {
    constructor(version, date) {
        this.version = version;
        this.date = date;
    }
}