import { AboutCard } from '@components/AboutCard/AboutCard';
import { TEAM_INFO } from '@utils/constants';
import classes from './AboutView.module.css';

export const AboutView = () => {
  return (
    <>
      <h1 className={classes.h1}>FutureTech Team</h1>
      <div className={classes.wrapper}>
        {TEAM_INFO.map((memeber) => (
          <AboutCard
            name={memeber.name}
            key={memeber.name}
            image={memeber.image}
            description={memeber.description}
            github_url={memeber.github_url}
          />
        ))}
      </div>
    </>
  );
};
