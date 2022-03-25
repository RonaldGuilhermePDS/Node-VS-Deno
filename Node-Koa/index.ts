const koa = require('koa');
const bodyparse = require('koa-bodyparser');
const logger = require('koa-logger');

import router from './routes/index';

const app = new koa();

app.use(bodyparse());
app.use(logger());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
