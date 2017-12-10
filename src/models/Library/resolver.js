import _ from 'lodash';
import { SOURCE_HANDLERS } from './consts';

export default class LibraryResolver {
    constructor() {
        this.getLatest = this.getLatest.bind(this);
    }

    async getLatest(obj) {
        const {name, source} = obj;

        let sourceHandler = new SOURCE_HANDLERS[source]();
        
        return sourceHandler.getLatest(obj);
    }
}