import GithubFetcher from './GithubFetcher';
import { SOURCES } from '../../constants/sources.const';
import { Library } from '../../models/Library/index';
import { relative } from 'path';
import { VersionTime } from '../../models/VersionTime/index';

export default class GithubResolver {
    constructor() {
        this.fetcher = new GithubFetcher();

        this.getLatest = this.getLatest.bind(this);
    }

    async getLatest({ name: libQuery }) {
        let response = await this.fetcher.get(libQuery);
        let result = null;
        let latestVersionData = this.extractLatestVersionData(response);

        if (latestVersionData) {
            let { name, releases } = latestVersionData;

            const latestRelease = this.extractReleaseData(releases, 0);
            
            result = new Library(
                name,
                latestRelease.name,
                new VersionTime(latestRelease.tag.name, latestRelease.publishedAt),
                SOURCES.GITHUB
            );
        }

        return result;
    }

    extractLatestVersionData(response) {
        if (response && 
            response.data && 
            response.data.search && 
            response.data.search.edges && 
            response.data.search.edges.length > 0) {
            return response.data.search.edges[0].node;
        }
    }

    extractReleaseData(releases, index) {
        if (releases && 
            releases.edges && 
            releases.edges.length > index) {
            return releases.edges[index].node;
        }
    }
}