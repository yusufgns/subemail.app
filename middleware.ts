import { stackMiddlewares } from '@/middleware/stackMiddlewares'
import { withAuthorization } from '@/middleware/withAuthorization'
import { withUsers } from '@/middleware/withUsers'


export default stackMiddlewares([withAuthorization, withUsers])
