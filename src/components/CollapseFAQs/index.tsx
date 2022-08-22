import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd/es/collapse';
import styled from './index.less';

export type CollapseFAQsProps = {
  accordion?: boolean;
  activeKey?: string[] | string | number[] | number;
  bordered?: boolean;
  collapsible?: Omit<CollapseProps, 'collapsible'>;
  expandIconPosition?: 'left' | 'right' | undefined;
  headerPanel?: React.ReactNode;
  isCheckbox?: boolean;
  bodyPanel?: React.ReactNode;
  extra?: React.ReactNode;
  keyPanel: string | number;
};

const { Panel } = Collapse;

const CollapseCustom: React.FC<CollapseFAQsProps> = (props) => {
  const { activeKey, headerPanel, bodyPanel, extra, keyPanel } = props;

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const styleIcon: React.CSSProperties = {
    position: 'absolute',
    left: '40px',
    display: 'flex',
    alignItems: 'center',
    zIndex: '4',
    top: '0px',
    bottom: '0px',
    transition: 'all 0.3s',
  };

  return (
    <Collapse
      defaultActiveKey={activeKey}
      bordered={false}
      className={styled.collapseCustom}
      expandIcon={(prop) => {
        return (
          <CaretRightOutlined
            {...prop}
            style={prop.isActive ? { ...styleIcon, transform: ' rotate(90deg)' } : styleIcon}
          />
        );
      }}
      expandIconPosition="left"
      onChange={onChange}
    >
      <Panel header={headerPanel} key={keyPanel} extra={extra}>
        {bodyPanel}
      </Panel>
    </Collapse>
  );
};

CollapseCustom.defaultProps = {
  activeKey: ['1'],
  keyPanel: '1',
};

export default CollapseCustom;
