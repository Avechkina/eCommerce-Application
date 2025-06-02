import CatalogSidebar from '@features/Catalog/CatalogSidebar/CatalogSidebar';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router';
import Flexbox from '@components/Flexbox/Flexbox';

const CatalogLayout = () => {
  return (
    <Layout>
      <CatalogSidebar />
      <Content>
        <Flexbox>
          <Outlet />
        </Flexbox>
      </Content>
    </Layout>
  );
};

export default CatalogLayout;
