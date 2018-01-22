export default `
fragment RELEASE on Release {
  publishedAt
  name,
  description,
  tag {
    name
    prefix
  }
}
`;