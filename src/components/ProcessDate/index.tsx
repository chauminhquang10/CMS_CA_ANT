import { Card, Col, Progress, Row } from 'antd';
import type {
  ProgressGradient,
  ProgressSize,
  ProgressType,
  SuccessProps,
} from 'antd/es/progress/progress';
import moment from 'moment';
import React from 'react';
import ButtonCustom from '../Button';
import './index.less';

declare const ProgressStatuses: ['normal', 'exception', 'active', 'success'];
export type ProcessDateProps = {
  prefixCls?: string;
  className?: string | typeof ProgressStatuses[number];
  type?: ProgressType;
  percent?: number;
  format?: (percent?: number, successPercent?: number) => React.ReactNode;
  status?: typeof ProgressStatuses[number];
  showInfo?: boolean;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'square' | 'round';
  strokeColor?: string | ProgressGradient;
  trailColor?: string;
  width?: number;
  success?: SuccessProps;
  style?: React.CSSProperties;
  gapDegree?: number;
  gapPosition?: 'top' | 'bottom' | 'left' | 'right';
  size?: ProgressSize;
  steps?: number;
  successPercent?: number;
  children?: React.ReactNode;
  fromDate: string | Date;
  toDate: string | Date;
  dateSuccess?: string | Date;
  dateDoing?: string | Date;
};

const ProcessDate: React.FC<ProcessDateProps> = (props) => {
  const { fromDate, toDate, status } = props;
  const fromDateCurrent = new Date(fromDate);
  const toDateCurrent = new Date(toDate);

  const dateNow = new Date();
  const dateRange = Math.floor(
    (toDateCurrent.setHours(12, 0, 0) - fromDateCurrent.setHours(12, 0, 0)) / 8.64e7,
  );
  let dateCurrent = 0;
  let percentCurrent = 0;
  let dateTodo = 0;
  if (dateNow < toDateCurrent) {
    dateCurrent = Math.floor(
      (dateNow.setHours(12, 0, 0) - fromDateCurrent.setHours(12, 0, 0)) / 8.64e7,
    );
    percentCurrent = Math.floor((dateCurrent / dateRange) * 100);
    dateTodo = Math.floor(dateRange - dateCurrent);
  } else {
    percentCurrent = dateRange * 100;
    dateCurrent = dateRange;
  }

  return (
    <Card bordered={false}>
      <Row justify="space-between" align="middle">
        <Col className="txt-date-label txt-date ">
          {fromDateCurrent.toString() !== 'Invalid Date'
            ? moment(fromDateCurrent).format('DD/MM/YYYY')
            : '---'}
        </Col>
        <Col>
          <div className="divider-small" />
        </Col>
        <Col className="txt-date-label txt-date ">
          {toDateCurrent.toString() !== 'Invalid Date'
            ? moment(toDateCurrent).format('DD/MM/YYYY')
            : '---'}
        </Col>
      </Row>
      <Progress
        className={`group-process-dashed ${props.className}`}
        status={status}
        showInfo={false}
        strokeLinecap={'square'}
        strokeWidth={4}
        style={{ width: '100%' }}
        strokeColor={dateTodo > 30 ? '#34C759' : '#ff3b49'}
        percent={percentCurrent}
      />
      <Row justify="space-between" align="middle">
        <Col className="txt-date-sub-label txt-date ">
          {dateCurrent || dateCurrent === 0 ? dateCurrent : '---'} /{' '}
          {dateRange || dateRange === 0 ? dateRange : '---'} Ngày
        </Col>
        <Col className="txt-date txt-data-btn">
          <ButtonCustom
            style={{ fontWeight: 700, fontSize: '10px', lineHeight: '14px', color: '#76809B' }}
            className="btn-custom btn-radius-default"
          >
            còn {dateTodo} Ngày
          </ButtonCustom>
        </Col>
      </Row>
    </Card>
  );
};

ProcessDate.defaultProps = {
  className: '',
};

export default ProcessDate;
