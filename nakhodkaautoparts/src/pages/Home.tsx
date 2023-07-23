import React, {FC, useState} from 'react';
import {Dropdown, MenuProps, } from 'antd';
import {Navbar} from "../components/navbar";

type Props = {}
const Home = ({ } : Props) => {
    const [selectedModel, setSelectedModel] = useState<Model>({ key: 0, label: 'Models', makes: []})
    const [selectedMake, setSelectedMake] = useState<Make>({ key: 0, label: 'Makes' })
    const models: Model[] = [
        {
            key: 1,
            label: 'Toyota',
            makes: [{ key: 1, label: '86'}]
        },
        {
            key: 2,
            label: 'Honda',
            makes: [{ key: 1, label: 'Civic'}]
        },
        {
            key: 3,
            label: 'Mazda',
            makes: [{ key: 1, label: 'RX-6'}]
        },
    ];

    const onModelSelection: MenuProps['onClick'] = (item) => {
        const model = models.find((model: Model) => model.key === parseInt(item.key));
        if (model) {
            setSelectedModel(model);
            setSelectedMake({ key: 0, label: 'Makes'});
        }
    }

    const onMakeSelection: MenuProps['onClick'] = (item) => {
        const make = selectedModel.makes.find((make: Make) => make.key === parseInt(item.key));
        if (make) {
            setSelectedMake(make);
        }
    }

    return (
        <div>
            <div>
                <Dropdown menu={{ items: models, onClick: onModelSelection }}>
                    <div>{selectedModel.label}</div>
                </Dropdown>
                {!!selectedModel.makes.length && (
                    <Dropdown menu={{ items: selectedModel.makes, onClick: onMakeSelection }}>
                        <div>{selectedMake.label}</div>
                    </Dropdown>
                )}
            </div>
        </div>
    )
};
    export default Home;