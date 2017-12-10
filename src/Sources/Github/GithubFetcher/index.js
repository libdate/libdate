import GraphQLClient from 'graphql-client';
import { GITHUB_URL, TOKEN_VARIABLE } from './consts';
import latestVersionQuery from './queries/latestVersionQuery'
import env from '../../../env';

export default class GithubFetcher {
    constructor() {
        this.client = new GraphQLClient({
            url: GITHUB_URL,
            headers: {
                Authorization: `bearer ${env.GITHUB_TOKEN}`
              }
        });
    }

    get(name) {
        return this.client.query(latestVersionQuery(name));
    }
}