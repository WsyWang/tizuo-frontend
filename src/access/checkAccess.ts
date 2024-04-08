import type { currentUser } from '@/type/currentUser'
import ACCESS_ENUM from '@/constants/ACCESSENUM'

const checkAccess = (currentUser: currentUser, needAccess: any): boolean => {
  if (needAccess === null || needAccess === undefined || needAccess.length === 0) {
    return true
  }
  if (currentUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
    return false
  }
  return needAccess.some((item: any) => item === currentUser.userRole)
}

export default checkAccess