import React, { useEffect, useRef, useState } from 'react';
import classes from './BurgerMenu.module.css';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { NavLink } from 'react-router';

const BurgerMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleLinkClick = () => {
    setCollapsed(true);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setCollapsed(true);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className={classes.burger_icon}>
      <Button type="primary" onClick={toggleCollapsed}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      {!collapsed && (
        <div className={classes.burger}>
          <NavLink to="/" onClick={handleLinkClick}>
            Home
          </NavLink>
          <NavLink to="/shop" onClick={handleLinkClick}>
            Shop
          </NavLink>
          <NavLink to="/product" onClick={handleLinkClick}>
            Product
          </NavLink>
          <NavLink to="/about" onClick={handleLinkClick}>
            About us
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
