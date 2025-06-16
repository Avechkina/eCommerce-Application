import { AboutCard } from "@components/AboutCard/AboutCard";

const About = () => {
  return (
    <>
      <div
        style={{
          flex: 1,
        }}
      >
        <h1>About page</h1>
        <AboutCard 
          name="Test"
          image=""
          description="Lorem ipsum"
          github_url="https://github.com/Avechkina"
        />
      </div>
    </>
  );
};

export default About;
