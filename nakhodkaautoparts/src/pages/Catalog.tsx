import React, {useEffect, useMemo, useState} from 'react';
import {Card, Col, Row, Select, Layout} from 'antd';
import {Content} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Papa from "papaparse";

type Props = {}
const Catalog = ({}: Props) => {
    const [selectedModel, setSelectedModel] = useState<Model | undefined>(undefined);
    const [selectedMake, setSelectedMake] = useState<Make | undefined>(undefined);
    const [selectedYear, setSelectedYear] = useState<Year | undefined>(undefined);
    const [selectedEngine, setSelectedEngine] = useState<Engine | undefined>(undefined);
    const [parsedData, setParsedData] = useState<DataRow[]>([]);

    useEffect(() => {
        const data = localStorage.getItem('parsedData');
        const dueTime = localStorage.getItem('dueParsedData');
        const now = Date.now();
        if (data && now && dueTime && now <= parseInt(dueTime)) {
            setParsedData(JSON.parse(data));
        } else {
            const csvFilePath = require("../csvs/car-test.csv");
            Papa.parse(csvFilePath, {
                header: true,
                download: true,
                skipEmptyLines: true,
                complete: (result: { data: DataRow[] }) => {
                    setParsedData(result.data);
                    localStorage.setItem('dueParsedData', (now + (2 * 60 * 60 * 1000)).toString());
                }
            });
        }
    }, []);

    const models: Model[] = useMemo(() => {
        const data = localStorage.getItem('models');

        if (data && !!JSON.parse(data).length) {
            return JSON.parse(data);
        }

        const models: Model[] = [];
        parsedData.forEach((row, index) => {
            const existingModel = models.find(model => model.label === row.Model);
            if (existingModel) {
                const existingMake = existingModel.makes.find(make => make.label === row.Make);
                if (existingMake) {
                    // Assuming that year and engine is always passed
                    const existingYear = existingMake.year?.find(year => year.label === row.Year);
                    const existingEngine = existingMake.engine?.find(engine => engine.label === row.Engine);
                    if (!existingYear) {
                        const newYear: Year = {
                            key: existingMake.year?.length ? existingMake.year.length + 1 : 1,
                            label: row.Year,
                        }
                        existingMake.year?.push(newYear);
                    }

                    if (!existingEngine) {
                        const newEngine: Engine = {
                            key: existingMake.engine?.length ? existingMake.engine.length + 1 : 1,
                            label: row.Engine,
                        }
                        existingMake.engine?.push(newEngine);
                    }
                } else {
                    const newMake: Make = {
                        key: existingModel.makes.length + 1,
                        label: row.Make,
                        year: [{key: 1, label: row.Year}],
                        engine: [{key: 1, label: row.Engine}],
                    }
                    existingModel.makes.push(newMake);
                }
            } else {
                const make: Make = {
                    key: 1,
                    label: row.Make,
                    year: [{key: 1, label: row.Year}],
                    engine: [{key: 1, label: row.Engine}],

                }
                const model: Model = {
                    key: index + 1,
                    label: row.Model,
                    makes: [make]
                }
                models.push(model);
            }
        })

        localStorage.setItem('models', JSON.stringify(models))
        return models;
    }, [parsedData]);

    return (
        <Layout style={{paddingTop: '4vh'}}>
            <Sider width="30%" theme={"light"} style={{
                boxShadow: '5px 8px 24px 5px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                marginLeft: '50px',
                height: '70vh'
            }}>
                <Col style={{padding: "20px"}}>
                    <Row><label style={{fontSize: '20px', margin: '20px'}}>Select a car</label></Row>
                    <Row>
                        <Select
                            style={{width: '60%', margin: '20px'}}
                            size={"large"}
                            placeholder="Select a model"
                            onChange={(value) => {
                                setSelectedModel(models.find((model) => model.key === parseInt(value))!);
                                setSelectedMake({key: 0, label: ''});
                            }}
                            value={selectedModel?.label || undefined}
                        >
                            {models.map((model) => (
                                <Select.Option key={model.key} value={model.key}>
                                    {model.label}
                                </Select.Option>
                            ))}
                        </Select>
                    </Row>
                    <Row><label style={{fontSize: '20px', margin: '20px'}}>Select a make</label></Row>
                    <Row>
                        <Select
                            disabled={selectedModel?.key === 0}
                            style={{width: '60%', margin: '20px'}}
                            size={"large"}
                            placeholder="Select a make"
                            onChange={(value) => {
                                setSelectedMake(selectedModel?.makes.find((make) => make.key === parseInt(value))!)
                                setSelectedYear(undefined);
                                setSelectedEngine(undefined);
                            }}
                            value={selectedMake?.label || undefined}
                        >
                            {selectedModel?.makes.map((make) => (
                                <Select.Option key={make.key} value={make.key}>
                                    {make.label}
                                </Select.Option>
                            ))}
                        </Select>
                    </Row>
                    <Row><label style={{fontSize: '20px', margin: '20px'}}>Select a year</label></Row>
                    <Row>
                        <Select
                            disabled={selectedMake?.key === 0}
                            style={{width: '60%', margin: '20px'}}
                            size={"large"}
                            placeholder="Select a year"
                            onChange={(value) => {
                                setSelectedYear(selectedMake?.year?.find((year) => year.key === parseInt(value))!)
                            }}
                            value={selectedYear?.label || undefined}
                        >
                            {selectedMake?.year?.map((year) => (
                                <Select.Option key={year.key} value={year.key}>
                                    {year.label}
                                </Select.Option>
                            ))}
                        </Select>
                    </Row>
                    <Row><label style={{fontSize: '20px', margin: '20px'}}>Select an engine</label></Row>
                    <Row>
                        <Select
                            disabled={selectedMake?.key === 0}
                            style={{width: '60%', margin: '20px'}}
                            size={"large"}
                            placeholder="Select an engine"
                            onChange={(value) => {
                                setSelectedEngine(selectedMake?.engine?.find((engine) => engine.key === parseInt(value))!)
                            }}
                            value={selectedEngine?.label || undefined}
                        >
                            {selectedMake?.engine?.map((engine) => (
                                <Select.Option key={engine.key} value={engine.key}>
                                    {engine.label}
                                </Select.Option>
                            ))}
                        </Select>
                    </Row>

                </Col>

            </Sider>
            <Content style={{padding: '0 50px '}}>
                <div className="site-layout-content">
                    <Row gutter={16}>
                        {galleryItems.map((item) => (
                            <Col span={8} key={item.id}>
                                <Card
                                    hoverable
                                    cover={<img alt={item.title} src={item.imageUrl}/>}
                                >
                                    <Card.Meta title={item.title} description={item.description}/>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Content>
        </Layout>
    )
};
export default Catalog;

const galleryItems = [
    {
        id: 1,
        title: 'Item 1',
        imageUrl: 'https://via.placeholder.com/300x200',
        description: 'Description for item 1',
    },
    {
        id: 2,
        title: 'Item 2',
        imageUrl: 'https://via.placeholder.com/300x200',
        description: 'Description for item 2',
    },
    {
        id: 3,
        title: 'Item 3',
        imageUrl: 'https://via.placeholder.com/300x200',
        description: 'Description for item 3',
    },
    // Add more items as needed
];