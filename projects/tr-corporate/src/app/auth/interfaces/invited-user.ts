export interface NewInvitedUser_request {
  userpassword: string,
  inviteKey: string
}
export interface NewInvitedUser_response {
  error: boolean,
  statusCode: number,
  message: string
}
