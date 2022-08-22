import SelectCustom from '@/components/Select';
import { ChevronDownIcon } from '@/themes/icons';
import type { FormInstance } from 'antd';
import { Form, Input, Select } from 'antd';
import DataCity from '@/assets/json/vn.json';
import type { DistrictModel } from '../../StepUploadDeed/Modal';
import { useCallback, useState } from 'react';

type FormCustomProps = {
  isIndividual?: boolean;
  form: FormInstance<any>;
};

const { Option } = Select;
const { commune, district, province } = DataCity;

const filterDistrictOrCommune = (
  filer: string,
  idFilter: string,
  listDistrict: DistrictModel[],
) => {
  let districtNew: DistrictModel[] = [];
  if (listDistrict.length > 0) {
    switch (filer) {
      case 'district':
        districtNew = district.filter((districtItem) => idFilter === districtItem.idProvince);
        break;
      case 'commune':
        districtNew = commune.filter((communeItem) => idFilter === communeItem.idDistrict);
        break;
      default:
        break;
    }
    return districtNew;
  }
  return districtNew;
};

const FormInfoUnit: React.FC<FormCustomProps> = (props) => {
  const { form, isIndividual } = props;
  const formItemLayout = {
    labelCol: { span: 32 },
    wrapperCol: { span: 32 },
  };
  const [listDistrict, setDistricts] = useState<DistrictModel[]>([]);
  const [listCommune, setListCommune] = useState<DistrictModel[]>([]);

  const SelectProvince = useCallback(
    async (filter: string, idFilter: string) => {
      let listFilter: DistrictModel[] = [];

      switch (filter) {
        case 'city':
          setDistricts([]);
          setListCommune([]);
          const provinceSelected = province.find((prov) => idFilter === prov.idProvince);
          form.setFieldsValue({
            city: provinceSelected?.name,
            district: null,
            ward: null,
          });

          listFilter = await listFilter.concat(
            filterDistrictOrCommune('district', idFilter, district),
          );
          setDistricts(listFilter);
          break;
        case 'district':
          setListCommune([]);
          const districtSelected = district.find((dist) => idFilter === dist.idDistrict);
          form.setFieldsValue({
            district: districtSelected?.name,
            ward: null,
          });

          listFilter = await listFilter.concat(
            filterDistrictOrCommune('commune', idFilter, district),
          );
          setListCommune(listFilter);
          break;
        default:
          break;
      }
    },
    [form],
  );

  return (
    <>
      <Form
        {...formItemLayout}
        size={isIndividual ? 'large' : 'middle'}
        layout={'inline'}
        className="form-inline-text-vertical-grid"
        form={form}
      >
        {isIndividual === false && (
          <Form.Item
            name="taxCode"
            label={<div className="label-txt-required">Mã số thuế</div>}
            className="form-input-custom"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập Mã số thuế!',
              },
            ]}
          >
            <Input
              placeholder="Nhập mã số thuế"
              onChange={(event) => form.setFieldsValue({ taxCode: event.target.value })}
            />
          </Form.Item>
        )}
        {isIndividual === false && (
          <Form.Item
            name="companyName"
            label={<div className="label-txt-required">Tên công ty</div>}
            className="form-input-custom"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập Tên công ty!',
              },
            ]}
          >
            <Input
              placeholder="Nhập tên công ty"
              onChange={(event) => form.setFieldsValue({ companyName: event.target.value })}
            />
          </Form.Item>
        )}
        <Form.Item
          name="city"
          label={<div className="label-txt-required">Tỉnh/Thành phố</div>}
          className="form-input-custom"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập Tỉnh/thành phố!',
            },
          ]}
          style={{ gridColumn: '2', gridRow: '1' }}
        >
          <SelectCustom
            className="select-form-custom"
            placeholder="Chọn tỉnh/thành phố"
            bordered
            style={{ width: '100%' }}
            suffixIcon={<ChevronDownIcon style={{}} />}
            onChange={(value) => {
              SelectProvince('city', value);
            }}
          >
            {Object.entries(province).map((provinceItem) => {
              return (
                <Option key={provinceItem[1].idProvince} value={provinceItem[1].idProvince}>
                  {provinceItem[1].name}
                </Option>
              );
            })}
          </SelectCustom>
        </Form.Item>
        <Form.Item
          name="district"
          label={<div className="label-txt-required">Quận/Huyện</div>}
          className="form-input-custom"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập Quận/Huyện!',
            },
          ]}
        >
          <SelectCustom
            className="select-form-custom"
            placeholder="Chọn quận/huyện"
            bordered
            style={{ width: '100%' }}
            suffixIcon={<ChevronDownIcon style={{}} />}
            onChange={(value) => {
              SelectProvince('district', value);
            }}
          >
            {listDistrict?.length > 0 &&
              listDistrict?.map((districtItem) => {
                return (
                  <Option
                    disabled={districtItem.idDistrict === '0'}
                    key={districtItem?.idDistrict}
                    value={districtItem?.idDistrict}
                  >
                    <span>{districtItem.name}</span>
                  </Option>
                );
              })}
          </SelectCustom>
        </Form.Item>
        <Form.Item
          name="countries"
          label={<div className="label-txt-required">Quốc gia </div>}
          className="form-input-custom"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập Tỉnh/thành phố!',
            },
          ]}
        >
          <Input
            placeholder="Chọn quốc gia của bạn"
            onChange={(event) => form.setFieldsValue({ countries: event.target.value })}
          />
        </Form.Item>
        <Form.Item
          name="ward"
          label={<div className="label-txt-required">Phường/Xã</div>}
          className="form-input-custom"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập Phường/Xã!',
            },
          ]}
        >
          <SelectCustom
            className="select-form-custom"
            placeholder="Chọn phường/xã"
            bordered
            style={{ width: '100%' }}
            suffixIcon={<ChevronDownIcon />}
            onChange={(value) => {
              form.setFieldsValue({
                ward: value,
              });
            }}
          >
            {listCommune?.length > 0 &&
              listCommune?.map((communeItem) => {
                return (
                  <Option key={communeItem?.idCommune} value={communeItem?.name}>
                    <span>{communeItem.name}</span>
                  </Option>
                );
              })}
          </SelectCustom>
        </Form.Item>
        <Form.Item
          name="address"
          label={<div className="label-txt-required">Địa chỉ đầy đủ</div>}
          className="form-input-custom"
          style={{ gridColumnStart: '1', gridColumnEnd: '3' }}
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập Địa chỉ đầy đủ!',
            },
          ]}
        >
          <Input
            placeholder="Nhập địa chỉ công ty"
            onChange={(event) => form.setFieldsValue({ address: event.target.value })}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default FormInfoUnit;
