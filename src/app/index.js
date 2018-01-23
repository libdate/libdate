import { LISTEN_PORT, ALLOW_ORIGIN } from '../constants/server.const';
import Koa from 'koa';
import Router from 'koa-router';
import cors from 'koa-cors';
import graphqlHTTP from 'koa-graphql';
import { rootValue, schema } from '../models/root';
import GithubFetcher from '../Sources/Github/GithubFetcher';

const app = new Koa();

app.use(cors({origin: ALLOW_ORIGIN}));

const graphqlRoutes = new Router();

graphqlRoutes.all('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
}));

app.use(graphqlRoutes.routes()).use(graphqlRoutes.allowedMethods());

app.listen(LISTEN_PORT);
console.log(`listening on ${LISTEN_PORT}!`);