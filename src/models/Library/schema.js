export default `
type Library {
    name: String!,
    current_version: String,
    version_data: VersionData,
    description: String,
    releases: [VersionData],
    tags: [VersionData],
    githubUrl: String,
    owner: String,
}`;