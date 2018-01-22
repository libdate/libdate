import _ from 'lodash';
import { SOURCE_HANDLERS } from './consts';

export default class LibraryResolver {
    constructor() {
        this.get = this.get.bind(this);
    }

    async get(obj) {
        const {name, source} = obj;

        let sourceHandler = new SOURCE_HANDLERS[source]();
        
        return sourceHandler.get(obj);
    }
}