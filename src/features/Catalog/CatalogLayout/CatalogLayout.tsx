import { Breadcrumbs } from '@components/Breadcrumbs/Breadcrumbs';
import CatalogSidebar from '@features/Catalog/CatalogSidebar/CatalogSidebar';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router';
import Flexbox from '@components/Flexbox/Flexbox';
import classes from './CatalogLayout.module.css';
import SearchProducts from '@components/SearchProducts/SearchProducts';
import { useScreenSize } from '@features/hooks/useScreenSize';

const CatalogLayout = () => {
  const { isMobile } = useScreenSize();

  return (
    <>
      <Breadcrumbs />
      <Layout>
        <CatalogSidebar />
        <Content>
          <div
            className={classes.top_bar_container}
            style={isMobile ? { margin: '16px 0' } : { marginBottom: 16 }}
          >
            <SearchProducts />
          </div>
          <Flexbox>
            <Outlet />
          </Flexbox>
        </Content>
      </Layout>
    </>
  );
};

export default CatalogLayout;
