import GraphQLClient from 'graphql-client';
import { GITHUB_URL, TOKEN_VARIABLE } from './consts';
import latestVersionQuery from './queries/latestVersionQuery'

export default class GithubFetcher {
    constructor() {
        this.client = new GraphQLClient({
            url: GITHUB_URL,
            headers: {
                Authorization: `bearer ${process.env[TOKEN_VARIABLE]}`
              }
        });
    }

    get(name) {
        console.log(name);
        return this.client.query(latestVersionQuery(name));
    }
}