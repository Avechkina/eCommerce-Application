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

  return (
    <div className={classes.burger_icon}>
      <Button type="primary" onClick={toggleCollapsed}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      {!collapsed && (
        <div className={classes.burger}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/product">Product</NavLink>
          <NavLink to="/about">About us</NavLink>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
