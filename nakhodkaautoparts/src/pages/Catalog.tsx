import React, {useEffect, useMemo, useState} from 'react';
import {Card, Col, Layout, Radio, Row, Select} from 'antd';
import {Content} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import carData from '../data/car-data.json';
import parts from '../data/parts.json';
import {useLocation} from "react-router-dom";
import queryString from 'query-string';
import Search from "antd/es/input/Search";
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import Fuse from 'fuse.js'
import { Helmet } from 'react-helmet';

const Catalog = () => {
    const location = useLocation();
    const keys = Object.keys(queryString.parse(location.search));
    const makes: Make[] = carData;
    const fuseOptions = {
        isCaseSensitive: false,
        threshold: 0.3,
    };

    const [selectedMake, setSelectedMake] = useState<Make | undefined>(makes.find((make) => keys.includes(make.label.toLowerCase())) || undefined);
    const [selectedModel, setSelectedModel] = useState<Model | undefined>(undefined);
    const [selectedYear, setSelectedYear] = useState<Year | undefined>(undefined);
    const [selectedEngine, setSelectedEngine] = useState<Engine | undefined>(undefined);
    const [selectedVin, setSelectedVin] = useState<Vin | undefined>(undefined);
    const [optionFrontBack, setOptionFrontBack] = useState<RadioOption>({ value: '' });
    const [optionLeftRight, setOptionLeftRight] = useState<RadioOption>({ value: '' });
    const [optionUpDown, setOptionUpDown] = useState<RadioOption>({ value: '' });
    const [filterOption, setFilterOption] = useState<string>('');

    const filteredData = useMemo(() => { // TODO: filter by years and engines
        if (!selectedMake) return carData;
        if (!selectedModel) return [selectedMake]

        let temp = {...selectedMake};
        temp.models = [selectedModel]; // filter out all makes except the selected one
        return [temp];

    }, [selectedMake, selectedModel, selectedYear, selectedEngine]);


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
        if (filterOption) {
            const fuse = new Fuse(newParts, fuseOptions);
            newParts = fuse.search(filterOption).map(item => item.item);
        }
        return newParts;
    }, [optionUpDown, optionFrontBack, optionLeftRight, filterOption]);

    return (
        <Layout style={{paddingTop: '4vh'}} css={layoutStyle}>
            <Helmet>
                <title>Каталог - Автозапчасти в Находке</title>
            </Helmet>
            <div css={siderContainerStyle}>
                <Sider theme={"light"} css={siderStyle} width={'100%'}>
                    <Col css={menuContainerStyle}>
                        <div css={dropdownContainerStyle}>
                            <Row><label css={labelStyle}>Марка</label></Row>
                            <Row>
                                <Select
                                    size={"large"}
                                    placeholder="Марка"
                                    onChange={(value) => {
                                        setSelectedMake(makes.find((make) => make.key === parseInt(value))!);
                                        setSelectedModel(undefined);
                                    }}
                                    value={selectedMake?.label || undefined}
                                    css={dropdownStyle}
                                >
                                    {makes.map((make) => (
                                        <Select.Option key={make.key} value={make.key}>
                                            {make.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Row>
                        </div>
                        <div css={dropdownContainerStyle}>
                            <Row><label css={labelStyle}>Модель</label></Row>
                            <Row>
                                <Select
                                    disabled={!selectedMake || selectedMake?.key === 0}
                                    css={dropdownStyle}
                                    size={"large"}
                                    placeholder="Модель"
                                    onChange={(value) => {
                                        setSelectedModel(selectedMake?.models.find((model) => model.key === parseInt(value))!)
                                        setSelectedYear(undefined);
                                        setSelectedEngine(undefined);
                                    }}
                                    value={selectedModel?.label || undefined}
                                >
                                    {selectedMake?.models.map((model) => (
                                        <Select.Option key={model.key} value={model.key}>
                                            {model.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Row>
                        </div>
                        <div css={dropdownContainerStyle}>
                            <Row><label css={labelStyle}>Кузов</label></Row>
                            <Row>
                                <Select
                                    disabled={!selectedModel || selectedModel?.key === 0}
                                    css={dropdownStyle}
                                    size={"large"}
                                    placeholder="Кузов"
                                    onChange={(value) => {
                                        setSelectedVin(selectedModel?.vin?.find((vin) => vin.key === parseInt(value))!)
                                    }}
                                    value={selectedVin?.label || undefined}
                                >
                                    {selectedModel?.vin?.map((vin) => (
                                        <Select.Option key={vin.key} value={vin.key}>
                                            {vin.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Row>
                        </div>
                        <div css={dropdownContainerStyle}>
                            <Row><label css={labelStyle}>Двигатель</label></Row>
                            <Row>
                                <Select
                                    disabled={!selectedModel || selectedModel?.key === 0}
                                    css={dropdownStyle}
                                    size={"large"}
                                    placeholder="Двигатель"
                                    onChange={(value) => {
                                        setSelectedEngine(selectedModel?.engine?.find((engine) => engine.key === parseInt(value))!)
                                    }}
                                    value={selectedEngine?.label || undefined}
                                >
                                    {selectedModel?.engine?.map((engine) => (
                                        <Select.Option key={engine.key} value={engine.key}>
                                            {engine.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Row>
                        </div>
                        <div css={dropdownContainerStyle}>
                            <Row><label css={labelStyle}>Год</label></Row>
                            <Row>
                                <Select
                                    disabled={!selectedModel || selectedModel?.key === 0}
                                    css={dropdownStyle}
                                    size={"large"}
                                    placeholder="Год"
                                    onChange={(value) => {
                                        setSelectedYear(selectedModel?.year?.find((year) => year.key === parseInt(value))!)
                                    }}
                                    value={selectedYear?.label || undefined}
                                >
                                    {selectedModel?.year?.map((year) => (
                                        <Select.Option key={year.key} value={year.key}>
                                            {year.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Row>
                        </div>
                        <div css={dropdownContainerStyle}>
                            <Row><label css={labelStyle}>Расположение</label></Row>
                            <Radio.Group
                                options={optionsFrontBack}
                                onChange={(e) => setOptionFrontBack({ value: e.target.value })}
                                value={optionFrontBack.value}
                                optionType="button"
                                buttonStyle="solid"
                                css={radioStyle}
                            />
                            <Radio.Group
                                options={optionsLeftRight}
                                onChange={(e) => setOptionLeftRight({ value: e.target.value })}
                                value={optionLeftRight.value}
                                optionType="button"
                                buttonStyle="solid"
                                css={radioStyle}
                            />
                            <Radio.Group
                                options={optionsUpDown}
                                onChange={(e) => setOptionUpDown({ value: e.target.value })}
                                value={optionUpDown.value}
                                optionType="button"
                                buttonStyle="solid"
                                css={radioStyle}
                            />
                        </div>
                    </Col>
                </Sider>
            </div>
            <Content css={rightSectionStyle}>
                <h2>Модели</h2>
                <div className="site-layout-content">
                    <Row gutter={16}>
                        {filteredData.map((make) => ( // TODO: for every year and engine
                            <React.Fragment key={`${make.label}-${make.key}`}>
                                {make.models.map((model) => (
                                    <Col span={8} key={`${model.label}${model.key}`}>
                                        <Card title={make.label}>
                                            <Card.Meta description={model.label} />
                                        </Card>
                                    </Col>
                                ))}
                            </React.Fragment>
                        ))}
                    </Row>
                </div>
                <div css={partsHeaderStyle}>
                    <h2>Запчасти</h2>
                    <Search
                        placeholder="Поиск запчастей"
                        size="middle"
                        onSearch={(value: string, e: React.ChangeEvent |React.KeyboardEvent | React.MouseEvent|undefined) => {setFilterOption(value)}}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setFilterOption(event.target.value)}}
                    />
                </div>

                <div className="site-layout-content">
                    <Row gutter={16}>
                        {filteredParts.map((item) => (
                            <Col span={8} key={item}>
                                <p css={partLabelStyle}>{item}</p>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Content>
        </Layout>
    )
};
export default Catalog;

const partsHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  > span {
    width: 250px;
  }
`;

const partLabelStyle = css`
  text-transform: capitalize;
`;

const siderContainerStyle = css`
  height: 85vh;
  width: 30%;
  margin-left: 50px;

  @media (max-width: 1200px) {
    height: 100%;
    width: 80%;
    margin: auto;
  }
`;

const siderStyle = css`
  box-shadow: 5px 8px 24px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const menuContainerStyle = css`
  padding: 20px;
  @media (max-width: 1200px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 780px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
`;

const layoutStyle = css`
  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column !important;
  }
`;

const rightSectionStyle = css`
  padding: 0 50px;
  @media (max-width: 1200px) {
    width: 100% !important;
  }
`;

const labelStyle = css`
  font-size: 20px;

  @media (max-width: 1200px) {
    font-size: 14px;
  }
`;

const dropdownContainerStyle = css`
  display: flex;
  flex-direction: column;
  
`;

const dropdownStyle = css`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    margin-right: 20px;
  }
`;

const radioStyle = css`
  display: flex;
  padding: 20px 0 0;
  >label {
    flex-grow: 1;
    flex-basis: 0;
  }
`;