export interface ResetPassword_request {
  newPassword: string,
  confirmPassword: string
}

export interface ResetPassword_response {
  error: boolean,
  statusCode: number,
  message: string
}
