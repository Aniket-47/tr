export interface DeactivateUser_request {
 userID:string
}

export interface DeactivateUser_response {
  error: boolean,
  statusCode: number,
  message: string,
}
