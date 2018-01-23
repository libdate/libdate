import axios from 'axios';
import { SEARCH_REPO_ROUTE, RELEASES_ROUTE } from './routes';

export default class GithubFetcher {
    searchRepo(name) {
        return axios.get(SEARCH_REPO_ROUTE(name));
    }

    getRepoVersions(owner, name) {
        return axios.get(RELEASES_ROUTE(owner, name));
    }

    async get(searchName) {
        let searchData = await this.searchRepo(searchName);

        if (searchData.data && searchData.data.items && searchData.data.items[0]) {
            const [repoData] = searchData.data.items;
            const {owner: {login: ownerName}, name} = repoData;
            const {data: releases} = await this.getRepoVersions(ownerName, name);
            return {...repoData, releases};
        }
    }
}