import classes from './HomeView.module.css';

export const HomeView = () => {
  return (
    <>
      <div className={classes.hero_container}>
        <img
          src="./images/hero.png"
          alt="hero-image"
          className={classes.hero_image}
        />
        <div className={classes.hero_text}>
          Step Into Tomorrow: The Future Is Now.
        </div>
      </div>
      <p className={classes.p}>10% OFF all high-end products ($1,000+)</p>
    </>
  );
};
