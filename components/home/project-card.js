const StyledContainer = {
    border: '1px solid',
    borderRadius: '4px',
    margin: '7px',
    padding: '10px',
    borderColor: '#c9c8a3',
};

export const Project = ({ title, desc, link, image }) => (
  <a
    href={link}
    key={title}
    onClick={() => {
      window.fathom.trackGoal('5WUFFQCT', 0);
    }}
    rel="noopener noreferrer"
    style={{ color: 'inherit', textDecoration: 'inherit' }}
    target="_blank"
  >
    <div style={StyledContainer}>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  </a>
);
