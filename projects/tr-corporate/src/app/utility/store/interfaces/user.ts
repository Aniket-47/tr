export interface Iuser {
    name: string;
    accountIDs: { accountid: string; name: string; }[];
    isLoggedIn: boolean;
}