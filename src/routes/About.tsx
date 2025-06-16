import { AboutCard } from '@components/AboutCard/AboutCard';
import { TEAM_INFO } from '@utils/constants';

const About = () => {
  return (
    <>
      <div
        style={{
          flex: 1,
        }}
      >
        <h1>About page</h1>
        {TEAM_INFO.map((memeber) => (
          <AboutCard
            name={memeber.name}
            image={memeber.image}
            description={memeber.description}
            github_url={memeber.github_url}
          />
        ))}
      </div>
    </>
  );
};

export default About;
