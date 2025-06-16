import { GithubOutlined } from '@ant-design/icons';
import classes from './AboutCard.module.css'

export type TAboutCardProps = {
  image: string;
  name: string;
  description: string;
  github_url: string;
}

export function AboutCard(props: TAboutCardProps) {
  const { image, name, description, github_url } = props;

  return (
    <>
      <div className={classes.about_card}>
        <div className={classes.about_card_image}>
          <img src={image} alt={`${name} image`} />
        </div>
        <div className={classes.about_card_info}>
          <div className={classes.about_card_title}>{name}</div>
          <div className={classes.about_card_description}>{description}</div>
          <GithubOutlined href={`${github_url}`} target='blank'/>
        </div>
      </div>
    </>
  );
}
