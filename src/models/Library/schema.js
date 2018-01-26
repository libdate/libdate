export default `
type Library {
    name: String!,
    current_version: String,
    version_data: VersionData,
    description: String,
    releases: [VersionData],
    githubUrl: String,
    owner: String,
}`;