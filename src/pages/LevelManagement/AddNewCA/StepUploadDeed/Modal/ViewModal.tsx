import ButtonCustom from '@/components/Button';
import DatePickerCustom from '@/components/DatePicker';
import SelectCustom from '@/components/Select';
import UploadFileCustom from '@/components/UploadFile';
import {
  CheckCircleFillIcon,
  ChevronDownIcon,
  CloseOutFillIcon,
  DateRangeIcon,
  EditIcon,
  UploadIcon,
} from '@/themes/icons';
import { dateFormat } from '@/utils/main';
import { validate } from '@/utils/Message/message';
import {
  disabledDate,
  validateSpecialChars,
  validatorDateNotNow,
  validatorIndentify,
  validatorIssueDate,
} from '@/utils/rules';
import type { UploadFile } from 'antd';
import { Form, Input, Select } from 'antd';
import type { FormInstance } from 'antd/es/form/Form';
import type { UploadChangeParam } from 'antd/lib/upload';
import moment from 'moment';
import { useCallback, useMemo } from 'react';
import { listTypeDocument, listTypeDocumentBusiness } from '../Main/SelectUpload';
import type { UploadRequestOption } from '../model';
import { TrustDocumentType } from '../model';

type ViewModalProps = {
  formInquiryCA: FormInstance<any>;
  typeDocument: {
    key: number;
    title: string;
    value: string;
    id: keyof typeof TrustDocumentType;
    isIvidual: boolean;
  };
  listDocument: API.TrustDocument[];
  defaultFileList: UploadFile<any>[];
  listCommune: DistrictModel[];
  listDistrict: DistrictModel[];
  dataForm: API.GetInquiryCAByIdResponse;
  province: DistrictModel[];
  SelectProvince: (filter: string, idFilter: string, type?: 'DNQD' | 'DN' | undefined) => void;
  handleOnChangeInput: () => void;
  deleteFileUpload?: (file: UploadFile<any>) => void;
  beforeUpload: () => void;
  uploadFileNotsubscribe?: (options: UploadRequestOption<any>) => void;
  onChangeUploadFiles: (info: UploadChangeParam<UploadFile<any>>) => void;
  handleOnChangeSelectedDeed: (type: any) => void;
};

type DistrictModel = {
  [key: string]: any;
  idProvince?: string | undefined;
  idDistrict?: string | undefined;
  name?: string | undefined;
};

const { Option, OptGroup } = Select;
/**
 * checkFormByTypeDocument ()
 * @param typeFile
 * @returns 'inquiryForm' | 'infoForm' | ''
 */
const checkFormByTypeDocument = (typeFile: string) => {
  let result:
    | 'inquiryForm'
    | 'identificationForm'
    | 'appoinmentDecisionForm'
    | 'decideToEstablish'
    | 'businessForm'
    | '' = '';
  if (TrustDocumentType[typeFile] === TrustDocumentType.INQUIRY_CA_FORM) {
    result = 'inquiryForm';
  } else if (
    TrustDocumentType[typeFile] === TrustDocumentType.PASSPORT ||
    TrustDocumentType[typeFile] === TrustDocumentType.CCCD ||
    TrustDocumentType[typeFile] === TrustDocumentType.ID_CARD
  ) {
    result = 'identificationForm';
  } else if (TrustDocumentType[typeFile] === TrustDocumentType.APPOINTMENT_DECISION) {
    result = 'appoinmentDecisionForm';
  } else if (TrustDocumentType[typeFile] === TrustDocumentType.DECIDE_TO_ESTABLISH) {
    result = 'decideToEstablish';
  } else if (
    TrustDocumentType[typeFile] === TrustDocumentType.INVESTMENT_LICENSE ||
    TrustDocumentType[typeFile] === TrustDocumentType.ORGANIZATION_CERTIFICATE ||
    TrustDocumentType[typeFile] === TrustDocumentType.BUSINESS_REGISTRATION
  ) {
    result = 'businessForm';
  }
  return result;
};

/**
 * checkIndential ()
 * @param typeFile
 * @returns 'CMND' | 'CCCD' | 'H??? CHI???U' | ''
 */
