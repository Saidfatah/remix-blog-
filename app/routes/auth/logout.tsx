import { ActionFunction, redirect } from 'remix'
import { logout } from '../../utils/session.server'

export const action:ActionFunction = async ({ request }) => {
  console.log('loggoed out action')
  return logout(request)
}

export const loader = async () => {
  return redirect('/')
}