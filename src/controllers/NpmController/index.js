import NpmRegisteryHandler from './../../services/NpmRegisteryHandler';

export default class NpmController {
    constructor() {
        this.handler = new NpmRegisteryHandler();

        this.getLibraryData = this.getLibraryData.bind(this);
        this.getLibraryVersionTimes = this.getLibraryVersionTimes.bind(this);
        this.getLatestVersion = this.getLatestVersion.bind(this);
    }

    async getLibraryData(ctx, next) {
        let response;

        const { library, property } = ctx.params;
        console.log('prop', property, !property);

        try {
            response = await this.handler.fetchMetdata(library);

            if (property) {
                if (response[property]) {
                    response = response[property];
                } else {
                    response = { error: `Property ${property} not found in ${library}` };
                }
            }
        } catch (error) {
            response = { error: error.message };
        }

        ctx.body = response;
    }

    async getLibraryVersionTimes(ctx, next) {
        let response;

        const { library } = ctx.params;

        try {
            response = await this.handler.fetchVersionTimes(library);
        } catch (error) {
            response = { error: error.message };
        }

        ctx.body = response;
    }

    async getLatestVersion(ctx, next) {
        let response;

        const { library } = ctx.params;

        try {
            response = await this.handler.fetchLatestVersionTime(library);
        } catch (error) {
            response = { error: error.message };
        }

        ctx.body = response;
    }
}