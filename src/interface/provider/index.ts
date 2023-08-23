export type providerType = {
    address: string;
    id: number;
    manager: string;
    name: string;
    phone: string;
    status: boolean;
};

export type activeProviderType = {
    address: string;
    id: number;
    manager: string;
    name: string;
    phone: string;
    score: string;
    status: boolean;
    avg: number;
    num: number;
};

export type comboType = {
    description: string;
    flavor: string;
    id: number;
    image: string;
    name: string;
    status: boolean;
    weight: string;
};

export type comboDetailType = comboType & {
    supplierName: string;
};

export type resDataType = {
    provider: string;
    date: string;
    url: string;
    manager: string;
    QR: string;
};
