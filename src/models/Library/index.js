import resolver from './resolver';
import schema from './schema';
import query from './query';

export default {
    name: 'library',
    resolver, 
    schema,
    query,
};

export class Library {
    constructor(name, version, version_time, source) {
        this.name = name;
        this.version = version;
        this.version_time = version_time;
        this.source = source;
    }
}