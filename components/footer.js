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
          href="https://www.linkedin.com/in/jjroush/"
          onClick={() => {
            window.fathom.trackGoal('5TPPRPMX', 0);
          }}
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="Linkedin Logo" src="/linkedin.svg" />
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/jacob_roush"
          onClick={() => {
            window.fathom.trackGoal('HTW2TSTI', 0);
          }}
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="Twitter Logo" src="/twitter.svg" />
        </a>
      </li>
      <li>
        <a
          href="https://github.com/jjroush"
          onClick={() => {
            window.fathom.trackGoal('AGGZKT9H', 0);
          }}
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="Github Logo" src="/github.svg" />
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
