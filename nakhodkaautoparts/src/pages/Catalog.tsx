import React, { useState } from 'react';
import { Card, Col, Row, Select, Layout } from 'antd';
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import carData from '../data/car-data.json';
import parts from '../data/parts.json';

const Catalog = () => {
    const [selectedModel, setSelectedModel] = useState<Model | undefined>(undefined);
    const [selectedMake, setSelectedMake] = useState<Make | undefined>(undefined);
    const [selectedYear, setSelectedYear] = useState<Year | undefined>(undefined);
    const [selectedEngine, setSelectedEngine] = useState<Engine | undefined>(undefined);

    const models: Model[] = carData;

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
                        {parts.map((item) => (
                            <Col span={8} key={item}>
                                <Card
                                    hoverable
                                    cover={<img alt={item} src={'https://via.placeholder.com/300x200'}/>}
                                >
                                    <Card.Meta title={item} description={item}  />
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