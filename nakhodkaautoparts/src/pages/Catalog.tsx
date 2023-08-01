import React, { useMemo, useState } from 'react';
import { Card, Col, Row, Select, Layout, Radio } from 'antd';
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import carData from '../data/car-data.json';
import parts from '../data/parts.json';

const Catalog = () => {
    const [selectedModel, setSelectedModel] = useState<Model | undefined>(undefined);
    const [selectedMake, setSelectedMake] = useState<Make | undefined>(undefined);
    const [selectedYear, setSelectedYear] = useState<Year | undefined>(undefined);
    const [selectedEngine, setSelectedEngine] = useState<Engine | undefined>(undefined);
    const [selectedVin, setSelectedVin] = useState<Vin | undefined>(undefined);
    const [optionFrontBack, setOptionFrontBack] = useState<RadioOption>({ value: '' });
    const [optionLeftRight, setOptionLeftRight] = useState<RadioOption>({ value: '' });
    const [optionUpDown, setOptionUpDown] = useState<RadioOption>({ value: '' });

    const models: Model[] = carData;

    const filteredData = useMemo(() => { // TODO: filter by years and engines
        if (!selectedModel) return carData;
        if (!selectedMake) return [selectedModel]

        let temp = {...selectedModel};
        temp.makes = [selectedMake]; // filter out all makes except the selected one
        return [temp];

    }, [selectedModel, selectedMake, selectedYear, selectedEngine]);


    const optionsFrontBack = [
        { label: 'Любое', value: '' },
        { label: 'Перед', value: 'перед' },
        { label: 'Зад', value: 'зад' },
    ];

    const optionsLeftRight = [
        { label: 'Любое', value: '' },
        { label: 'Левое', value: 'лев' },
        { label: 'Правое', value: 'прав' },
    ];

    const optionsUpDown = [
        { label: 'Любое', value: '' },
        { label: 'Верх', value: 'верх' },
        { label: 'Низ', value: 'ниж' },
    ];

    const filteredParts = useMemo(() => {
        let newParts = parts;
        if (optionUpDown.value) {
            const rv = new RegExp(optionUpDown.value, '');
            newParts = newParts.filter(part => part.match(rv))
        }

        if (optionFrontBack.value) {
            const rv = new RegExp(optionFrontBack.value, '');
            newParts = newParts.filter(part => part.match(rv))
        }

        if (optionLeftRight.value) {
            const rv = new RegExp(optionLeftRight.value, '');
            newParts = newParts.filter(part => part.match(rv))
        }
        return newParts;
    }, [optionUpDown, optionFrontBack, optionLeftRight]);

    return (
        <Layout style={{paddingTop: '4vh'}}>
            <Sider width="30%" theme={"light"} style={{
                boxShadow: '5px 8px 24px 5px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                marginLeft: '50px',
                height: '85vh'
            }}>
                <Col style={{padding: "20px"}}>
                    <Row><label style={{fontSize: '20px'}}>Марка</label></Row>
                    <Row>
                        <Select
                            style={{width: '60%', margin: '20px'}}
                            size={"large"}
                            placeholder="Марка"
                            onChange={(value) => {
                                setSelectedModel(models.find((model) => model.key === parseInt(value))!);
                                setSelectedMake(undefined);
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
                    <Row><label style={{fontSize: '20px'}}>Модель</label></Row>
                    <Row>
                        <Select
                            disabled={!selectedModel || selectedModel?.key === 0}
                            style={{width: '60%', margin: '20px'}}
                            size={"large"}
                            placeholder="Модель"
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
                    <Row><label style={{fontSize: '20px'}}>Год</label></Row>
                    <Row>
                        <Select
                            disabled={!selectedMake || selectedMake?.key === 0}
                            style={{width: '60%', margin: '20px'}}
                            size={"large"}
                            placeholder="Год"
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
                    <Row style={{ justifyContent: "space-between"}}>
                        <div style={{ display: "flex", flexDirection: 'column', flexGrow: 1 }}>
                            <Row><label style={{fontSize: '20px'}}>Кузов</label></Row>
                            <Row>
                                <Select
                                    disabled={!selectedMake || selectedMake?.key === 0}
                                    style={{width: '60%', margin: '20px'}}
                                    size={"large"}
                                    placeholder="Кузов"
                                    onChange={(value) => {
                                        setSelectedVin(selectedMake?.vin?.find((vin) => vin.key === parseInt(value))!)
                                    }}
                                    value={selectedVin?.label || undefined}
                                >
                                    {selectedMake?.vin?.map((vin) => (
                                        <Select.Option key={vin.key} value={vin.key}>
                                            {vin.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Row>
                        </div>
                        <div style={{ display: "flex", flexDirection: 'column', flexGrow: 1 }}>
                            <Row><label style={{fontSize: '20px'}}>Двигатель</label></Row>
                            <Row>
                                <Select
                                    disabled={!selectedMake || selectedMake?.key === 0}
                                    style={{width: '60%', margin: '20px'}}
                                    size={"large"}
                                    placeholder="Двигатель"
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
                        </div>
                    </Row>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Row><label style={{fontSize: '20px'}}>Расположение</label></Row>
                        <Radio.Group
                            options={optionsFrontBack}
                            onChange={(e) => setOptionFrontBack({ value: e.target.value })}
                            value={optionFrontBack.value}
                            optionType="button"
                            buttonStyle="solid"
                            style={{ display: 'flex', padding: '20px', paddingBottom: '0' }}
                        />
                        <Radio.Group
                            options={optionsLeftRight}
                            onChange={(e) => setOptionLeftRight({ value: e.target.value })}
                            value={optionLeftRight.value}
                            optionType="button"
                            buttonStyle="solid"
                            style={{ display: 'flex', padding: '20px', paddingBottom: '0' }}
                        />
                        <Radio.Group
                            options={optionsUpDown}
                            onChange={(e) => setOptionUpDown({ value: e.target.value })}
                            value={optionUpDown.value}
                            optionType="button"
                            buttonStyle="solid"
                            style={{ display: 'flex', padding: '20px', paddingBottom: '0' }}
                        />
                    </div>
                </Col>
            </Sider>
            <Content style={{padding: '0 50px '}}>
                <div className="site-layout-content">
                    <Row gutter={16}>
                        {filteredData.map((item) => (
                            <React.Fragment key={`${item.label}-${item.key}`}>
                                {item.makes.map((make) => (
                                    <Col span={8} key={`${make.label}${make.key}`}>
                                        <Card
                                            hoverable
                                            cover={<img alt={make.label} src={'https://via.placeholder.com/300x200'}/>}
                                        >
                                            <Card.Meta title={item.label} description={make.label}  />
                                        </Card>
                                    </Col>
                                ))}
                            </React.Fragment>
                        ))}
                    </Row>
                </div>
            </Content>
            <Content style={{padding: '0 50px '}}>
                <div className="site-layout-content">
                    <Row gutter={16}>
                        {filteredParts.map((item) => (
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