import _ from 'lodash';
import LibraryResolver from '../Library/resolver';

export default class LibrariesResolver {
    constructor() {
        this.get = this.get.bind(this);
        this.libraryResolver = new LibraryResolver();
    }

    async get(request) {
        const {names, source, token} = request;
        return names.split(',').map(name => this.libraryResolver.get({name, source, token}));
    }
}