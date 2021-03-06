import styled from 'styled-components';

const StyledContainer = styled.div`
  border: 1px solid;
  border-radius: 4px;
  margin: 7px;
  padding: 10px;
  border-color: #c9c8a3;
`;

const ANoStyle = styled.a`
  color: inherit;
  text-decoration: inherit;
`;

export const Project = ({ title, desc, link, image }) => (
  <ANoStyle
    href={link}
    key={title}
    onClick={() => {
      window.fathom.trackGoal('5WUFFQCT', 0);
    }}
    rel="noopener noreferrer"
    target="_blank"
  >
    <StyledContainer>
      <h3>{title}</h3>
      <p>{desc}</p>
    </StyledContainer>
  </ANoStyle>
);
