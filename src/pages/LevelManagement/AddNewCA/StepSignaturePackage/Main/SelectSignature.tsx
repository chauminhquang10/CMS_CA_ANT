import SelectCustom from '@/components/Select';
import { ChevronDownIcon } from '@/themes/icons';
import { Col, Row, Select } from 'antd';
import React from 'react';
const { Option } = Select;

const listOption = [
  { key: 0, value: 'Gói nâng cao 1', type: 'Gói nâng cao 1' },
  { key: 1, value: 'Gói nâng cao 2', type: 'Gói nâng cao 2' },
  { key: 2, value: 'Gói nâng cao 3', type: 'Gói nâng cao 3' },
];

const SelectPackageSignature: React.FC = () => {
  return (
    <Row style={{ marginTop: '20px' }}>
      <Col style={{ alignSelf: 'center' }}>
        <div className="label-txt label-txt-16-bold label-txt-required">Chọn gói chữ ký</div>
      </Col>
      <Col>
        <div className="label-txt label-txt-16-600">
          <SelectCustom
            className="select-form-custom"
            defaultValue={listOption[0].value}
            bordered
            style={{ width: '328px' }}
            suffixIcon={<ChevronDownIcon style={{}} />}
          >
            {listOption.map((value) => (
              <Option key={value.key} value={value?.value}>
                {value.value}
              </Option>
            ))}
          </SelectCustom>
        </div>
      </Col>
    </Row>
  );
};

export default SelectPackageSignature;
