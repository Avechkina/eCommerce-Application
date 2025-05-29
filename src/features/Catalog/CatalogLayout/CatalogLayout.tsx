import CatalogSidebar from '@features/Catalog/CatalogSidebar/CatalogSidebar';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router';

const CatalogLayout = () => {
  return (
    <Layout>
      <CatalogSidebar />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default CatalogLayout;
