import { Body1 } from '@/components/HeadingColor';
import InputCustom from '@/components/Input';

export interface FeatureModal {
  value: string;
  key: string | number;
}

export interface RuleModel {
  key: string | number;
  value: string;
}

const listFeature: FeatureModal[] = [
  { key: 0, value: 'Tốc độ ký : 01 lượt ký / giây' },
  { key: 1, value: 'Lượt ký tối đa trong 24 : 500 lượt ký' },
  { key: 2, value: 'Số chữ ký sử dụng/tháng' },
  { key: 3, value: 'Tốc độ ký/giây' },
  { key: 4, value: 'Dung lượng lưu trữ n GB' },
  { key: 5, value: 'Thời gian đăng ký (tháng, năm)' },
  { key: 6, value: 'Chỉ áp dụng cho 1 user' },
];
const listRule: RuleModel[] = [
  {
    key: 0,
    value:
      'Phí kích hoạch thuê bao chữ ký số chỉ phải trả một lần khi Quý khách thực hiện kích hoạt thuê bao.',
  },
  {
    key: 1,
    value: 'Báo giá có hiệu lực từ ngày 15/05/2022.  ',
  },
];

const DetailPackage: React.FC = () => {
  const month = `${12} tháng`;
  const assetsValue = `1.300.000 VND`;

  return (
    <div className="detail-package">
      <div className="header-title">
        <Body1 style={{ fontWeight: 700 }}>Gói UnicloudCA Nâng Cao</Body1>
      </div>
      <div className="group-form-custom">
        <div className="label-group-form">Thời hạn gói cước:</div>
        <div className="" style={{ marginTop: '4px' }}>
          <InputCustom value={month} disabled />
        </div>
      </div>

      <div className="group-form-custom" style={{ marginTop: '12px' }}>
        <div className="label-group-form">Tính năng:</div>
        <div className="form-custom" style={{ marginTop: '4px' }}>
          <ul className="form-list-check">
            {listFeature.map((feature) => (
              <li key={feature.key}>{feature.value}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="group-form-custom" style={{ marginTop: '12px' }}>
        <div className="label-group-form">Thời hạn gói cước:</div>
        <div className="" style={{ marginTop: '4px' }}>
          <InputCustom value={assetsValue} disabled />
        </div>
      </div>

      <div className="group-form-custom" style={{ marginTop: '12px' }}>
        <div className="label-group-form">Quy định khác:</div>
        <div className="form-custom" style={{ marginTop: '4px' }}>
          <ul className="form-list-dot">
            {listRule.map((rule) => (
              <li key={rule.key}>{rule.value}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailPackage;
