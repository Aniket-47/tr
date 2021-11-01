export interface AccountList_response {
  error: true,
  statuscode: number,
  message: string,
  data: [
    {
      accountid: string,
      name: string
    }
  ]
}
