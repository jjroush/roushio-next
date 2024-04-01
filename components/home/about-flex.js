import styles from '../../styles/aboutflex.module.css';
import { projects } from '../../data/projects';

import { Project } from './project-card';

const devYears = () => new Date().getFullYear() - 2016;

export const AboutFlex = () => (
  <div className={styles.flexContainer}>
    <div style={{flexBasis: 0, flexGrow: 1}}>
      <p>{`I'm based out of Des Moines, Iowa 🌽  and have been writing code for ${devYears()} years. I work as a Software Engineer at Pella Corp where I'm leading a mobile app team.`}</p>
      <p>
        {
          'I dream in JavaScript. Node.js, React and Next.js are some of the technologies which I work with regularly. Whenever I learn something cool pertaining to developing, I enjoy sharing through my blog on the site.'
        }
      </p>
      <p>
        {
          "When not at the computer, I enjoy cooking as well as brewing beer. There's a fun balance of art and science when it comes to cooking and brewing."
        }
      </p>
    </div>
    <div style={{flexBasis: 0, flexGrow: 1}}>
      <h1>{'Projects'}</h1>
      {projects.map((project) => (
        <Project key={project.title} {...project} />
      ))}
    </div>
  </div>
);
