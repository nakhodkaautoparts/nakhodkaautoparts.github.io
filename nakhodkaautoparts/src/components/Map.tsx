import React, {useEffect, useRef, useState} from 'react';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { ReactComponent as Phone } from "../icons/phone.svg";
import { ReactComponent as Pin } from "../icons/pin-address.svg";
import { ReactComponent as Link } from "../icons/link.svg";
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const Map = () => {
    const [isReady, setIsReady] = useState(false);
    const defaultIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png",
        iconSize: [20, 30],
        iconAnchor: [10.5, 24],
        popupAnchor: [0, -10],
        shadowSize: [0, 0],
        shadowAnchor: [10, 10]
    });
    const markerRef = useRef<any>();

    useEffect(() => {
        if (isReady) {
            markerRef.current.openPopup();
        }
    }, [isReady]);

    return (
        <MapContainer
            center={[42.857728752464155, 132.9592723961369]}
            zoom={16}
            scrollWheelZoom={false}
            style={{ width: "100%", height: "400px" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                position={[42.857728752464155, 132.9592723961369]}
                icon={defaultIcon}
                ref={r => {
                    markerRef.current = r;
                    setIsReady(true);
                }}
            >
                <Popup>
                    <div>
                        <div css={phoneContainerStyle}>
                            <Pin css={pinIconStyle} />
                            <div>
                                <span>Северный проспект, 65Б</span>
                                <br/>
                                <span>Находка, Приморский край</span>
                            </div>
                        </div>
                        <div css={phoneContainerStyle}>
                            <Phone css={phoneIconStyle} />
                            <div>
                                <a href="tel:+74236634372" css={linkStyle}>
                                    +7 (4236) 63-43-72
                                </a>
                                <br />
                                <a href="tel:+79147091886" css={linkStyle}>
                                    +7 (914) 709-18-86
                                </a>
                            </div>
                        </div>
                        <div css={phoneContainerStyle}>
                            <Link css={linkIconStyle} />
                            <a href={"https://www.farpost.ru/user/autorazborkakpd"} css={linkStyle}>
                                Найдите нас на Фарпосте
                            </a>
                        </div>
                        <div>
                            Часы работы:
                            <div>Понедельник - Воскресенье</div>
                            <div>09:00 – 17:00</div>
                        </div>
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    )
};

export default Map;

const phoneContainerStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const pinIconStyle = css`
  margin-left: -5px;
  path {
    fill: #858585;
  }
`;

const phoneIconStyle = css`
  width: 20px;
  height: 20px;

  path {
    fill: #858585;
  }
`;

const linkStyle = css`
    :hover {
      text-decoration: underline;
    }
`;

const linkIconStyle = css`
  path {
    fill: #858585;
  }
`;