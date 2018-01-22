import REPOSITORY_SEARCH_FRAGMENT from './repository.fragment';

export default repositoryName => `
query { 
  search(last: 1, query:"${repositoryName}", type: REPOSITORY) {
    edges {
      node {
        ... on Repository {
          ...REPOSITORY_SEARCH
        }
      }
    }
  }
}
${REPOSITORY_SEARCH_FRAGMENT}
`;