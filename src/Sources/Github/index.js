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

    async get({ name: libQuery, owner}) {
        let response = await this.fetcher.get(libQuery, owner);
        let result = null;

        if (response) {
            let { name, releases, description, url, owner} = response;

            const releasesData = releases.map(this.createVersionTime);
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

    createVersionTime(releaseNode) {
        return VersionData.create({
            version: releaseNode.name,
            date: moment.utc(releaseNode.published_at),
            description: releaseNode.body,
        });
    }
}