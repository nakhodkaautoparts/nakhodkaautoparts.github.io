type DataRow = {
    Model: string,
    Make: string,
    Year: string,
    Engine: string,
}

type Model = {
    key: number,
    label: string,
    makes: Make[]
};

type Make = {
    key: number,
    label: string,
    year?: Year[]
    engine?: Engine[]
};

type Year = {
    key: number,
    label: string,
}

type Engine = {
    key: number,
    label: string,
}