import React from 'react';
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import {MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './Home.css';

const Home = () => {
    return (
        <Layout>
            <Content>
                <MapContainer center={[42.857728752464155, 132.9592723961369]} zoom={16} scrollWheelZoom={false} style={{ width: "100%", height: "calc(100vh - 6rem)" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[42.857728752464155, 132.9592723961369]}>
                        <Popup>
                            A pretty CSS3 popup. <br/> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </Content>
        </Layout>
    );
}

export default Home;