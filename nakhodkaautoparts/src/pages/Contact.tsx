import React from 'react';
import Map from "../components/Map";
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const Contact = () => {
  return (
    <div>
        <div css={detailsContainerStyle}>
            <div css={phoneContainerStyle}>
                <div>
                    <span>Северный проспект, 65Б</span>
                    <br/>
                    <span>Находка, Приморский край</span>
                </div>
            </div>
            <div css={phoneContainerStyle}>
                <a href="tel:+74236634372">
                    +7 (4236) 63-43-72
                </a>
            </div>
            <div>
                Часы работы:
                <div>Понедельник - Воскресенье</div>
                <div>09:00 – 17:00</div>
            </div>
        </div>
      <Map />
    </div>
  );
}

export default Contact;

const phoneContainerStyle = css`
  display: flex;
  align-items: center;
`;

const detailsContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
