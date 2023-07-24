import React, {useState} from 'react';
import {Card, Col, Row, Select, Layout} from 'antd';
import {Content} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

type Props = {}
const Home = ({}: Props) => {
    const [selectedModel, setSelectedModel] = useState<Model>({key: 0, label: '', makes: []})
    const [selectedMake, setSelectedMake] = useState<Make>({key: 0, label: ''})
    const models: Model[] = [
        {
            key: 1,
            label: 'Toyota',
            makes: [{key: 1, label: '86'}]
        },
        {
            key: 2,
            label: 'Honda',
            makes: [{key: 1, label: 'Civic'}]
        },
        {
            key: 3,
            label: 'Mazda',
            makes: [{key: 1, label: 'RX-6'}]
        },
    ];

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

    return (
        <Layout style={{paddingTop: '6vh', minHeight: '100%'}}>
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
                                setSelectedMake({ key: 0, label: '' });
                            }}
                            value={selectedModel.label || undefined}
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
                            disabled={selectedModel.key === 0}
                            style={{width: '60%', margin: '20px'}}
                            size={"large"}
                            placeholder="Select a make"
                            onChange={(value) => {
                                setSelectedMake(selectedModel.makes.find((make) => make.key === parseInt(value))!)
                            }}
                            value={selectedMake.label || undefined}
                        >
                            {selectedModel.makes.map((make) => (
                                <Select.Option key={make.key} value={make.key}>
                                    {make.label}
                                </Select.Option>
                            ))}
                        </Select>
                    </Row>

                </Col>

            </Sider>
            <Content style={{padding: '0 50px'}}>
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
export default Home;