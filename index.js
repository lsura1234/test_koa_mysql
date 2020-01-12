import bodyParser from 'koa-bodyparser'
import Koa from 'koa'
import appConfig from './configs/app'
import indexRoute from './route/routes'
const app = new Koa();
app.use(bodyParser());
app.use(indexRoute.routes());
const server = app.listen(appConfig.NODE_PORT)
