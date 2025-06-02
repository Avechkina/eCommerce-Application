// import { buildBreadcrumbMap } from '@utils/buildBreadcrumpMap';
import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router';

const breadcrumbMap: Record<string, string> = {
  '/catalog': 'Catalog',
  '/catalog/wearables': 'Wearables',
  '/catalog/wearables/smart-ar-gear': 'Smart AR Gear',
  '/catalog/wearables/biometric-accessories': 'Biometric Accessorie',
  '/catalog/transport': 'Transport',
  '/catalog/intelligence': 'Intelligence',
  '/catalog/intelligence/ai-assistants': 'AI Assistants',
  '/catalog/intelligence/predictive-tech': 'Predictive Tech',
  '/catalog/health': 'Nano-Medicine',
  '/catalog/immersive-tech': 'Immersive Tech',
  '/catalog/immersive-tech/holography': 'Holography',
  '/catalog/immersive-tech/gaming': 'Gaming',
  '/catalog/energy': 'Energy',
};

export const Breadcrumbs = () => {
  const location = useLocation();

  const getBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((elem) => elem);
    const breadcrumbs: Record<string, string>[] = [];

    pathnames.forEach((elem, index) => {
      const route: string = `/${pathnames.slice(0, index + 1).join('/')}`;
      breadcrumbs.push({
        key: route,
        title: breadcrumbMap[route] ? breadcrumbMap[route] : elem,
      });
    });
    console.log(breadcrumbs);
    return breadcrumbs;
  };

  return <Breadcrumb items={getBreadcrumbs()} />;
};
