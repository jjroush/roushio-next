import styles from '../../styles/aboutflex.module.css';
import { projects } from '../../data/projects';

import { Project } from './project-card';

const devYears = () => new Date().getFullYear() - 2016;

export const AboutFlex = () => (
  <div className={styles.flexContainer}>
    <div style={{flexBasis: 0, flexGrow: 1}}>
      <p>{`I'm a Software Engineering Team Lead at Pella Corp. Fullstack JavaScript is my expertise, but enjoy learning new technologies to best solve new business problems.`}</p>
        <p>{`From time to time I like to share those learnings here.`}</p>
    </div>
    <div style={{flexBasis: 0, flexGrow: 1}}>
      <h1>{'Spotlight'}</h1>
      {projects.map((project) => (
        <Project key={project.title} {...project} />
      ))}
    </div>
  </div>
);
