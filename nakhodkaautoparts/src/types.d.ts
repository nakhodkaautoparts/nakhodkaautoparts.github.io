type DataRow = {
    Model: string,
    Make: string,
    Year: string,
    Engine: string,
    Vin: string,
}

type Make = {
    key: number,
    label: string,
    models: Model[]
};

type Model = {
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