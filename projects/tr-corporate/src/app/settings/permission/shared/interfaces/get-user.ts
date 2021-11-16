export interface GetUser_request {
  userID: string
}

export interface GetUser_response {
  error: boolean,
  statusCode: number,
  message: string,
  data: {
    firstname: string,
    middlename: string,
    lastname: string,
    roletypeid: number
  }
}
