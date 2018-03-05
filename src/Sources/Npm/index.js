import _ from 'lodash';
import { SOURCES } from '../../constants/sources.const';
import NpmFetcher from './NpmFetcher';
import { Library } from './../../models/Library';
import { VersionData } from './../../models/VersionData';
import moment from 'moment';

export default class NpmResolver {
    constructor() {
        this.fetcher = new NpmFetcher();

        this.get = this.get.bind(this);
    }

    async get({ name }, options) {
        let metadata;
        try {
            metadata = await this.fetcher.fetchMetdata(name);
        } catch (error) {
            console.error('Error resolving NPM:', error);
        }

        let { version, description, readme } = metadata;
        const releases = this.getVersionTimes(metadata, options);

        return new Library({
            name,
            current_version: version,
            version_data: this.getLatestVersionTime(releases),
            description,
            releases,
        });
    }

    getVersionTimes({ time: { modified, created, ...versions } }, options) {
        return _.map(versions.slice(0, 4), (date, version) =>
            new VersionData({ version, date: moment(date) }, options));
    }

    getLatestVersionTime(versions) {
        return _.maxBy(versions, ({ date }) => date);
    }
}