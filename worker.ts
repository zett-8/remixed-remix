import handle from 'hono-react-router-adapter/cloudflare-workers'
import * as build from './build/server'
import server from './app/server'
import { getLoadContext } from './load-context' 

export default handle(build, server, {getLoadContext})
