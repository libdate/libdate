import { LISTEN_PORT } from '../constants/server.const';
import Koa from 'koa';
import Router from 'koa-router';
import cors from 'koa-cors';
import graphqlHTTP from 'koa-graphql';
import { rootValue, schema } from '../models/root';

const app = new Koa();

app.use(cors());

const graphqlRoutes = new Router();

graphqlRoutes.get('/', (ctx, next) => {
    console.log('Hello')
});

graphqlRoutes.all('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
}));

app.use(graphqlRoutes.routes()).use(graphqlRoutes.allowedMethods());

app.listen(LISTEN_PORT);
console.log(`listening on ${LISTEN_PORT}!`);