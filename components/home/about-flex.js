import styled from 'styled-components'
import {Project} from './project-card'
import {projects} from '../../data/projects'
 
const FlexContainer = styled.div`
    display: flex;
`;

const FlexItem = styled.div`
    flex-grow: 1;
    flex-basis: 0;
`;

export const AboutFlex = () => (
    <FlexContainer>
    <FlexItem>
      <h1>{'Timeline'}</h1>
      <h2>{'2020'}</h2>
        <ul>
          <li>{'Moved to Des Moines, Iowa.'}</li>
          <li>{'Started working as a Software Engineer at Hy-Vee fulltime.'}</li>
          <li>{'Graduated from Iowa State University.'}</li>
        </ul>
      <h2>{'2019'}</h2>
      <ul>
        <li>{'Visited Ireland '}</li>
        <li>{'Particpated in my first first hackathon.'}</li>
        <li>{'MIS Club President: Had the chance to connect students with professionals.'}</li>
      </ul>
      <h2>{'2018'}</h2>
      <ul>
        <li>{'Started my internship with Hy-Vee.'}</li>
        <li>{'Particpated in my first hackathon.'}</li>
        <li>{'Wrote my first Node.js script which I used to scrape Nvidia\'s website for available products.'}</li>
      </ul>
    </FlexItem>
    <FlexItem>
      <h1>{'Projects'}</h1>
        <div>{'Worker Thread Hash Cracker Node'}</div>
        <div>{'Radio Meta Websocket Server'}</div>
        <div>{'Spotify Crowdsourced DJ: Hackathon Project'}</div>
        {projects.map(project => (<Project {...project} />))}
    </FlexItem>
  </FlexContainer>
);