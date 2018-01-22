import GithubFetcher from './GithubFetcher';
import { SOURCES } from '../../constants/sources.const';
import { Library } from '../../models/Library/index';
import { relative } from 'path';
import moment from 'moment';
import { VersionData } from '../../models/VersionData';

export default class GithubResolver {
    constructor() {
        this.fetcher = new GithubFetcher();

        this.get = this.get.bind(this);
    }

    async get({ name: libQuery }) {
        let response = await this.fetcher.get(libQuery);
        let result = null;
        let latestVersionData = this.extractSearchData(response);

        if (latestVersionData) {
            let { name, releases, description, url} = latestVersionData;

            const releasesData = releases.edges.map(currEdge => 
                this.createVersionTime(currEdge.node));
            const latestRelease = releasesData[0];

            result = new Library({
                name,
                current_version: latestRelease.version,
                version_data: latestRelease,
                description,
                releases: releasesData,
                source: SOURCES.GITHUB,
                githubUrl: url,
            });
        }

        return result;
    }

    extractSearchData(response) {
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

    createVersionTime(releaseNode) {
        return VersionData.create({
            version: releaseNode.tag.name,
            date: moment.utc(releaseNode.publishedAt),
            description: releaseNode.description,
        });
    }
}