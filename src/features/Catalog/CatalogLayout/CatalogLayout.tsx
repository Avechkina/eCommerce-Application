import { Breadcrumbs } from '@components/Breadcrumbs/Breadcrumbs';
import CatalogSidebar from '@features/Catalog/CatalogSidebar/CatalogSidebar';
import { Flex, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router';

const CatalogLayout = () => {
  return (
    <>
      <Breadcrumbs />
      <Layout>
        <Flex gap="middle">
          <CatalogSidebar />
          <Content>
            <Flex gap="middle" wrap>
              <Outlet />
            </Flex>
          </Content>
        </Flex>
      </Layout>
    </>
  );
};

export default CatalogLayout;
