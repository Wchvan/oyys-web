export const getEndDay = () => {
    const time = new Date();
    const year = time.getFullYear(); //年
    const month = ('0' + (time.getMonth() + 1)).slice(-2); //月
    const day = ('0' + time.getDate() + 1).slice(-2); //日
    return year + '-' + month + '-' + day;
};

export const getMonth = (date: Date) => {
    const time = new Date(date);
    const year = time.getFullYear(); //年
    const month = ('0' + (time.getMonth() + 1)).slice(-2); //月
    return year + '-' + month;
};
