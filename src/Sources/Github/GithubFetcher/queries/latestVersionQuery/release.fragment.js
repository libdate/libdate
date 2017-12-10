export default `
fragment RELEASE on Release {
  publishedAt
  name,
  tag {
    name
    prefix
  }
}
`;