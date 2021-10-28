export interface Register_request {
  firstname: string,
  middlename: string,
  lastname: string,
  email: "user@example.com",
  userpassword: string,
  name: string,
  accounttypeid: 1 | 2 | 3
}
export interface Register_response {
  error: boolean,
  statusCode: number,
  message: string,
  data: {
    name: string,
    firstname: string,
    middlename: string,
    lastname: string,
    accounttypeid: 1 | 2 | 3
  }
}

export interface Register_error {
  error: boolean,
  statusCode: number,
  message: string
}

