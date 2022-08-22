import type { RadioChangeEvent } from 'antd';
import { Col, Radio, Row } from 'antd';
import React, { useState } from 'react';

export type SelectTypeUserProps = {
  onSelect: (tpye: number) => void;
  individualIndex: number;
};

export type TypeUser = {
  key: number;
  name: string;
  type: string;
};

const listTypeUser: TypeUser[] = [
  {
    key: 0,
    name: 'Cá nhân thuộc tổ chức',
    type: 'Cá nhân thuộc tổ chức',
  },
  {
    key: 1,
    name: 'Cá nhân',
    type: 'Cá nhân',
  },
];

const SelectTypeUser: React.FC<SelectTypeUserProps> = (props) => {
  const { onSelect, individualIndex } = props;
  const [value, setValue] = useState(0);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    onSelect(e.target.value);
  };
  return (
    <Row style={{ padding: '14px 0' }}>
      <Col>
        <div className="label-txt label-txt-16-bold">Chọn loại khách hàng sử dụng</div>
      </Col>
      <Col>
        <Radio.Group onChange={onChange} value={individualIndex || value}>
          {listTypeUser?.map((type) => (
            <Radio
              key={type.key}
              value={type.key}
              className="radio-custom"
              style={{ marginRight: '20px' }}
            >
              <span className="radio-custom-label">{type.name}</span>
            </Radio>
          ))}
        </Radio.Group>
      </Col>
    </Row>
  );
};

export default SelectTypeUser;
