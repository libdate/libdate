import _ from 'lodash';
import { SOURCE_HANDLERS } from './consts';
import NpmResolver from '../../Sources/Npm/index';
import GithubResolver from '../../Sources/Github/index';

export default class LibraryResolver {
    constructor() {
        this.get = this.get.bind(this);
    }

    async get(request) {
        let githubResolver = new GithubResolver();
        let npmResolver = new NpmResolver();

        let result

        try {
            let githubPromise = githubResolver.get(request);
            let npmPromise = npmResolver.get(request);

            let [githubData, npmData] = await Promise.all([githubPromise, npmPromise])
            result = _.merge(githubData, npmData);
        } catch (error) {
            console.error(error);
        }

        return result;
    }
}