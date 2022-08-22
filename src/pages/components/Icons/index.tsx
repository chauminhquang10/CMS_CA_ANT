import {
  ActivityIcon,
  AddBlueIcon,
  AddWhiteIcon,
  ArrowLeftMenuIcon,
  ArrowRightIcon,
  ArrowRightMenuIcon,
  CalendarTodayIcon,
  CheckCircleFillIcon,
  CheckCircleFillIconX,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleErrorIcon,
  CloseOutFillIcon,
  DocumentDollarIcon,
  EditIcon,
  FileExcelIcon,
  FormIcon,
  IconFile,
  IconViewHistory,
  LockBlueIcon,
  LockIcon,
  PinIcon,
  PrintIcon,
  RecallIcon,
  SearchIcon,
  ShowIcon,
  SortIcon,
  SortIconBlue,
  SquareBlueIcon,
  SquareMenuIcon,
  ThreeDotIcon,
  TwoWayBlueIcon,
  UploadIcon,
  UserIcon,
} from '@/themes/icons';
import DeleteIcon from '@/themes/icons/DeleteIcon';

import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Divider, Row, Typography } from 'antd';
import React from 'react';

const CodePreview: React.FC = ({ children }) => (
  <pre
    style={{
      margin: '6px 0',
      padding: '6px 0px',
      background: '#fff',
    }}
  >
    <code>
      <Typography.Text
        copyable={{
          tooltips: children,
        }}
        code
        type="secondary"
      >
        {children}
      </Typography.Text>
    </code>
  </pre>
);

const TagComponent: React.FC = () => {
  return (
    <PageContainer>
      <Card style={{ backgroundColor: 'lightgray' }}>
        <Divider orientation="left">ICon</Divider>
        <Row style={{ marginLeft: '20px' }} align="middle">
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TwoWayBlueIcon />
            <CodePreview>{` <TwoWayBlueIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ActivityIcon />
            <CodePreview>{` <ActivityIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AddBlueIcon />
            <CodePreview>{` <AddBlueIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AddWhiteIcon />
            <CodePreview>{` <AddWhiteIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ArrowRightIcon />
            <CodePreview>{` <ArrowRightIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CalendarTodayIcon />
            <CodePreview>{` <CalendarTodayIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CheckCircleIcon />
            <CodePreview>{` <CheckCircleIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CheckCircleFillIcon />
            <CodePreview>{` <CheckCircleFillIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CheckCircleFillIconX />
            <CodePreview>{` <CheckCircleFillIconX />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ChevronLeftIcon />
            <CodePreview>{` <ChevronLeftIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ChevronRightIcon />
            <CodePreview>{` <ChevronRightIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ArrowLeftMenuIcon />
            <CodePreview>{` <ArrowLeftMenuIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ArrowRightMenuIcon />
            <CodePreview>{` <ArrowRightMenuIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ChevronUpIcon />
            <CodePreview>{` <ChevronUpIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ChevronDownIcon />
            <CodePreview>{` <ChevronDownIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircleErrorIcon />
            <CodePreview>{` <CircleErrorIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CloseOutFillIcon />
            <CodePreview>{` <CloseOutFillIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <DeleteIcon />
            <CodePreview>{` <DeleteIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <DocumentDollarIcon />
            <CodePreview>{` <DocumentDollarIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <EditIcon />
            <CodePreview>{` <EditIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FileExcelIcon />
            <CodePreview>{` <FileExcelIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FormIcon />
            <CodePreview>{` <FormIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <LockBlueIcon />
            <CodePreview>{` <LockBlueIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PinIcon />
            <CodePreview>{` <PinIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PrintIcon />
            <CodePreview>{` <PrintIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SearchIcon />
            <CodePreview>{` <SearchIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SquareBlueIcon />
            <CodePreview>{` <SquareBlueIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SquareMenuIcon />
            <CodePreview>{` <SquareMenuIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ThreeDotIcon />
            <CodePreview>{` <ThreeDotIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TwoWayBlueIcon />
            <CodePreview>{` <TwoWayBlueIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <UserIcon />
            <CodePreview>{` <UserIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SortIcon />
            <CodePreview>{` <SortIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <UploadIcon />
            <CodePreview>{` <UploadIcon />`}</CodePreview>
            <SortIconBlue />
            <CodePreview>{` <SortIconBlue />`}</CodePreview>
          </Col>
          <Col span={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <LockIcon style={{ borderRadius: 8 }} />
            <CodePreview>{` <LockIcon style={{borderRadius:8}}/>`}</CodePreview>
          </Col>
          <Col span={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <RecallIcon style={{ borderRadius: 8 }} />
            <CodePreview>{` <RecallIcon style={{borderRadius:8}}/>`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ShowIcon style={{ borderRadius: 8 }} />
            <CodePreview>{` <ShowIcon />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IconViewHistory />
            <CodePreview>{` <IconViewHistory />`}</CodePreview>
          </Col>
          <Col span={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IconFile />
            <CodePreview>{` <IconFile />`}</CodePreview>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default TagComponent;
