import resolver from './resolver';
import schema from './schema';
import query from './query';

export default {
    name: 'libraries',
    resolver, 
    schema,
    query,
};

export class Libraries {
    constructor(librariesData) {
        const {data} = libraryData;

        return {data};
    }
}