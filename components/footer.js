import React from 'react';

import styles from './footer.module.css';

const ContactMe = {
  fontWeight: 'bold',
  margin: 0,
};

const footer = () => {
    return (
        <div className={styles.FooterWrapper}>
            <ul className={styles.FooterItems}>
            <li>
                <a
                    href="https://www.linkedin.com/in/jjroush/"
                    onClick={() => {
                        window.fathom.trackGoal('5TPPRPMX', 0);
                    }}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <img alt="Linkedin Logo" src="/linkedin.svg"/>
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
                    <img alt="Twitter Logo" src="/twitter.svg"/>
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
                    <img alt="Github Logo" src="/github.svg"/>
                </a>
            </li>
        </ul>
        <div className={styles.EmailContainer}>
            <div style={ContactMe}>{'Contact Me:'}</div>
            {'hello@roush.io'}
        </div>
    </div>
    );
};

export default footer;
