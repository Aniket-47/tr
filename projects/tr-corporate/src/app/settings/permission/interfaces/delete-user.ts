export interface DeleteUser_request {
  email: string
}

export interface DeleteUser_response {
  error: boolean,
  statusCode: number,
  message: string,
}
