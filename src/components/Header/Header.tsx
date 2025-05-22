import Navigation from '@components/Navigation/Navigation';
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <Navigation />
    </header>
  );
};

export default Header;
