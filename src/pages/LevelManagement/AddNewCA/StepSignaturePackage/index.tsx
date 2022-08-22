import { useCallback } from 'react';
import SelectPackageSignature from './Main/SelectSignature';
import SelectTypeUser from './Main/SelectTypeUser';

import DetailPackage from './Main/DetailPackage';
import './style.less';

export type Step1Props = {
  onChangeValue?: (value: number) => void;
  individualIndex: number;
};

const StepCASelectSignature: React.FC<Step1Props> = (props) => {
  const { onChangeValue, individualIndex } = props;
  const selectTypeUser = useCallback(
    (type) => {
      if (!onChangeValue) return;
      onChangeValue(type);
    },
    [onChangeValue],
  );
  return (
    <div style={{ maxHeight: '60vh', overflow: 'auto' }} id="style-4">
      <SelectTypeUser onSelect={selectTypeUser} individualIndex={individualIndex} />
      <SelectPackageSignature />
      <DetailPackage />
    </div>
  );
};
export default StepCASelectSignature;
