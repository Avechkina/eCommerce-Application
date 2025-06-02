import CatalogSidebar from '@features/Catalog/CatalogSidebar/CatalogSidebar';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router';
import Flexbox from '@components/Flexbox/Flexbox';
import classes from './CatalogLayout.module.css';
import SearchProducts from '@components/SearchProducts/SearchProducts';

const CatalogLayout = () => {
  return (
    <Layout>
      <CatalogSidebar />
      <Content>          
        <div className={classes.top_bar_container}>
          <SearchProducts />
        </div>
        <Flexbox>
          <Outlet />
        </Flexbox>
      </Content>
    </Layout>
  );
};

export default CatalogLayout;
