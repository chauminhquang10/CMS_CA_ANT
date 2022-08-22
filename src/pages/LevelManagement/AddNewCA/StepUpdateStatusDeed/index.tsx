import SelectCustom from '@/components/Select';
import { ChevronDownIcon } from '@/themes/icons';
import { Select } from 'antd';
import './style.less';

type StepUpdateDeedProps = {
  onSelect: (value: boolean | string | undefined) => void;
};

const { Option } = Select;

const listOption = [
  { key: 0, value: 'Chưa hoàn thành', type: 'Chưa hoàn thành' },
  { key: 1, value: 'Đã hoàn thành', type: 'Đã hoàn thành' },
];

const StepUpdateDeed: React.FC<StepUpdateDeedProps> = (props) => {
  const { onSelect } = props;

  return (
    <div className="card-information update-page" style={{ width: '504px', margin: 'auto' }}>
      <div className="update-page-title">
        <span className="title-step">Tên tài liệu:</span>
        <span>Đơn đề nghị cấp chứng thư</span>
      </div>
      <div>
        <div style={{ marginBottom: '4px' }}>Trạng thái tài liệu</div>
        <SelectCustom
          defaultValue={listOption[0].value}
          onChange={onSelect}
          style={{ width: '328px' }}
          suffixIcon={<ChevronDownIcon style={{}} />}
          className="select-form-custom"
          dropdownClassName="dropdown-filter"
        >
          {listOption.map((optionParent) => {
            return (
              <Option key={optionParent.value} value={optionParent.value}>
                {optionParent.value}
              </Option>
            );
          })}
        </SelectCustom>
      </div>
    </div>
  );
};

export default StepUpdateDeed;
