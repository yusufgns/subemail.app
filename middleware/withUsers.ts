import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server'
import { MiddlewareFactory } from './types'
import supabase from '@/utils/supabase'

export const withUsers: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const { data: emailList, error } = await supabase
      .from('emailList')
      .insert([
        {
          email: 'testers@gmail.com',
          projectKey: 'testersMan',
          cretorEmailKey: 'testerMan',
        },
      ])

    console.log(emailList)

    if (error) {
      console.error('Error fetching user data:', error)
      return console.error(error)
    }

    return next(request, _next)
  }
}
