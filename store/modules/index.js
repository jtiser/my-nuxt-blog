import {
  name as authenticationModuleName,
  moduleAuthentication as authenticationModule
} from './authentication'
import { name as postsModuleName, modulePosts as postsModule } from './posts'

export default {
  [authenticationModuleName]: authenticationModule,
  [postsModuleName]: postsModule
}
