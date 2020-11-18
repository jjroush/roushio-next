export const Project = ({title, desc, link, image}) => (
    <a href={link} key={title}>
        <div>
            <h3>{title}</h3>
            <p>{desc}</p>
        </div>
    </a>
);