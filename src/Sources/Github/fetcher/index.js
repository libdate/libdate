import axios from 'axios';
import { SEARCH_REPO_ROUTE, RELEASES_ROUTE } from './routes';

export default class GithubFetcher {
    searchRepo(name, owner) {
        return axios.get(SEARCH_REPO_ROUTE(name, owner));
    }

    getRepoVersions(owner, name) {
        return axios.get(RELEASES_ROUTE(owner, name));
    }

    async get(searchName, owner) {
        let ownerName = owner;

        let searchData = await this.searchRepo(searchName, ownerName);

        if (searchData.data && searchData.data.items && searchData.data.items[0]) {
            const [repoData] = searchData.data.items;
            const { owner, name } = repoData;
            ownerName = owner.login;

            const { data: releases } = await this.getRepoVersions(ownerName, name);
            return { ...repoData, releases };
        }
    }
}