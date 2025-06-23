import { GithubOutlined } from '@ant-design/icons';
import classes from './AboutCard.module.css';

export type TAboutCardProps = {
  image: string;
  name: string;
  role: string;
  city: string;
  contribution: string[];
  github_url: string;
};

export function AboutCard(props: TAboutCardProps) {
  const { image, name, city, github_url, contribution, role } = props;

  return (
    <div className={classes.about_card}>
      <div className={classes.about_card_image}>
        <img src={image} alt={`${name} image`} />
      </div>
      <div className={classes.about_card_info}>
        <div className={classes.about_card_name}>{name}</div>
        <div className={classes.about_card_role}>{role}</div>
        <div className={classes.about_card_description}>
          <div className={classes.about_card_role}>{city}</div>
          <ul className={classes.ul}>
            {' '}
            Contribution:
            {contribution.map((element) => (
              <li className={classes.li} key={element}>
                {element}
              </li>
            ))}
          </ul>
        </div>
        <a href={`${github_url}`} target="blank">
          <GithubOutlined style={{ fontSize: 30 }} />
        </a>
      </div>
    </div>
  );
}
