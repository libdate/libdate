import resolver from './resolver';
import schema from './schema';
import query from './query';

export default {
    name: 'library',
    resolver, 
    schema,
    query,
};

export class Library {
    constructor(libraryData) {
        const {name, current_version, version_data, description, releases, githubUrl, owner} = libraryData;

        this.name = name;
        this.current_version = current_version;
        this.version_data = version_data;
        this.description = description;
        this.releases = releases;
        this.githubUrl = githubUrl;
        this.owner = owner;
    }
}