export interface Login_request {
  email: string,
  password: string
}
export interface Login_response {

  error: boolean,
  statuscode: number,
  message: string,
  data: {
    clientuniqueid: string,
    accesstoken: {
      token: string
      expiry: string,
      expiryTS: number
    },
    refreshtoken: {
      token: string,
      expiry: string,
      expiryTS: number
    }
  }

}
