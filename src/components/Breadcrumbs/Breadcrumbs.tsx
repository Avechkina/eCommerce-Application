import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router';

export const Breadcrumbs = () => {
  const location = useLocation();

  const getBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((elem) => elem);
    const breadcrumbs: Record<string, string>[] = [];

    pathnames.forEach((elem, index) => {
      const route: string = `/${pathnames.slice(0, index - 1).join('/')}`;
      breadcrumbs.push({
        key: route,
        title: elem,
      });
    });

    return breadcrumbs;
  };

  return <Breadcrumb items={getBreadcrumbs()} />;
};
