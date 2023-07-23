type Model = {
    key: number,
    label: string,
    makes: Make[]
};

type Make = {
    key: number,
    label: string,
    year?: Year[]
};

type Year = {
    key: number,
    label: string,
}