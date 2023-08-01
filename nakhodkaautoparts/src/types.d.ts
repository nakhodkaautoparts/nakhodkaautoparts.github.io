type DataRow = {
    Model: string,
    Make: string,
    Year: string,
    Engine: string,
    Vin: string,
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
    vin?: Vin[]
};

type Year = {
    key: number,
    label: string,
}

type Engine = {
    key: number,
    label: string,
}

type Vin = {
    key: number,
    label: string,
}

type RadioOption = {
    value: string,
}