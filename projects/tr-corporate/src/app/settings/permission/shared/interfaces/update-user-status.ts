export interface UpdateUserStatus_request {
  status: number,
  email: string
}

export interface UpdateUserStatus_response {
  error: boolean,
  statusCode: number,
  message: string,
}
