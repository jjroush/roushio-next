import styled from "styled-components";

const StyledContainer = styled.div`
  border: 1px solid;
  border-radius: 4px;
  margin: 7px;
  padding: 10px;
  border-color: #c9c8a3;
`;

export const Project = ({ title, desc, link, image }) => (
  <StyledContainer>
    <a href={link} key={title}>
      <h3>{title}</h3>
      <p>{desc}</p>
    </a>
  </StyledContainer>
);
