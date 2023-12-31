export type reviewType = {
    comment: string;
    id: number;
    image: string[];
    name: string;
    setName: string;
    star: number;
    time: string;
};

export type searchFormType = {
    setName?: string;
    page: number;
    pageSize: number;
    supplierId?: number;
};

export type setInfoType = {
    setName: string;
    supplierId: number;
    supplierName: string;
};
