export default `
type Library {
    name: String!,
    current_version: String,
    source: Source,
    version_data: VersionData,
    description: String,
    releases: [VersionData],
    githubUrl: String,
    owner: String,
}`;