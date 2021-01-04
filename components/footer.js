import React from 'react';
import styled from 'styled-components';

const ContactMe = styled.p`
  font-weight: bold;
  margin: 0;
`;

const FooterWrapper = styled.div`
  min-height: 145px;
  display: flex;
  justify-content: space-between;
  padding-top: 30px;

  @media (max-width: 460px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const FooterItems = styled.ul`
  display: flex;
  align-items: center;

  margin-bottom: 0;
  margin-left: 0;
  padding-bottom: 30px;
  padding-left: 0px;
  list-style: none;
  justify-content: center;
  li {
    margin-left: 12px;
    margin-right: 12px;
    a {
      text-decoration: none;
      color: #fff;
      font-size: 25px;
      &:hover {
        color: #ddd;
      }
    }
  }
`;

const EmailContainer = styled.address`
  font-style: normal;
  font-size: 20px;
  margin-top: 15px;
  margin-bottom: 50px;

  @media (max-width: 460px) {
    text-align: center;
  }
`;

const footer = () => (
  <FooterWrapper>
    <FooterItems>
      <li>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/jjroush/"
          rel="noopener noreferrer"
        >
          <img src="/linkedin.svg" alt="Linkedin Logo" />
        </a>
      </li>
      <li>
        <a
          target="_blank"
          href="https://twitter.com/jacob_roush"
          rel="noopener noreferrer"
        >
          <img src="/twitter.svg" alt="Twitter Logo" />
        </a>
      </li>
      <li>
        <a
          target="_blank"
          href="https://github.com/jjroush"
          rel="noopener noreferrer"
        >
          <img src="/github.svg" alt="Github Logo" />
        </a>
      </li>
    </FooterItems>
    <EmailContainer>
      <ContactMe>{'Contact Me:'}</ContactMe>
      {'jacob@roush.io'}
    </EmailContainer>
  </FooterWrapper>
);

export default footer;
