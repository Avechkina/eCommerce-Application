import { ReactElement } from 'react';
import classes from './Flexbox.module.css';

const Flexbox = ({ children }: { children: ReactElement }) => {
  return <div className={classes.flexbox}>{children}</div>;
};

export default Flexbox;
