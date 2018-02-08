import { schema } from './schema';
import { calculateAge } from '../../services/calculateAge';

export default  {
    schema
};

export class VersionData {
    constructor({version, date, description}, options) {
        this.version = version;
        this.date = date.toISOString();
        this.age_days = calculateAge(date, undefined, options.roundAges);
        this.age_text = date.fromNow();
        this.description = description;
    }
}