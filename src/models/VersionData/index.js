import { schema } from './schema';
import { calculateAge } from '../../services/calculateAge';

export default  {
    schema
};

export class VersionData {
    constructor(version, date, description) {
        this.version = version;
        this.date = date.toISOString();
        this.age_days = calculateAge(date);
        this.age_text = date.fromNow();
        this.description = description;
    }

    static create({version, date, description}) {
        return new VersionData(version, date, description);
    }
}