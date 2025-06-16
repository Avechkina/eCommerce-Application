import { AboutCard } from '@components/AboutCard/AboutCard';
import { RSS, STACK, TEAM_INFO } from '@utils/constants';
import classes from './AboutView.module.css';

export const AboutView = () => {
  return (
    <>
      <h1 className={classes.h1}>FutureTech Team</h1>
      <ul className={classes.ul}>
        Our stack:
        <div>
          {STACK.map((element) => (
            <li key={element.name} className={classes.li}>
              <img
                src={element.img}
                alt={element.name}
                onClick={() => window.open(element.url, '_blank')}
              />
            </li>
          ))}
        </div>
      </ul>
      <div className={classes.wrapper}>
        {TEAM_INFO.map((memeber) => (
          <AboutCard
            name={memeber.name}
            key={memeber.name}
            image={memeber.image}
            role={memeber.role}
            city={memeber.city}
            contribution={memeber.contribution}
            github_url={memeber.github_url}
          />
        ))}
      </div>
      <div className={classes.div_rss}>
        <p>Thanks to RSSchool!</p>
        <img
          src={RSS.img}
          alt={RSS.name}
          onClick={() => window.open(RSS.url, '_blank')}
        />
      </div>
    </>
  );
};
