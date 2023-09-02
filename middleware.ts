import { stackMiddlewares } from '@/middleware/stackMiddlewares'
import { withAuthorization } from '@/middleware/withAuthorization'


export default stackMiddlewares([withAuthorization])
