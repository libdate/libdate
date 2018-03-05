import axios from 'axios';
import { SEARCH_REPO_ROUTE, RELEASES_ROUTE, TAGS_ROUTE } from './routes';

export default class GithubFetcher {
    request(token, url) {
        return axios.get(url, {
            headers: { 'Authorization': `token ${token}`}
        })
    }

    searchRepo(token, name, owner) {
        return this.request(token, SEARCH_REPO_ROUTE(name, owner));
    }

    getRepoVersions(token, owner, name) {
        return this.request(token, RELEASES_ROUTE(owner, name));
    }

    getRepoTags(token, owner, name) {
        return this.request(token, TAGS_ROUTE(owner, name));
    }


    async get(searchName, owner, token) {
        let ownerName = owner;

        let searchData = await this.searchRepo(token, searchName, ownerName);

        if (searchData.data && searchData.data.items && searchData.data.items[0]) {
            const [repoData] = searchData.data.items;
            const { owner, name } = repoData;
            ownerName = owner.login;

            let releasesResponse = await this.getRepoVersions(token, ownerName, name);
            const { data: releases } = releasesResponse;

            let tagsResponse = await this.getRepoTags(token, ownerName, name);
            const { data: tags } = tagsResponse;

            let result = { ...repoData, releases, tags};;
            return result;
        }
    }
}