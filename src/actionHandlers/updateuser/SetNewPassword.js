import passwordValidator from '../../validators/validatePassword'
import resetPassword from '../../api/resetpassword/set-new-password'
import verifyPassword from '../../api/profile/updateuser/verify-password'
import passwordsValidator from '../../validators/validatePasswordChange'


export default async (e, data, setSubmiting, closeModal, userId, setError) => {
  e.preventDefault()
  setSubmiting(true)
  setError('')
   
  const { oldPw, newPw1, newPw2 } = data
  const someInputsAreEmpty = passwordsValidator(oldPw, newPw1, newPw2, setError)
  if(someInputsAreEmpty) return setSubmiting(false)

  const verdict = passwordValidator(newPw1, newPw2, setError)
  if(oldPw === newPw1){
    setSubmiting(false)
    return closeModal()
  }

  const pwMatches = await verifyPassword(oldPw)
  if(!pwMatches){
    setSubmiting(false)
    return setError('Old password is invalid')
  }

  if(verdict) {
    const resetPw = await resetPassword({ newPassword: newPw1, userId: userId })
    if(!resetPw) {
      setError('Reseting password failed try later')
    } else closeModal()
  }
  setSubmiting(false)
}