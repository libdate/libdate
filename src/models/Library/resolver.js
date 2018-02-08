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

        const options = {
            roundAges: request.roundAges
        };

        try {
            let githubPromise = githubResolver.get(request, options);
            let npmPromise = npmResolver.get(request, options);

            let [githubData, npmData] = await Promise.all([githubPromise, npmPromise])
            result = _.merge(githubData, npmData);
        } catch (error) {
            console.error(error);
        }

        return result;
    }
}