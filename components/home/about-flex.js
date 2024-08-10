import styles from '../../styles/aboutflex.module.css';
import { projects } from '../../data/projects';

import { Project } from './project-card';

const devYears = () => new Date().getFullYear() - 2016;

export const AboutFlex = () => (
  <div className={styles.flexContainer}>
    <div style={{flexBasis: 0, flexGrow: 1}}>
      <p>{`Based out of Des Moines, Iowa 🌽. I work as a Software Engineer at Pella Corp where I'm leading a mobile app team.`}</p>
      <p style={{display: "inline"}}>{`I've been writing code for `}</p><code>new Date().getFullYear() - 2016</code>
          <p style={{display: "inline"}}> years. At this point I dream in JavaScript. Node.js, React and Next.js are some of the technologies which I work with regularly. Whenever I learn something cool pertaining to developing, I enjoy sharing through my blog on the site.</p>
      <p>{"When not at the computer, I enjoy finding the balance between the art and science of cooking and brewing beer."}</p>
    </div>
    <div style={{flexBasis: 0, flexGrow: 1}}>
      <h1>{'Spotlight'}</h1>
      {projects.map((project) => (
        <Project key={project.title} {...project} />
      ))}
    </div>
  </div>
);
