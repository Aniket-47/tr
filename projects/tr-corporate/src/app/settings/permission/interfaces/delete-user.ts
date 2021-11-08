export interface DeleteUser_request {
  userID: string
}

export interface DeleteUser_response {
  error: boolean,
  statusCode: number,
  message: string,
}
