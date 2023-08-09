/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

import { Link } from "react-router-dom";
import 'leaflet/dist/leaflet.css';

import './Home.css';
import Map from "../components/Map";
import carData from '../data/car-data.json';
import {Helmet} from "react-helmet";

const Home = () => {
    return (
        <Layout css={layoutStyle}>
            <Helmet>
                <title>Автозапчасти в Находке</title>
            </Helmet>
            <Content css={contentStyle}>
                <div css={partsContainerStyle}>
                    <Link to={'/catalog'}>Каталог запчастей</Link>
                    <div css={carLabelsContainerStyle}>
                        {carData.map(car => (
                            <Link key={car.label} to={`/catalog?${car.label.toLowerCase()}`}>{car.label}</Link>
                        ))}
                    </div>
                </div>
                <div>
                    <p>
                        Для того чтобы мы могли оказать Вам услуги Вашего автомобиля, необходимо позвонить нам по контактным
                        телефонам и согласовать время прибытия.
                    </p>
                    <Map />
                </div>
            </Content>
        </Layout>
    );
}

export default Home;

const layoutStyle = css`
  height: 100%;
`;

const contentStyle = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const partsContainerStyle = css`
  padding-top: 50px;
`;

const carLabelsContainerStyle = css`
  display: grid;
  grid-template: "a a a";
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  
  a {
    color: black;
    text-decoration: underline;
    :hover {
      color: #1677ff;
    }
  }
`;