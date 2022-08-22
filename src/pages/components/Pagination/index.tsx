import PaginationCustom from '@/components/Pagination';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Divider, Row, Typography } from 'antd';
import React from 'react';

const CodePreview: React.FC = ({ children }) => (
  <pre
    style={{
      whiteSpace: 'nowrap',
      width: '100%',
      fontSize: '12px',
      margin: '6px 0px',
      padding: '0px 0px',
      background: '#fff',
    }}
  >
    <code>
      <Typography.Text code type="secondary" copyable>
        {children}
      </Typography.Text>
    </code>
  </pre>
);

const ProcessComponent: React.FC = () => {
  const [current, setCurrent] = React.useState(1);
  const pageSizeRef = React.useRef(10);
  return (
    <PageContainer>
      <Card>
        <Divider orientation="left">Pagination</Divider>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={12}>
            <PaginationCustom
              total={1000}
              current={current}
              showTotal={(total, range) =>
                `Từ ${range[0]} đến ${range[1]} trên tổng số ${total} kết quả`
              }
              defaultPageSize={pageSizeRef.current}
              onChange={(newCurrent, newPageSize) => {
                const pageSizeChange = pageSizeRef.current !== newPageSize;

                if (pageSizeChange) {
                  setCurrent(1);
                } else {
                  setCurrent(newCurrent);
                }
                pageSizeRef.current = newPageSize;
              }}
              itemRender={(page, type, element) => {
                const Element = element;
                return <>{Element}</>;
              }}
              showSizeChanger
            />
          </Col>
          <Col span={8}>
            <CodePreview>{` <ProcessCustom status="success" percent={30} steps={10} strokeWidth={4} />`}</CodePreview>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default ProcessComponent;
