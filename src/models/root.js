import { buildSchema } from 'graphql';
import Library from './Library';
import _ from 'lodash';
import Source from './Source';
import VersionData from './VersionData';

const models = [VersionData, Source, Library];

const getQueries = () => models.map(({ query }) => query).filter(curr => curr);
const getScehmas = () => models.map(({ schema }) => schema).filter(curr => curr);
const getResolvers = () =>
    models.reduce((rootResolver, {name, resolver }) => 
        rootResolver = _.extend(rootResolver, resolver ? {[name]: new resolver().get}: {}), {});

export const schema = buildSchema(`
    ${getScehmas().join('\n')}

    type Query {
        ${getQueries().join('\n')}
    }

    schema {
        query: Query
    }
`);

export const rootValue = getResolvers();