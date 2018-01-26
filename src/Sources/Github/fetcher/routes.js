import { SEARCH_PAGE_LIMIT, RELEASES_PAGE_LIMIT } from "./consts";

export const API = 'https://api.github.com';

export const SEARCH_REPO_ROUTE = (repo, owner) => `
    ${API}/search/repositories?q="${owner ? `${owner}/${repo}` : repo}"&per_page=${SEARCH_PAGE_LIMIT}`;
export const RELEASES_ROUTE = (owner, repo) =>
    `${API}/repos/${owner}/${repo}/releases?per_page=${RELEASES_PAGE_LIMIT}`;