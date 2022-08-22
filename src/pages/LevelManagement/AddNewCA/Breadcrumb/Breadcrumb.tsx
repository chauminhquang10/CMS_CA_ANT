import BreadcrumbCustom from '@/components/BreadCrumb';
import type { BreadcrumbProps, PageHeaderProps } from 'antd';
import { Breadcrumb } from 'antd';
import type { ReactChild, ReactFragment, ReactPortal } from 'react';

const BuildBreadcrumbAddNewCA = (value: PageHeaderProps) => {
  const breadcrumb = value.breadcrumb;
  const { routes } = breadcrumb as BreadcrumbProps;

  return (
    <>
      <BreadcrumbCustom>
        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        {routes &&
          routes.map(
            (item: {
              breadcrumbName: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined;
              path: string;
            }) => {
              return (
                <Breadcrumb.Item key={`key-${item.breadcrumbName}`}>
                  <a href={item.path}> {item.breadcrumbName}</a>
                </Breadcrumb.Item>
              );
            },
          )}
      </BreadcrumbCustom>
    </>
  );
};

export default BuildBreadcrumbAddNewCA;
