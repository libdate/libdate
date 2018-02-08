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
        } catch(error) {
            console.error('Error resolving NPM:', error);
        }

        let { version, description, readme } = metadata;

        return new Library({
            name,
            current_version: version,
            version_data: this.getLatestVersionTime(metadata, options),
            description,
            source: SOURCES.NPM
        });
    }

    getVersionTimes({ time: { modified, created, ...versions } }) {
        return _.map(versions, (currDate, currVersion) => ({ version: currVersion, date: currDate }));
    }

    getLatestVersionTime(libraryMetadata, options) {
        let versions = this.getVersionTimes(libraryMetadata);
        let { version, date } = _.maxBy(versions, ({ date }) => date);
        return new VersionData({version, date: moment(date)}, options);
    }
}