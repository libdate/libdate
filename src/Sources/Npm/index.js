import _ from 'lodash';
import { SOURCES } from '../../constants/sources.const';
import NpmRegisteryHandler from './NpmRegisteryHandler';
import { Library } from './../../models/Library';
import { VersionTime } from './../../models/VersionTime';

export default class NpmResolver {
    constructor() {
        this.handler = new NpmRegisteryHandler();

        this.getLatest = this.getLatest.bind(this);
    }

    async getLatest({ name }) {
        let metadata = await this.handler.fetchMetdata(name);
        let { version, } = metadata;

        return new Library(
            name,
            version,
            this.getLatestVersionTime(metadata),
            SOURCES.NPM
        );
    }

    getVersionTimes({ time: { modified, created, ...versions } }) {
        return _.map(versions, (currDate, currVersion) => ({ version: currVersion, date: currDate }));
    }

    getLatestVersionTime(libraryMetadata) {
        let versions = this.getVersionTimes(libraryMetadata);
        let {version, date} = _.maxBy(versions, ({ date }) => date);
        return new VersionTime(version, date);
    }
}