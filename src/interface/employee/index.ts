export type employeeDataType = {
    id: number;
    dept: string;
    name: string;
    phone: string;
    /**
     * 1为绑定，0为未绑定
     */
    status: boolean;
    workNum: number;
};