const checkIndential = (typeFile: string) => {
  let result: 'CMND' | 'CCCD' | 'H??? CHI???U' | '' = '';
  switch (TrustDocumentType[typeFile]) {
    case TrustDocumentType.ID_CARD:
      result = 'CMND';
      break;
    case TrustDocumentType.CCCD:
      result = 'CCCD';
      break;
    case TrustDocumentType.PASSPORT:
      result = 'H??? CHI???U';
      break;
    default:
      break;
  }
  return ` N??I ????NG K?? TH?????NG TR?? (${result})`;
};

const findItem = (list: API.TrustDocument[], itemFind: string) => {
  return list?.findIndex((value) => itemFind === value?.type) > -1 ? true : false;
};

const ViewModalUpload: React.FC<ViewModalProps> = (props) => {
  const {
    formInquiryCA,
    typeDocument,
    defaultFileList,
    listCommune,
    listDistrict,
    province,
    dataForm,
    listDocument,
    onChangeUploadFiles,
    beforeUpload,
    SelectProvince,
    handleOnChangeInput,
    deleteFileUpload,
    handleOnChangeSelectedDeed,
  } = props;

  const listTypeDeed = dataForm?.individualOrEnterprise
    ? listTypeDocumentBusiness
    : listTypeDocument;

  const selectProvinceChild = useCallback(
    (filter: string, idFilter: string, type?: 'DNQD' | 'DN' | undefined) => {
      SelectProvince(filter, idFilter, type);
    },
    [SelectProvince],
  );

  const beforeUploadChild = useCallback(() => {
    beforeUpload();
  }, [beforeUpload]);

  const onChangeUploadFilesChild = useCallback(
    (info: UploadChangeParam<UploadFile<any>>) => {
      onChangeUploadFiles(info);
    },
    [onChangeUploadFiles],
  );

  const handleOnChangeSelectedChild = useCallback(
    (type) => {
      handleOnChangeSelectedDeed(type);
    },
    [handleOnChangeSelectedDeed],
  );

  const BuildSelectTypeDocs = useMemo(() => {
    return (
      <SelectCustom
        className="select-form-custom"
        placeholder=""
        bordered
        style={{ width: '100%' }}
        suffixIcon={<ChevronDownIcon />}
        defaultValue={`${typeDocument?.value} - ${typeDocument?.title}`}
        onChange={(value) => {
          handleOnChangeSelectedChild(value);
        }}
      >
        {listTypeDeed.map((type) => (
          <OptGroup key={type?.key} label={type?.title}>
            {type?.listChild?.map((typeDeed) => (
              <Option key={`${type?.key}-${typeDeed?.key}`} value={typeDeed?.id}>
                <div className="group-item-selected">
                  <span
                    className="title-hidden"
                    style={{
                      display: 'none',
                      width: '0',
                      opacity: '0',
                    }}
                  >{`${typeDocument?.value} -`}</span>
                  <span className="title-selected">{typeDeed?.title}</span>
                  {listDocument && findItem(listDocument, typeDeed?.id) === true ? (
                    <span className="icon-check">
                      <CheckCircleFillIcon />
                    </span>
                  ) : (
                    <span />
                  )}
                </div>
              </Option>
            ))}
          </OptGroup>
        ))}
      </SelectCustom>
    );
  }, [
    handleOnChangeSelectedChild,
    listDocument,
    listTypeDeed,
    typeDocument?.title,
    typeDocument?.value,
  ]);

  const BuildFormUploadFile = () => {
    return (
      <Form.Item name="uploadFile" rules={[{ required: true, message: validate?.required }]}>
        <UploadFileCustom
          multiple={true}
          className="upload-trust-ca"
          onChange={(info) => onChangeUploadFilesChild(info)}
          beforeUpload={() => beforeUploadChild()}
          fileList={defaultFileList}
          showUploadList={{
            showDownloadIcon: false,
            showRemoveIcon: true,
            removeIcon: (
              <div style={{ width: '16px', height: '16px' }} className="custom-icon-remove-file">
                <CloseOutFillIcon />
              </div>
            ),
          }}
          onRemove={(file) => deleteFileUpload?.(file)}
        >
          <ButtonCustom
            icon={
              <UploadIcon
                style={{
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '12px',
                  justifyContent: 'center',
                }}
              />
            }
            className="btn-custom btn-upload"
          >
            T???i l??n
          </ButtonCustom>
        </UploadFileCustom>
      </Form.Item>
    );
  };

  const BuildFormInfoUser = () => {
    return (
      <div>
        <div className="" style={{ marginTop: '20px', fontWeight: '600' }}>
          TH??NG TIN NG?????I ?????I DI???N THEO PH??P LU???T
        </div>
        <Form.Item
          name="fullName"
          label={<div className="label-txt-required">H??? v?? t??n</div>}
          className="form-input-custom"
          rules={[
            {
              required: true,
              validator(_, value) {
                return validateSpecialChars(_, value);
              },
              validateTrigger: 'onSubmit',
            },
          ]}
        >
          <Input
            className="form-input-icon form-input-edit"
            placeholder="Nh???p H??? v?? t??n"
            prefix={<EditIcon />}
            onChange={(event) => {
              formInquiryCA.setFieldsValue({ fullName: event.target.value });
            }}
          />
        </Form.Item>

        <Form.Item
          name="dateOfBirth"
          className="form-input-custom-date"
          label={<div className="label-txt-required">Ng??y sinh</div>}
          rules={[
            () => ({
              required: true,
              validator(_, value) {
                return validatorDateNotNow(_, value);
              },
            }),
          ]}
        >
          <DatePickerCustom
            name="dateOfBirth"
            key={'1'}
            suffixIcon={<DateRangeIcon />}
            clearIcon={false}
            onChange={(date: any) => {
              formInquiryCA.setFieldsValue({ dateOfBirth: date });
            }}
            format={dateFormat}
            placeholder="mm/dd/yyyy"
            disabledDate={(date: moment.Moment) => {
              return date > moment();
            }}
          />
        </Form.Item>
        <Form.Item
          name="sex"
          label={<div className="label-txt-required">Gi???i t??nh</div>}
          className="form-input-custom-date"
          rules={[
            {
              required: true,
              message: validate?.required,
            },
          ]}
        >
          <SelectCustom
            className="select-form-custom"
            placeholder="Ch???n gi???i t??nh"
            bordered
            style={{ width: '100%' }}
            suffixIcon={<ChevronDownIcon />}
            onChange={(value) => {
              formInquiryCA.setFieldsValue({ sex: value });
            }}
          >
            <Option value="" disabled key={1}>
              Ch???n gi???i t??nh
            </Option>
            <Option value="Nam" key={2}>
              Nam
            </Option>
            <Option value="N???" key={3}>
              N???
            </Option>
          </SelectCustom>
        </Form.Item>
        <Form.Item
          name="cardId"
          label={
            <div className="label-txt-required">
              {typeDocument?.id === 'CCCD'
                ? 'M?? s??? CCCD'
                : typeDocument?.id === 'PASSPORT'
                ? 'S??? h??? chi???u'
                : 'M?? s??? CMT'}
            </div>
          }
          className="form-input-custom"
          rules={[
            () => ({
              required: true,
              validator(_, value) {
                return validatorIndentify(_, value, typeDocument?.id);
              },
              validateTrigger: 'onSubmit',
            }),
          ]}
        >
          <Input
            autoComplete="off"
            className="form-input-icon form-input-edit"
            placeholder={`Nh???p ${
              typeDocument?.id === 'CCCD'
                ? 'CCCD'
                : typeDocument?.id === 'PASSPORT'
                ? 'H??? chi???u'
                : 'CMT'
            }`}
            prefix={<EditIcon />}
            onChange={(event) => {
              formInquiryCA.setFieldsValue({ cardId: event.target.value });
            }}
          />
        </Form.Item>
        <Form.Item
          name="issueDate"
          className="form-input-custom-date"
          label={<div className="label-txt-required">Ng??y c???p</div>}
          rules={[
            () => ({
              required: true,
              validator(_, value) {
                return validatorIssueDate(
                  _,
                  value,
                  moment(formInquiryCA?.getFieldValue('dateOfBirth')).add(14, 'years'),
                );
              },
              validateTrigger: 'onSubmit',
            }),
          ]}
        >
          {DatePickerCustom && (
            <DatePickerCustom
              style={{ width: '100%' }}
              suffixIcon={<DateRangeIcon />}
              placeholder="mm/dd/yyyy"
              clearIcon={false}
              onChange={(date: moment.MomentInput) => {
                formInquiryCA.setFieldsValue({
                  issueDate: moment(date, dateFormat),
                });
              }}
              disabledDate={(date: moment.Moment) => {
                return disabledDate(date, formInquiryCA?.getFieldValue('dateOfBirth'));
              }}
              format={['DD/MM/YYYY', 'DDMMYYYY']}
            />
          )}
        </Form.Item>
        <div className="" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)' }}>
          {/* <Form.Item
            name="expiry"
            className="form-input-custom-date"
            label={<div className="label-txt-required">C?? gi?? tr??? ?????n</div>}
            rules={[
              () => ({
                required: true,
                message: validate?.required,
                validateTrigger: 'onSubmit',
              }),
            ]}
          >
            {DatePickerCustom && (
              <DatePickerCustom
                suffixIcon={<DateRangeIcon />}
                placeholder="mm/dd/yyyy"
                onChange={(date: moment.MomentInput) => {
                  formInquiryCA.setFieldsValue({
                    expiry: moment(date, dateFormat),
                  });
                }}
                clearIcon={false}
                format={['MM/DD/YYYY', 'MMDDYYYY']}
                disabledDate={(date: moment.Moment) => {
                  const issueDateCurrent = formInquiryCA?.getFieldValue('issueDate');
                  return disabledDate(date, issueDateCurrent, 'expiry');
                }}
              />
            )}
          </Form.Item> */}
        </div>
      </div>
    );
  };

  const BuildFormInfoDNQD = () => {
    return (
      <>
        <div className="title-info-document">TH??NG TIN T??? CH???C/DOANH NGHI???P QUY???T ?????NH</div>
        <Form.Item
          name="dnqdTaxCode"
          label={<div className="label-txt-required">M?? s??? thu???/M?? ng??n s??ch</div>}
          className="form-input-custom"
          rules={[
            {
              required: true,
              validator(_, value) {
                return validateSpecialChars(_, value);
              },
              validateTrigger: 'onSubmit',
            },
          ]}
        >
          <Input
            className="form-input-icon form-input-edit"
            placeholder="M?? s??? thu???/M?? ng??n s??ch"
            prefix={<EditIcon />}
            onChange={(event) => {
              formInquiryCA.setFieldsValue({ dnqdTaxCode: event.target.value });
            }}
          />
        </Form.Item>
        <Form.Item
          name="dnqdEnterpriseName"
          label={<div className="label-txt-required">T??n t??? ch???c/Doanh nghi???p</div>}
          className="form-input-custom"
          rules={[
            {
              required: true,
              validator(_, value) {
                return validateSpecialChars(_, value);
              },
              validateTrigger: 'onSubmit',
            },
          ]}
        >
          <Input
            className="form-input-icon form-input-edit"
            placeholder="Nh???p T??n t??? ch???c/Doanh nghi???p"
            prefix={<EditIcon />}
            onChange={(event) => {
              formInquiryCA.setFieldsValue({ dnqdEnterpriseName: event.target.value });
            }}
          />
        </Form.Item>

        <Form.Item
          name="dnqdCity"
          label={<div className="label-txt-required">T???nh/th??nh ph???</div>}
          className="form-input-custom-date"
          rules={[
            {
              required: true,
              message: validate?.required,
              validateTrigger: 'onSubmit',
            },
          ]}
        >
          <SelectCustom
            className="select-form-custom"
            placeholder="Ch???n th??nh ph???"
            bordered
            style={{ width: '100%' }}
            suffixIcon={<ChevronDownIcon />}
            onChange={(value) => {
              SelectProvince('city', value, 'DNQD');
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
          name="dnqdDistrict"
          label={<div className="label-txt-required">Qu???n/Huy???n</div>}
          className="form-input-custom"
          rules={[
            {
              required: true,
              validator(_, value) {
                return validateSpecialChars(_, value);
              },
              validateTrigger: 'onSubmit',
            },
          ]}
        >
          <SelectCustom
            className="select-form-custom"
            placeholder="Ch???n Qu???n/Huy???n"
            bordered
            style={{ width: '100%' }}
            suffixIcon={<ChevronDownIcon />}
            onChange={(value) => {
              selectProvinceChild('district', value, 'DN');
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
          name="dnqdWard"
          label={<div className="label-txt-required">Ph?????ng/X??</div>}
          className="form-input-custom"
          rules={[
            {
              required: true,
              validator(_, value) {
                return validateSpecialChars(_, value);
              },
              validateTrigger: 'onSubmit',
            },
          ]}
        >
          <SelectCustom
            className="select-form-custom"
            placeholder="Ch???n Ph?????ng/X??"
            bordered
            style={{ width: '100%' }}
            suffixIcon={<ChevronDownIcon />}
            onChange={(value) => {
              formInquiryCA.setFieldsValue({
                dnqdWard: value,
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
          name="dnqdFullAddress"
          label={<div className="label-txt-required">?????a ch??? ?????y ?????</div>}
          className="form-input-custom"
          rules={[
            {
              required: true,
              message: validate.required,
              validateTrigger: 'onSubmit',
            },
          ]}
        >
          <Input
            className="form-input-icon form-input-edit"
            placeholder="Nh???p ?????a ch???"
            prefix={<EditIcon />}
            onChange={(event) => {
              formInquiryCA.setFieldsValue({ dnqdFullAddress: event.target.value });
            }}
          />
        </Form.Item>
      </>
    );
  };

  const BuildFormInfoBussiness = () => {
    return (
      <>
        <div style={{ marginTop: '20px' }} className="title-info-document">
          TH??NG TIN T??? CH???C/DOANH NGHI???P TH??NH L???P
        </div>
        <Form.Item
          name="businessTaxCode"
          label={<div className="label-txt-required">M?? s??? thu???/M?? ng??n s??ch</div>}
          className="form-input-custom"
          rules={[
            {
              required: true,
              validator(_, value) {
                return validateSpecialChars(_, value);
              },
              validateTrigger: 'onSubmit',
            },
          ]}
        >
          <Input
            className="form-input-icon form-input-edit"
            placeholder="M?? s??? thu???/M?? ng??n s??ch"
            prefix={<EditIcon />}
            onChange={(event) => {
              formInquiryCA.setFieldsValue({ businessTaxCode: event.target.value });
            }}
          />
        </Form.Item>
        <Form.Item
          name="enterpriseName"
          label={<div className="label-txt-required">T??n t??? ch???c/Doanh nghi???p</div>}
          className="form-input-custom"
          rules={[
            {
              required: true,
              validator(_, value) {
                return validateSpecialChars(_, value);
              },
              validateTrigger: 'onSubmit',
            },
          ]}
        >
          <Input
            className="form-input-icon form-input-edit"
            placeholder="Nh???p T??n t??? ch???c/Doanh nghi???p"
            prefix={<EditIcon />}
            onChange={(event) => {
              formInquiryCA.setFieldsValue({ enterpriseName: event.target.value });
            }}
          />
        </Form.Item>

        <Form.Item
          name="businessCity"
          label={<div className="label-txt-required">T???nh/th??nh ph???</div>}
          className="form-input-custom-date"
          rules={[
            {
              required: true,
              message: validate?.required,
              validateTrigger: 'onSubmit',
            },
          ]}
        >
          <SelectCustom
            className="select-form-custom"
            placeholder="Ch???n th??nh ph???"
            bordered
            style={{ width: '100%' }}
            suffixIcon={<ChevronDownIcon />}
            onChange={(value) => SelectProvince('city', value, 'DN')}
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
          name="businessDistrict"
          label={<div className="label-txt-required">Qu???n/Huy???n</div>}
          className="form-input-custom"
          rules={[
            {
              required: true,
              validator(_, value) {
                return validateSpecialChars(_, value);
              },
              validateTrigger: 'onSubmit',
            },
          ]}
        >
          <SelectCustom
            className="select-form-custom"
            placeholder="Ch???n Qu???n/Huy???n"
            bordered
            style={{ width: '100%' }}
            suffixIcon={<ChevronDownIcon />}
            onChange={(value) => SelectProvince('district', value, 'DN')}
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
          name="businessWard"
          label={<div className="label-txt-required">Ph?????ng/X??</div>}
          className="form-input-custom"
          rules={[
            {
              required: true,
              validator(_, value) {
                return validateSpecialChars(_, value);
              },
              validateTrigger: 'onSubmit',
            },
          ]}
        >
          <SelectCustom
            className="select-form-custom"
            placeholder="Ch???n Ph?????ng/X??"
            bordered
            style={{ width: '100%' }}
            suffixIcon={<ChevronDownIcon />}
            onChange={(value) => {
              formInquiryCA.setFieldsValue({
                businessWard: value,
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
          name="businessFullAddress"
          label={<div className="label-txt-required">?????a ch??? ?????y ?????</div>}
          className="form-input-custom"
          rules={[
            {
              required: true,
              message: validate.required,
              validateTrigger: 'onSubmit',
            },
          ]}
        >
          <Input
            className="form-input-icon form-input-edit"
            placeholder="Nh???p T??n t??? ch???c/Doanh nghi???p"
            prefix={<EditIcon />}
            onChange={(event) => {
              formInquiryCA.setFieldsValue({ businessFullAddress: event.target.value });
            }}
          />
        </Form.Item>
      </>
    );
  };

  const BuildFormResident = () => {
    return (
      <>
        <div style={{ marginTop: '20px' }} className="title-info-document">
          {checkIndential(typeDocument?.id)}
        </div>

        <Form.Item
          name="address"
          label={
            <div className="label-txt-required">S??? nh??, t??n ???????ng, x??m / th??n / t??? d??n ph???</div>
          }
          className="form-input-custom"
          rules={[
            {
              required: true,
              message: validate.required,
              validateTrigger: 'onSubmit',
            },
          ]}
        >
          <Input
            className="form-input-icon form-input-edit"
            placeholder="Nh???p S??? nh??, t??n ???????ng, x??m / th??n / t??? d??n ph???"
            prefix={<EditIcon />}
            onChange={(event) => {
              formInquiryCA.setFieldsValue({ address: event.target.value });
            }}
          />
        </Form.Item>

        <Form.Item
          name="city"
          label={<div className="label-txt-required">T???nh/th??nh ph???</div>}
          className="form-input-custom-date"
          rules={[
            {
              required: true,
              message: validate?.required,
              validateTrigger: 'onSubmit',
            },
          ]}
        >
          <SelectCustom
            className="select-form-custom"
            placeholder="Ch???n th??nh ph???"
            bordered
            style={{ width: '100%' }}
            suffixIcon={<ChevronDownIcon />}
            onChange={(value) => SelectProvince('city', value)}
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
              validator(_, value) {
                return validateSpecialChars(_, value);
              },
              validateTrigger: 'onSubmit',
            },
          ]}
        >
          <SelectCustom
            className="select-form-custom"
            placeholder="Ch???n Qu???n/Huy???n"
            bordered
            style={{ width: '100%' }}
            suffixIcon={<ChevronDownIcon />}
            onChange={(value) => SelectProvince('district', value)}
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
          name="ward"
          label={<div className="label-txt-required">Ph?????ng/X??</div>}
          className="form-input-custom"
          rules={[
            {
              required: true,
              validator(_, value) {
                return validateSpecialChars(_, value);
              },
              validateTrigger: 'onSubmit',
            },
          ]}
        >
          <SelectCustom
            className="select-form-custom"
            placeholder="Ch???n Ph?????ng/X??"
            bordered
            style={{ width: '100%' }}
            suffixIcon={<ChevronDownIcon />}
            onChange={(value) =>
              formInquiryCA.setFieldsValue({
                ward: value,
              })
            }
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
          name="fullAddress"
          label={<div className="label-txt-required">?????a ch??? ?????y ?????</div>}
          className="form-input-custom"
          rules={[
            {
              required: true,
              message: validate.required,
              validateTrigger: 'onSubmit',
            },
          ]}
        >
          <Input
            className="form-input-icon form-input-edit"
            placeholder="Nh???p ?????a ch??? ?????y ?????"
            prefix={<EditIcon />}
            onChange={(event) => {
              formInquiryCA.setFieldsValue({ fullAddress: event.target.value });
            }}
          />
        </Form.Item>
      </>
    );
  };

  const BuildFormAppoint = () => {
    return (
      <>
        <Form.Item
          name="position"
          label={<div className="label-txt-required">Ch???c v???</div>}
          className="form-input-custom"
          rules={[
            {
              required: true,
              message: validate.required,
              validateTrigger: 'onSubmit',
            },
          ]}
        >
          <Input
            className="form-input-icon form-input-edit"
            placeholder="Nh???p Ch???c v???"
            prefix={<EditIcon />}
            onChange={(value) => {
              formInquiryCA.setFieldsValue({ postion: value });
            }}
          />
        </Form.Item>
        <Form.Item
          name="createdAt"
          className="form-input-custom-date"
          label={<div className="label-txt-required">Ng??y ban h??nh</div>}
          // rules={[
          //   {
          //     required: true,
          //     message: 'Vui l??ng nh???p Ng??y ban h??nh!',
          //   },
          // ]}
        >
          {DatePickerCustom && (
            <DatePickerCustom
              key={'1'}
              suffixIcon={<DateRangeIcon />}
              placeholder="mm/dd/yyyy"
              clearIcon={false}
              onChange={(date: any) => {
                formInquiryCA.setFieldsValue({ dateOfBirth: date });
              }}
              disabledDate={(date: moment.Moment) => {
                const newDate = moment();
                return date > newDate;
              }}
              format={dateFormat}
            />
          )}
        </Form.Item>
        <Form.Item
          name="expire"
          className="form-input-custom-date"
          label={<div className="label-txt-required">Ng??y hi???u l???c</div>}
          // rules={[
          //   {
          //     required: true,
          //     message: 'Vui l??ng nh???p Ng??y hi???u l???c!',
          //   },
          // ]}
        >
          {DatePickerCustom && (
            <DatePickerCustom
              key={'1'}
              suffixIcon={<DateRangeIcon />}
              placeholder="mm/dd/yyyy"
              clearIcon={false}
              onChange={(date: any) => {
                formInquiryCA.setFieldsValue({ dateOfBirth: date });
              }}
              disabledDate={(date: moment.Moment) => {
                const newDate = moment();
                return date > newDate;
              }}
              format={dateFormat}
            />
          )}
        </Form.Item>
      </>
    );
  };

  const BuildFormInfoBusiness = () => {
    return (
      <div style={{ marginTop: '20px' }}>
        {checkFormByTypeDocument(typeDocument.id) === 'decideToEstablish' && <BuildFormInfoDNQD />}
        {(checkFormByTypeDocument(typeDocument.id) === 'businessForm' ||
          checkFormByTypeDocument(typeDocument.id) === 'decideToEstablish') && (
          <BuildFormInfoBussiness />
        )}
        {checkFormByTypeDocument(typeDocument?.id) === 'identificationForm' && (
          <BuildFormResident />
        )}
        {checkFormByTypeDocument(typeDocument?.id) === 'appoinmentDecisionForm' && (
          <BuildFormAppoint />
        )}
      </div>
    );
  };

  return (
    <Form
      layout={'inline'}
      className={'form-inline-text-vertical-grid'}
      style={{ gridTemplateColumns: 'repeat(1,1fr' }}
      form={formInquiryCA}
      onValuesChange={() => {
        handleOnChangeInput();
      }}
    >
      <div className="body-modal-upload" id="style-4">
        <div className="title-modal-upload">Lo???i t??i li???u</div>
        <div style={{ marginTop: '8px' }}>{BuildSelectTypeDocs}</div>
        <div style={{ margin: '10px 0' }}>
          <BuildFormUploadFile />
        </div>
        {checkFormByTypeDocument(typeDocument?.id) !== 'inquiryForm' && (
          <div className="title-info-document">Th??ng tin theo t??i li???u t???i l??n</div>
        )}
        {checkFormByTypeDocument(typeDocument?.id) === 'identificationForm' && (
          <BuildFormInfoUser />
        )}
        {checkFormByTypeDocument(typeDocument?.id) !== 'inquiryForm' && <BuildFormInfoBusiness />}
      </div>
    </Form>
  );
};

export default ViewModalUpload;
