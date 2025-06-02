import CatalogSidebar from '@features/Catalog/CatalogSidebar/CatalogSidebar';
import { Flex, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router';
import classes from './CatalogLayout.module.css';
import SearchProducts from '@components/SearchProducts/SearchProducts';

const CatalogLayout = () => {
  return (
    <Layout className={classes.main}>
      <Flex gap="middle">
        <CatalogSidebar />
        <Content>
          <div className={classes.top_bar_container}>
            <SearchProducts />
          </div>
          <Flex gap="middle" wrap>
            <Outlet />
          </Flex>
        </Content>
      </Flex>
    </Layout>
  );
};

export default CatalogLayout;
