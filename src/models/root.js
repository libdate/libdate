import { buildSchema } from 'graphql';
import Library from './Library';
import _ from 'lodash';
import Source from './Source';
import VersionData from './VersionData';
import Libraries from './Libraries/index';
import RegisteredLibraries from './RegisteredLibraries';

const models = [VersionData, Source, Library, Libraries, RegisteredLibraries];

const getQueries = () => models.map(({ query }) => query).filter(curr => curr);
const getScehmas = () => models.map(({ schema }) => schema).filter(curr => curr);
const getMutationSchemes = () => models.map(({ mutationScheme }) => mutationScheme).filter(curr => curr);
const getResolvers = () =>
    models.reduce((rootResolver, { name, resolver }) =>
        rootResolver = _.extend(rootResolver, resolver ? { [name]: new resolver().get } : {}), {});
const getMutations = () =>
    models.reduce((rootMutations, { mutations }) =>
        rootMutations = _.extend(rootMutations, { ...mutations }));

export const schema = buildSchema(`
    ${getScehmas().join('\n')}

    type Mutation {
        ${getMutationSchemes().join('\n')}
    }

    type Query {
        ${getQueries().join('\n')}
    }

    schema {
        query: Query,
        mutation: Mutation,
    }
`);

export const rootValue = {
    ...getResolvers(),
    ...getMutations(),
};