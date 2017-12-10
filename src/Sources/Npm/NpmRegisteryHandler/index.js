import Registry from 'npm-registry';
import { NPM_REGISTRY_URL } from '../consts';
import _ from 'lodash';
import { promisify } from 'util';

export default class NpmRegisteryHandler {
    constructor() {
        this.npm = new Registry({ registry: NPM_REGISTRY_URL });

        this.npm.packages.get = promisify(this.npm.packages.get);

        this.fetchMetdata = this.fetchMetdata.bind(this);
        this.fetchVersionTimes = this.fetchVersionTimes.bind(this);
        this.fetchLatestVersionTime = this.fetchLatestVersionTime.bind(this);
    }

    async fetchMetdata(library) {
        let matchingLibraries;
        let result;
        const npm = new Registry({ registry: NPM_REGISTRY_URL });

        try {
            matchingLibraries = await this.npm.packages.get(library);
        } catch (error) {
            if (error.statusCode === 404) {
                this.throwNotFound(library);
            } else {
                throw error;
            }
        }

        if (_.isEmpty(matchingLibraries)) {
            this.throwNotFound(library);
        }

        result = matchingLibraries[0];

        return result;
    }

    throwNotFound(library) {
        console.log('not found', library);
        throw new Error(`No libary named '${library}' found`);
    }

    throwPropertyNotFound(library, property) {
        if (response[property]) {
            response = response[property];
        } else {
            throw new Error(`Property ${property} not found in ${library}`);
        }
    }
}