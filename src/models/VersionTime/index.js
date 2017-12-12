import { schema } from './schema';
import { calculateAge } from '../../services/calculateAge';

export default  {
    schema
};

export class VersionTime {
    constructor(version, date) {
        this.version = version;
        this.date = date.toISOString();
        this.age_days = calculateAge(date);
        this.age_text = date.fromNow();
    }
}