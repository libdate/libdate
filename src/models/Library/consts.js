import { SOURCES } from "../../constants/sources.const";
import NpmResolver from './../../Sources/Npm';
import GithubResolver from './../../Sources/Github';

export const SOURCE_HANDLERS = {
    [SOURCES.NPM]: NpmResolver,
    [SOURCES.GITHUB]: GithubResolver,
};