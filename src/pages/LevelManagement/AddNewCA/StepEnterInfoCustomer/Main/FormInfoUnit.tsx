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
            label={<div className="label-txt-required">M?? s??? thu???</div>}
            className="form-input-custom"
            rules={[
              {
                required: true,
                message: 'Vui l??ng nh???p M?? s??? thu???!',
              },
            ]}
          >
            <Input
              placeholder="Nh???p m?? s??? thu???"
              onChange={(event) => form.setFieldsValue({ taxCode: event.target.value })}
            />
          </Form.Item>
        )}
        {isIndividual === false && (
          <Form.Item
            name="companyName"
            label={<div className="label-txt-required">T??n c??ng ty</div>}
            className="form-input-custom"
            rules={[
              {
                required: true,
                message: 'Vui l??ng nh???p T??n c??ng ty!',
              },
            ]}
          >
            <Input
              placeholder="Nh???p t??n c??ng ty"
              onChange={(event) => form.setFieldsValue({ companyName: event.target.value })}
            />
          </Form.Item>
        )}
        <Form.Item
          name="city"
          label={<div className="label-txt-required">T???nh/Th??nh ph???</div>}
          className="form-input-custom"
          rules={[
            {
              required: true,
              message: 'Vui l??ng nh???p T???nh/th??nh ph???!',
            },
          ]}
          style={{ gridColumn: '2', gridRow: '1' }}
        >
          <SelectCustom
            className="select-form-custom"
            placeholder="Ch???n t???nh/th??nh ph???"
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
          label={<div className="label-txt-required">Qu???n/Huy???n</div>}
          className="form-input-custom"
          rules={[
            {
              required: true,
              message: 'Vui l??ng nh???p Qu???n/Huy???n!',
            },
          ]}
        >
          <SelectCustom
            className="select-form-custom"
            placeholder="Ch???n qu???n/huy???n"
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
          label={<div className="label-txt-required">Qu???c gia </div>}
          className="form-input-custom"
          rules={[
            {
              required: true,
              message: 'Vui l??ng nh???p T???nh/th??nh ph???!',
            },
          ]}
        >
          <Input
            placeholder="Ch???n qu???c gia c???a b???n"
            onChange={(event) => form.setFieldsValue({ countries: event.target.value })}
          />
        </Form.Item>
        <Form.Item
          name="ward"
          label={<div className="label-txt-required">Ph?????ng/X??</div>}
          className="form-input-custom"
          rules={[
            {
              required: true,
              message: 'Vui l??ng nh???p Ph?????ng/X??!',
            },
          ]}
        >
          <SelectCustom
            className="select-form-custom"
            placeholder="Ch???n ph?????ng/x??"
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
          label={<div className="label-txt-required">?????a ch??? ?????y ?????</div>}
          className="form-input-custom"
          style={{ gridColumnStart: '1', gridColumnEnd: '3' }}
          rules={[
            {
              required: true,
              message: 'Vui l??ng nh???p ?????a ch??? ?????y ?????!',
            },
          ]}
        >
          <Input
            placeholder="Nh???p ?????a ch??? c??ng ty"
            onChange={(event) => form.setFieldsValue({ address: event.target.value })}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default FormInfoUnit;
