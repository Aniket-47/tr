export interface Iauth {
    stepper: {
        active: number;
        stepList: string[],
        showStepper: boolean;
    },
    roles: {id: number, name: string}[]
}
