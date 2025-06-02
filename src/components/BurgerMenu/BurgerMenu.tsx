import React, { useState } from 'react';
import classes from './BurgerMenu.module.css';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { NavLink } from 'react-router';

const BurgerMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleLinkClick = () => {
    setCollapsed(true);
  };

  return (
    <>
      <div className={classes.burger_icon}>
        <Button type="primary" onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      {!collapsed && (
        <div className={classes.burger}>
          <NavLink className={classes.link} to="/" onClick={handleLinkClick}>
            Home
          </NavLink>
          <NavLink
            className={classes.link}
            to="/catalog"
            onClick={handleLinkClick}
          >
            Catalog
          </NavLink>
          <NavLink
            className={classes.link}
            to="/about"
            onClick={handleLinkClick}
          >
            About us
          </NavLink>
        </div>
      )}
    </>
  );
};

export default BurgerMenu;
