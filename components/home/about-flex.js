import styled from 'styled-components';
import { Project } from './project-card';
import { projects } from '../../data/projects';

const FlexContainer = styled.div`
  display: flex;
`;

const FlexItem = styled.div`
  flex-grow: 1;
  flex-basis: 0;
`;

const devYears = () => new Date().getFullYear() - 2016;

export const AboutFlex = () => (
  <FlexContainer>
    <FlexItem>
      <h1>{'About'}</h1>
      <p>{`I'm a software engineer based out of Des Moines, Iowa 🌽..`}</p>
      <p>
        {`I dream in JavaScript. Node.js, React and Next.js are some of the technologies which I work with regularly.`}
      </p>
      <p>
        {
          "When I'm not at the computer, I enjoy cooking as well as brewing beer. There's a fun balance of art and science when it comes to cooking and brewing."
        }
      </p>
    </FlexItem>
    <FlexItem>
      <h1>{'Projects'}</h1>
      {projects.map((project) => (
        <Project key={project.title} {...project} />
      ))}
    </FlexItem>
  </FlexContainer>
);
