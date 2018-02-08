import GithubFetcher from './fetcher';
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

    async get({ name: libQuery, owner, token }, options) {
        let response;
        try {
            response = await this.fetcher.get(libQuery, owner, token);
        } catch (error) {
            console.error(error, libQuery, owner);
            throw error;
        }

        let result = null;

        if (response) {
            let { name, releases, description, url, owner } = response;

            const releasesData = releases.map(currRelease =>
                this.createVersionTime(currRelease, options));
            const [latestRelease] = releasesData;

            result = new Library({
                name,
                current_version: latestRelease ? latestRelease.version : null,
                version_data: latestRelease,
                description,
                releases: releasesData,
                source: SOURCES.GITHUB,
                githubUrl: url,
                owner: owner.login,
            });
        }

        return result;
    }

    createVersionTime(releaseNode, options) {
        return new VersionData({
            version: releaseNode.name,
            date: moment.utc(releaseNode.published_at),
            description: releaseNode.body,
        }, options);
    }
}