import RELEASE_FRAGMNET from './release.fragment';

export default `
fragment REPOSITORY_SEARCH on Repository {
  name,
  createdAt,
  description,
  url,
  releases(first: 5, orderBy: {field:CREATED_AT, direction:DESC}){
    edges {
      node {
        ...RELEASE
      }
    }
  }
}
  ${RELEASE_FRAGMNET}
`;
