import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';

const DatePickerCustom = (props: DatePickerProps) => {
  return (
    <div>
      <DatePicker {...props} />
    </div>
  );
};

export default DatePickerCustom;
