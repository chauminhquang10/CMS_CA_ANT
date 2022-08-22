import ButtonCustom from '@/components/Button';
import ButtonAction from '@/components/ButtonAction';
import { AddWhiteIcon } from '@/themes/icons';
import {
  DownloadOutlined,
  FilePdfOutlined,
  PrinterOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Divider, Row, Typography } from 'antd';
import React from 'react';

const CodePreview: React.FC = ({ children }) => (
  <pre style={{ margin: '12px 0', padding: '6px 0px', background: '#fff' }}>
    <code>
      <Typography.Text code type="secondary" copyable>
        {children}
      </Typography.Text>
    </code>
  </pre>
);

const ButtonComponent: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Divider orientation="left">Button </Divider>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <ButtonCustom className="btn-custom btn-normal">ĐANG HOẠT ĐỘNG</ButtonCustom>
          </Col>
          <Col span={16}>
            <CodePreview>{` <ButtonCustom className="btn-custom btn-normal">ĐANG HOẠT ĐỘNG</ButtonCustom>`}</CodePreview>
          </Col>
        </Row>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <ButtonCustom className="btn-custom btn-dangerous">TẠM KHÓA</ButtonCustom>
          </Col>
          <Col span={16}>
            <CodePreview>{` <ButtonCustom className="btn-custom btn-dangerous">TẠM KHÓA</ButtonCustom>`}</CodePreview>
          </Col>
        </Row>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <ButtonCustom className="btn-custom btn-warning">TẠM DỪNG</ButtonCustom>
          </Col>
          <Col span={16}>
            <CodePreview>{` <ButtonCustom className="btn-custom btn-warning">TẠM DỪNG</ButtonCustom>`}</CodePreview>
          </Col>
        </Row>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <ButtonCustom className="btn-custom btn-success">Hoàn thành</ButtonCustom>
          </Col>
          <Col span={16}>
            <CodePreview>{` <ButtonCustom className="btn-custom btn-success">Hoàn thành</ButtonCustom>`}</CodePreview>
          </Col>
        </Row>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <ButtonCustom className="btn-custom btn-processing">Đang xử lý</ButtonCustom>
          </Col>
          <Col span={16}>
            <CodePreview>{` <ButtonCustom className="btn-custom btn-processing">Đang xử lý</ButtonCustom>`}</CodePreview>
          </Col>
        </Row>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <ButtonCustom className="btn-custom btn-excel">Xuất file excel</ButtonCustom>
          </Col>
          <Col span={16}>
            <CodePreview>{` <ButtonCustom className="btn-custom btn-excel">Xuât file excel</ButtonCustom>`}</CodePreview>
          </Col>
        </Row>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <ButtonCustom className="btn-custom btn-add">
              <AddWhiteIcon /> Tạo mới
            </ButtonCustom>
          </Col>
          <Col span={16}>
            <CodePreview>{` <ButtonCustom className="btn-custom btn-add"><AddWhiteIcon />Tạo mới</ButtonCustom>`}</CodePreview>
          </Col>
        </Row>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <ButtonCustom className="btn-custom btn-excel-normal">Xuất file excel</ButtonCustom>
          </Col>
          <Col span={16}>
            <CodePreview>{` <ButtonCustom className="btn-custom btn-excel-normal">Xuât file excel</ButtonCustom>`}</CodePreview>
          </Col>
        </Row>
        <Divider orientation="left">Button Icon </Divider>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <ButtonCustom icon={<UploadOutlined />} className="btn-custom btn-icon btn-normal" />
          </Col>
          <Col span={16}>
            <CodePreview>{` <ButtonCustom icon={<UploadOutlined />} className="btn-custom btn-icon btn-normal" />`}</CodePreview>
          </Col>
        </Row>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <ButtonCustom
              icon={<UploadOutlined />}
              className="btn-custom btn-icon-border btn-normal"
            />
          </Col>
          <Col span={16}>
            <CodePreview>{` <ButtonCustom className="btn-custom btn-normal"> <UploadOutlined /> </ButtonCustom>`}</CodePreview>
          </Col>
        </Row>

        <Divider orientation="left">Button Download </Divider>
        <Row style={{ marginLeft: '20px' }} justify="space-around" align="middle">
          <Col span={4}>
            <ButtonAction
              iconFirst={<FilePdfOutlined />}
              className=""
              iconLast={
                <>
                  <ButtonCustom className="btn-custom">
                    <DownloadOutlined />
                  </ButtonCustom>
                  <ButtonCustom className="btn-custom">
                    <PrinterOutlined />
                  </ButtonCustom>
                </>
              }
            >
              <span>tailieudoisoat.xls</span>
            </ButtonAction>
          </Col>
          <Col span={16}>
            <CodePreview>{` 
             <ButtonAction
              iconFirst={<FilePdfOutlined />}
              className=""
              iconLast={
                <>
                  <ButtonCustom className="btn-custom">
                    <DownloadOutlined />
                  </ButtonCustom>
                  <ButtonCustom className="btn-custom">
                    <PrinterOutlined />
                  </ButtonCustom>
                </>
              }
            >
              <span>tailieudoisoat.xls</span>
            </ButtonAction>
            `}</CodePreview>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default ButtonComponent;
