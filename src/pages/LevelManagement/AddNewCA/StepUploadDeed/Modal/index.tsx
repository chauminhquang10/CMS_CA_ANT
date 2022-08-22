import ButtonCustom from '@/components/Button';
import ModalMain from '@/components/Modal';
import SelectCustom from '@/components/Select';
import { ApproveStatus } from '@/pages/LevelManagement/RequestListPage/data';
import { uploadTrustDocument1 } from '@/services/unicloud-ca-cms/TrustController';
import { ArrowDownIcon, FileSaveIcon } from '@/themes/icons';
import { Form, notification, Select } from 'antd';
import type { RcFile, UploadChangeParam } from 'antd/lib/upload';
import type { UploadFile } from 'antd/lib/upload/interface';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import type { BeforeUploadValueType, ListUploadModel, UploadRequestOption } from '../model';
import { TrustDocumentType } from '../model';

import DataCity from '@/assets/json/vn.json';

import {
  approveCA,
  uploadAppointmentDecision,
  uploadInfoOfEnterpriseCA,
  uploadInfoOfOwnerCA,
  uploadInquiryCAForm,
} from '@/services/unicloud-ca-cms/TrustCMSController';
import { dateFormat } from '@/utils/main';
import { messageResponse } from '@/utils/Message/message';
import ModalCheckOwner from '../../Modal/ModalCheckOwnerId';
import './style.less';
import ViewModalUpload from './ViewModal';
import { listTypeDocumentBusiness, listTypeDocument } from '../Main/SelectUpload';

export type DistrictModel = {
  idProvince?: string;
  idDistrict?: string;
  name?: string;
  [key: string]: any;
};

type FileUploadDocument = {
  id: string;
  ownerCAId: string;
  trustDocumentType: any;
  file?: File;
};

type ModalConfirmProps = {
  isModalVisible: boolean;
  dataForm: API.GetInquiryCAByIdResponse;
  listDocument: API.TrustDocument[];
  onCancel: (value?: boolean) => void;
  onChangeUploadFile?: (props: UploadChangeParam) => void;
  upLoadFile?: (options: UploadRequestOption) => void;
  beforeUpload?: (
    file: RcFile,
    FileList: RcFile[],
  ) => BeforeUploadValueType | Promise<BeforeUploadValueType>;
  typeDocument: TypeDocumentModel;
  trustDocumentSelected?: API.TrustDocument;
  deleteFileUpload?: () => void;
  handleCallbackFunc: (typeDeed: TypeDocumentModel) => void;
};

type TypeDocumentModel = {
  key: number;
  title: string;
  value: string;
  id: keyof typeof TrustDocumentType;
  isIvidual: boolean;
};

const { commune, district, province } = DataCity;

const { Option } = Select;
const menu = [
  {
    label: <span>{ApproveStatus.SUCCESSFULLY_APPROVED}</span>,
    key: ApproveStatus.SUCCESSFULLY_APPROVED,
  },
  {
    label: <span>{ApproveStatus.UNSUCCESSFULLY_APPROVED}</span>,
    key: ApproveStatus.UNSUCCESSFULLY_APPROVED,
  },
];

const filterSelectedTypeDeed = (listSelected: ListUploadModel[], type: string) => {
  let typeDeedCurrent: TypeDocumentModel = {
    id: 'CCCD',
    isIvidual: false,
    key: 0,
    title: '',
    value: '',
  };
  for (let i = 0; i < listSelected.length; i++) {
    const typeDeed = listSelected[i];
    for (let j = 0; j < typeDeed?.listChild?.length; j++) {
      const itemTypeDeed = typeDeed?.listChild[j] as TypeDocumentModel;
      if (type === itemTypeDeed?.id) {
        typeDeedCurrent = itemTypeDeed;
        break;
      }
    }
  }
  return typeDeedCurrent;
};

/**
 * filterDistrictOrCommune() - filter list district or commune by idFilter
 * @param filer  'district' | 'commune'
 * @param idFilter
 * @param listDistrict
 * @returns {district} list district filter By idProvince
 * @returns {commune} list commune filter By idDistrict
 */
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

/**
 * createListUpload() create list file for listUpload ant design
 * @param list - list want to convert
 * @param listConvert - list converted
 * @returns {customListUpload} - List for Component Upload in antdesign
 *
 */
const createListUpload = (list: string[], listConvert?: any[]) => {
  const customListUpload: UploadFile[] = [];
  const lengthList = list?.length;

  for (let index = 0; index < lengthList; index++) {
    const uid = listConvert?.length ? listConvert?.length + 1 : customListUpload?.length + 1;
    const nameIndex = listConvert?.length ? listConvert?.length + 1 : customListUpload.length + 1;
    const element = list[index];
    customListUpload.push({
      uid: uid.toString(),
      name: `File ${nameIndex}`,
      status: 'done',
      response: 'done',
      url: element,
    });
  }
  return customListUpload;
};

const ModalConfirm: React.FC<ModalConfirmProps> = (props) => {
  const {
    onCancel,
    handleCallbackFunc,
    isModalVisible,
    dataForm,
    typeDocument,
    trustDocumentSelected,
    listDocument,
  } = props;
  const [formInquiryCA] = Form.useForm();
  const [statusApproveCA, setStatusApproveCA] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>();
  const [defaultFileList, setDefaultFileList] = useState<UploadFile[]>([]);
  const [listDistrict, setDistricts] = useState<DistrictModel[]>([]);
  const [listCommune, setListCommune] = useState<DistrictModel[]>([]);
  const [individualCA, setIndividualCA] = useState<API.IndividualCA>();
  const [enterpriseCA, setEnterpriseCA] = useState<API.EnterpriseCA>();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [fileListsUploadNew, setFileLists] = useState<File[]>([]);
  const [uploadFileDocument] = useState<FileUploadDocument>({
    id: dataForm?.id || '',
    ownerCAId: dataForm?.userId || '',
    trustDocumentType: typeDocument?.id || '',
  });
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [typeDeedSelected, setTypeDeedSelected] = useState<TypeDocumentModel>(typeDocument);

  const titleBtnSave = trustDocumentSelected?.approve && isEdit ? 'Chỉnh sửa và duyệt' : 'Duyệt';

  const [isvisbleModalConfirm, setisvisbleModalConfirm] = useState<boolean>(false);
  useEffect(() => {
    setTypeDeedSelected(() => {
      return typeDocument;
    });
  }, [isModalVisible, typeDocument]);

  /**
   * useEffect() set list document uploaded
   * @param {trustDocumentSelected}
   * @param {formInquiryCA}
   */
  useEffect(() => {
    if (trustDocumentSelected && trustDocumentSelected?.documentUrlList) {
      const listDocumentNew = createListUpload(trustDocumentSelected?.documentUrlList);
      setDefaultFileList(listDocumentNew);
      formInquiryCA?.setFieldsValue({ documentUrlList: trustDocumentSelected?.documentUrlList });
    } else {
      setDefaultFileList([]);
    }
  }, [typeDeedSelected?.id, formInquiryCA, trustDocumentSelected]);

  /**
   * useEffect() set status approve ca
   * @param {trustDocumentSelected}
   * @param {formInquiryCA}
   */
  useEffect(() => {
    if (trustDocumentSelected?.approve) {
      setStatusApproveCA(ApproveStatus[trustDocumentSelected?.approve] || ApproveStatus.APPROVE);
    }
  }, [trustDocumentSelected]);

  const handleOk = () => {
    setConfirmLoading(true);
  };

  /**
   * SelectProvince() Select Address Details
   * @param filter - 'city' | 'district'
   * @param idFilter - ID city or district
   * @param type - 'DNQD' | 'DN'
   * @returns list - district or commune by idFilter
   */
  const SelectProvince = useCallback(
    async (filter: string, idFilter: string, type?: 'DNQD' | 'DN') => {
      setIsEdit(true);
      let listFilter: DistrictModel[] = [];

      switch (filter) {
        case 'city':
          setDistricts([]);
          setListCommune([]);
          const provinceSelected = province.find((prov) => idFilter === prov.idProvince);
          if (type === 'DNQD') {
            formInquiryCA.setFieldsValue({
              dnqdCity: provinceSelected?.name,
              dnqdDistrict: null,
              dnqdWard: null,
            });
          } else if (type === 'DN') {
            formInquiryCA.setFieldsValue({
              businessCity: provinceSelected?.name,
              businessDistrict: null,
              businessWard: null,
            });
          } else {
            formInquiryCA.setFieldsValue({
              city: provinceSelected?.name,
              district: null,
              ward: null,
            });
          }

          listFilter = await listFilter.concat(
            filterDistrictOrCommune('district', idFilter, district),
          );
          setDistricts(listFilter);
          break;
        case 'district':
          setListCommune([]);
          const districtSelected = district.find((dist) => idFilter === dist.idDistrict);
          switch (type) {
            case 'DNQD':
              formInquiryCA.setFieldsValue({
                dnqdDistrict: districtSelected?.name,
                dnqdWard: null,
              });
              break;
            case 'DN':
              formInquiryCA.setFieldsValue({
                businessDistrict: districtSelected?.name,
                businessWard: null,
              });
              break;

            default:
              formInquiryCA.setFieldsValue({
                district: districtSelected?.name,
                ward: null,
              });
              break;
          }

          listFilter = await listFilter.concat(
            filterDistrictOrCommune('commune', idFilter, district),
          );
          setListCommune(listFilter);
          break;
        default:
          break;
      }
    },
    [formInquiryCA],
  );

  /**
   * useEffect() set default value fields Form
   * @param {dataForm}
   * @param {formInquiryCA}
   */
  useEffect(() => {
    if (dataForm?.individualCA || dataForm?.enterpriseCA) {
      const individualCANew = dataForm?.individualCA;
      const enterprisceCANew = dataForm?.enterpriseCA;
      setIndividualCA(individualCANew);
      setEnterpriseCA(enterprisceCANew);
      formInquiryCA.setFieldsValue({
        uploadFile: trustDocumentSelected?.documentUrlList || [],
        fullName: individualCANew?.fullName || enterprisceCANew?.legalRepresentative?.fullName,
        cardId: individualCANew?.cardId || enterprisceCANew?.legalRepresentative?.cardId,
        sex: individualCANew?.sex || enterprisceCANew?.legalRepresentative?.sex || 'Nam',
        issueDate: individualCANew?.issueDate
          ? moment(individualCANew?.issueDate, dateFormat)
          : enterprisceCANew?.legalRepresentative?.issueDate
          ? moment(enterprisceCANew?.legalRepresentative?.issueDate, dateFormat)
          : null,
        dateOfBirth: individualCANew?.dateOfBirth
          ? moment(individualCANew?.dateOfBirth, dateFormat)
          : enterprisceCANew?.legalRepresentative?.dateOfBirth
          ? moment(enterprisceCANew?.legalRepresentative?.dateOfBirth, dateFormat)
          : null,
        expiry: individualCANew?.expiry
          ? moment(individualCANew?.expiry, dateFormat)
          : enterprisceCANew?.legalRepresentative?.expiry
          ? moment(enterprisceCANew?.legalRepresentative?.expiry, dateFormat)
          : null,
        /**
         * Set Information Individual
         */
        city: individualCANew?.addressDetail?.city || enterprisceCANew?.addressDetail?.city,
        district:
          individualCANew?.addressDetail?.district || enterprisceCANew?.addressDetail?.district,
        ward: individualCANew?.addressDetail?.ward || enterprisceCANew?.addressDetail?.ward,
        address:
          individualCANew?.addressDetail?.address || enterprisceCANew?.addressDetail?.address,
        fullAddress:
          individualCANew?.addressDetail?.address || enterprisceCANew?.addressDetail?.address,
        /**
         * Set Information Business
         */
        businessTaxCode: enterprisceCANew?.taxCode,
        enterpriseName: enterprisceCANew?.enterpriseName,
        businessCity: enterprisceCANew?.addressDetail?.city,
        businessDistrict: enterprisceCANew?.addressDetail?.district,
        businessWard: enterprisceCANew?.addressDetail?.ward,
        businessFullAddress: enterprisceCANew?.addressDetail?.address,
        /**
         * Set Information DNQD
         */
        dnqdTaxCode: enterprisceCANew?.dnqdinfoOfBusinessLicense?.taxCode,
        dnqdEnterpriseName: enterprisceCANew?.dnqdinfoOfBusinessLicense?.enterpriseName,
        dnqdCity: enterprisceCANew?.dnqdinfoOfBusinessLicense?.addressDetail?.city,
        dnqdDistrict: enterprisceCANew?.dnqdinfoOfBusinessLicense?.addressDetail?.district,
        dnqdWard: enterprisceCANew?.dnqdinfoOfBusinessLicense?.addressDetail?.ward,
        dnqdFullAddress: enterprisceCANew?.dnqdinfoOfBusinessLicense?.addressDetail?.address,

        /**
         * Set Form
         */
        position: enterprisceCANew?.legalRepresentationPosition,
      });
    } else {
      formInquiryCA?.setFieldsValue({
        file: trustDocumentSelected?.documentUrlList || [],
      });
    }
  }, [dataForm, individualCA, enterpriseCA, formInquiryCA, trustDocumentSelected]);

  useEffect(() => {
    const individualCANew = dataForm?.individualCA;
    const enterprisceCANew = dataForm?.enterpriseCA;
    if (individualCANew || enterprisceCANew) {
      // Function filter Address Detail By Address, City, Ward For Select Option
      const cityCurrent =
        individualCANew?.addressDetail?.city ||
        enterprisceCANew?.addressDetail?.city ||
        enterprisceCANew?.legalRepresentative?.addressDetail?.city;
      const districtCurrent =
        individualCANew?.addressDetail?.district ||
        enterprisceCANew?.addressDetail?.district ||
        enterprisceCANew?.legalRepresentative?.addressDetail?.district;
      if (cityCurrent && districtCurrent) {
        const itemFindCity = province.find((pronvItem) => {
          let nameNew = '';
          if (pronvItem?.name?.indexOf('Thành phố') > -1) {
            nameNew = pronvItem?.name?.slice(9, pronvItem?.name?.length);
          }

          return cityCurrent.indexOf(nameNew) > -1;
        });

        if (itemFindCity) {
          const newDistrict = district.filter(
            (districtItem) => districtItem.idProvince.includes(itemFindCity.idProvince) === true,
          );
          setDistricts(newDistrict);
          const itemFindDistrict = newDistrict.find(
            (distItem) => districtCurrent && distItem.name?.includes(districtCurrent) === true,
          );
          if (itemFindDistrict) {
            const newWard = commune.filter(
              (communeItem) =>
                communeItem.idDistrict?.includes(itemFindDistrict.idDistrict) === true,
            );
            setListCommune(newWard);
          }
        }
      }
    }
  }, [dataForm?.enterpriseCA, dataForm?.individualCA]);

  const onCancelModal = useCallback(() => {
    const clearStateModal = () => {
      setStatusApproveCA('');
      formInquiryCA.resetFields();
      setIsEdit(false);
      setDefaultFileList([]);
      setConfirmLoading(false);
      setFileLists([]);
      setEnterpriseCA({});
      setIndividualCA({});
    };
    clearStateModal();
    onCancel();
  }, [formInquiryCA, onCancel]);

  const handleOnChangeInput = () => {
    setIsEdit(true);
  };

  /**
   * beforeUpload() reset list document before upload file new
   * @param {setDefaultFileList}
   * @param {formInquiryCA}
   */
  const beforeUpload = () => {
    if (fileListsUploadNew?.length <= 0) {
      setDefaultFileList([]);
      formInquiryCA.setFieldsValue({ file: null });
    }
  };

  /**
   * onChangeUploadFiles() handle event upload file
   * @param propsFile UploadChangeParam<any>
   * @returns formImage - form upload file into serve
   */
  let count = 0;
  const onChangeUploadFiles = (propsFile: UploadChangeParam<any>) => {
    setIsEdit(true);
    count += 1;

    const { file } = propsFile;

    const newFile = new File([file], file?.name);
    if (file?.status !== 'removed') {
      if (defaultFileList?.length > 0 && fileListsUploadNew?.length <= 0 && count <= 1) {
        setDefaultFileList((prev) => prev.slice(0));
      }

      if (fileListsUploadNew?.length > 0) {
        setDefaultFileList((prev) => {
          return prev?.concat({
            uid: `${prev?.length + 1}`,
            name: `File ${prev?.length + 1}`,
            status: 'done',
            response: 'done',
            url: file?.url,
            originFileObj: {
              ...file?.originFileObj,
              name: file?.originFileObj?.name,
              uid: file?.uid,
            },
          });
        });
      } else {
        setDefaultFileList((prev) =>
          prev.concat({
            uid: count.toString(),
            name: `File ${count}`,
            status: 'done',
            response: 'done',
            url: file?.url,
            originFileObj: {
              ...file?.originFileObj,
              name: file?.originFileObj?.name,
              uid: file?.uid,
            },
          }),
        );
      }
      setFileLists((prev) => [...prev, newFile]);
    }
  };

  /**
   * deleteFileUpload() - delete file upload new
   * @param file - File
   * @returns defaultList
   * @returns listFileUploadNew
   */
  const deleteUploadFiles = (file: UploadFile<any>) => {
    setDefaultFileList((prev) =>
      prev?.filter((val) => file?.originFileObj?.uid !== val?.originFileObj?.uid),
    );
    setFileLists((prev) => prev?.filter((val) => file?.originFileObj?.name !== val?.name));
  };
  useEffect(() => {}, [trustDocumentSelected]);
  const submitForm = useCallback(async () => {
    setisLoading(true);
    /**
     * UploadFileDocument() - Upload file before approve CA
     * @returns listDocument - string[]
     */
    const UploadFileDocument = async () => {
      let listReq: string[] = [];
      try {
        const responseUpload = (await uploadTrustDocument1(
          { id: uploadFileDocument.id, trustDocumentType: typeDeedSelected?.id },
          fileListsUploadNew,
        )) as API.ResponseObject;
        if (
          responseUpload.message === 'Success' &&
          responseUpload?.data &&
          responseUpload?.data?.documentUrlList
        ) {
          const listDocumentNew = responseUpload?.data.documentUrlList;
          formInquiryCA.setFieldsValue({
            documentUrlList: listDocumentNew,
          });
          listReq = listReq.concat(listDocumentNew);
          return listReq;
        }
        throw new Error('');
      } catch (error) {
        console.log('error', error);
        notification.error({
          message: `Lỗi Upload File`,
          description: 'Không upload được File, Đơn đề nghị chưa được duyệt! Vui lòng làm lại!',
        });
        setisLoading(false);
        setisvisbleModalConfirm(false);
        return listReq;
      }
    };

    /**
     * ApproveCAForDeed - Approve CA for deed normal
     * @param listDocumentNew - string[]
     * @param reqApprove - API.ApproveEachDocumentOfInquiryCARequest
     * @returns
     */

    const ApproveCAForDeed = (
      listDocumentNew: string[],
      reqApprove: API.ApproveEachDocumentOfInquiryCARequest,
    ) => {
      formInquiryCA.validateFields().then(async (values) => {
        if (values && dataForm?.id && dataForm?.userId) {
          const formRequest = {
            id: dataForm?.id,
            address: values?.address,
            cardId:
              individualCA?.cardId || enterpriseCA?.legalRepresentative?.cardId || values?.cardId,
            dateOfBirth: moment(values?.dateOfBirth).utcOffset('+0700').format(dateFormat),
            edited: true,
            documentUrlList:
              listDocumentNew.length > 0
                ? listDocumentNew
                : trustDocumentSelected?.documentUrlList || [],
            email:
              enterpriseCA?.legalRepresentative?.emailAddress ||
              individualCA?.emailAddress ||
              dataForm?.buyerInfo?.emailAddress,
            expiry: moment(values?.expiry).utcOffset('+0700').format(dateFormat),
            fullName: values?.fullName,
            issueDate: moment(values?.issueDate).utcOffset('+0700').format(dateFormat),
            phone:
              enterpriseCA?.legalRepresentative?.phoneNumber ||
              individualCA?.phoneNumber ||
              dataForm?.buyerInfo?.phoneNumber,
            sex: values?.sex,
            trustDocumentType: typeDeedSelected?.id,
            ownerCAId: dataForm?.userId,
            addressDetail: {
              city: values?.businessCity || enterpriseCA?.addressDetail?.city || values?.city,
              district:
                values?.businessDistrict ||
                enterpriseCA?.addressDetail?.district ||
                values?.district,
              ward: values?.businessWard || enterpriseCA?.addressDetail?.ward || values?.ward,
              address:
                values?.businessFullAddress ||
                enterpriseCA?.addressDetail?.address ||
                values?.fullAddress,
            },
            taxCode: enterpriseCA?.taxCode || values?.businessTaxCode || values?.dnqdTaxCode,
            companyName: values?.enterpriseName,
            position: values.position,
          };

          if (TrustDocumentType[typeDeedSelected?.id] === TrustDocumentType.DECIDE_TO_ESTABLISH) {
            Object.assign(formRequest, {
              // Fields for DNQD
              dnqd: {
                enterpriseName: values?.dnqdEnterpriseName,
                taxCode: values?.dnqdTaxCode,
                addressDetail: {
                  city: values?.dnqdCity,
                  district: values?.dnqdDistrict,
                  ward: values?.dnqdWard,
                  address: values?.dnqdFullAddress,
                },
              },
            });
          }
          let responseEnterCA: API.ResponseObject = {};
          if (isEdit) {
            try {
              if (!dataForm?.individualOrEnterprise || typeDeedSelected?.isIvidual) {
                responseEnterCA = (await uploadInfoOfOwnerCA(formRequest)) as API.ResponseObject;
              } else if (
                dataForm?.individualOrEnterprise &&
                !typeDeedSelected?.isIvidual &&
                TrustDocumentType[typeDeedSelected?.id] !== TrustDocumentType.APPOINTMENT_DECISION
              ) {
                responseEnterCA = (await uploadInfoOfEnterpriseCA(
                  formRequest,
                )) as API.ResponseObject;
              } else if (
                TrustDocumentType[typeDeedSelected?.id] === TrustDocumentType.APPOINTMENT_DECISION
              ) {
                responseEnterCA = (await uploadAppointmentDecision(
                  formRequest,
                )) as API.ResponseObject;
              }
            } catch (error: any) {
              responseEnterCA = error?.data;
              setisvisbleModalConfirm(false);
              setIsEdit(false);
              setisLoading(false);
              onCancelModal();
              notification.error({
                message: messageResponse.uploadDeedUnSuccess,
                description: responseEnterCA?.message,
              });
            }
          }

          if (responseEnterCA?.message === 'Success' || !isEdit) {
            let responseApproveCa: API.ResponseBaseApproveEachDocumentOfInquiryCAResponse;
            try {
              responseApproveCa = (await approveCA(
                reqApprove,
              )) as API.ResponseBaseApproveEachDocumentOfInquiryCAResponse;

              if (responseApproveCa?.message === 'Success') {
                const messageNew =
                  responseApproveCa?.data?.approveSuccessfully === true
                    ? messageResponse?.approveSuccess
                    : messageResponse?.approveDeny;

                notification.success({
                  message: messageNew,
                });
                return;
              }
              throw new Error('');
            } catch (error: any) {
              notification.error({
                message: messageResponse?.approveError,
                description: error?.data?.code,
              });
            } finally {
              setisvisbleModalConfirm(false);
              setIsEdit(false);
              setisLoading(false);
              onCancelModal();
            }
          }
        }
      });
    };

    /**
     * ApproveCAForInquiryForm
     * @param reqApprove -  API.ApproveEachDocumentOfInquiryCARequest
     * @returns
     */
    const ApproveCAForInquiryForm = async (
      listDocumentNew: string[],
      reqApprove: API.ApproveEachDocumentOfInquiryCARequest,
    ) => {
      let responseUploadFormQuiryCA;
      if (listDocumentNew?.length > 0) {
        try {
          const reqUploadFormQuiryCA: API.UploadInquiryCAFormByAdminRequest = {
            id: dataForm?.id || '',
            documentUrlList: listDocumentNew,
            trustDocumentType: 'INQUIRY_CA_FORM',
            ownerCAId: dataForm?.userId || '',
          };

          responseUploadFormQuiryCA = (await uploadInquiryCAForm(
            reqUploadFormQuiryCA,
          )) as API.ResponseBaseUploadInquiryCAFormResponse;
          if (responseUploadFormQuiryCA?.message === 'Success') {
            notification.success({
              message: 'Upload hồ sơ thành công.',
            });
          }
        } catch (error: any) {
          console.log('error', error);
          notification?.error({
            message: 'Upload hồ sơ không thành công. Vui lòng thử lại!',
            description: `${error?.data?.code}`,
          });
          setisvisbleModalConfirm(false);
          setIsEdit(false);
          setisLoading(false);
          onCancelModal();
        }
      }
      if (listDocumentNew?.length > 0 && responseUploadFormQuiryCA?.message !== 'Success') {
        return;
      }

      try {
        const responseApproveCa = (await approveCA(
          reqApprove,
        )) as API.ResponseBaseApproveEachDocumentOfInquiryCAResponse;
        if (responseApproveCa?.message === 'Success') {
          const messageNew =
            responseApproveCa?.data?.approveSuccessfully === true
              ? messageResponse?.approveSuccess
              : messageResponse?.approveDeny;
          notification.success({
            message: messageNew,
          });

          return;
        }
        throw new Error('');
      } catch (error: any) {
        notification.error({
          message: messageResponse?.approveError,
          description: error?.data?.code,
        });
      } finally {
        setisvisbleModalConfirm(false);
        setIsEdit(false);
        setisLoading(false);
        onCancelModal();
      }
    };

    // Function Start
    let listDocumentNew: string[] = [];

    if (fileListsUploadNew.length > 0) {
      listDocumentNew = await UploadFileDocument();
      if (listDocumentNew.length <= 0) {
        return;
      }
    }

    const approve = statusApproveCA === ApproveStatus.SUCCESSFULLY_APPROVED ? true : false;
    const reqApprove = {
      id: dataForm?.id || '',
      trustDocumentType: typeDeedSelected?.id,
      approve: approve,
    } as const;
    if (TrustDocumentType[typeDeedSelected?.id] !== TrustDocumentType.INQUIRY_CA_FORM) {
      await ApproveCAForDeed(listDocumentNew, reqApprove);
    } else if (!typeDeedSelected?.isIvidual) {
      await ApproveCAForInquiryForm(listDocumentNew, reqApprove);
    }
  }, [
    fileListsUploadNew,
    statusApproveCA,
    dataForm?.id,
    dataForm?.userId,
    dataForm?.buyerInfo?.emailAddress,
    dataForm?.buyerInfo?.phoneNumber,
    dataForm?.individualOrEnterprise,
    typeDeedSelected?.id,
    typeDeedSelected?.isIvidual,
    uploadFileDocument.id,
    formInquiryCA,
    individualCA?.cardId,
    individualCA?.emailAddress,
    individualCA?.phoneNumber,
    enterpriseCA?.legalRepresentative?.cardId,
    enterpriseCA?.legalRepresentative?.emailAddress,
    enterpriseCA?.legalRepresentative?.phoneNumber,
    enterpriseCA?.addressDetail?.city,
    enterpriseCA?.addressDetail?.district,
    enterpriseCA?.addressDetail?.ward,
    enterpriseCA?.addressDetail?.address,
    enterpriseCA?.taxCode,
    trustDocumentSelected?.documentUrlList,
    isEdit,
    onCancelModal,
  ]);

  const onCloseApprove = useCallback(() => {
    setisvisbleModalConfirm(false);
  }, []);

  const onApproveCA = useCallback(() => {
    submitForm();
  }, [submitForm]);

  /**
   * beforeApproveCA() - open modal confirm approve ca
   *
   */
  const beforeApproveCA = useCallback(() => {
    formInquiryCA?.validateFields().then((values) => {
      if (values) {
        setisvisbleModalConfirm(true);
        setisLoading(false);
      }
    });
  }, [formInquiryCA]);

  const handleOnChangeSelectedDeed = (type: string) => {
    let typeDeedCurrent: TypeDocumentModel = {
      id: 'ID_CARD',
      isIvidual: false,
      key: 0,
      title: '',
      value: '',
    };
    if (dataForm?.individualOrEnterprise) {
      typeDeedCurrent = filterSelectedTypeDeed(listTypeDocumentBusiness, type);
    } else {
      typeDeedCurrent = filterSelectedTypeDeed(listTypeDocument, type);
    }
    setTypeDeedSelected(typeDeedCurrent);
    handleCallbackFunc(typeDeedCurrent);
  };

  /**
   * descriptionModal
   * @returns editInfoApproveSuccess
   * @returns eidtInfoApproveDeny
   * @returns approveDeed
   * @returns denyDeed
   *
   */
  const descriptionModal =
    trustDocumentSelected?.approve &&
    isEdit &&
    statusApproveCA === ApproveStatus.SUCCESSFULLY_APPROVED
      ? messageResponse.editInfoApproveSuccess
      : trustDocumentSelected?.approve &&
        isEdit &&
        statusApproveCA === ApproveStatus.UNSUCCESSFULLY_APPROVED
      ? messageResponse.eidtInfoApproveDeny
      : statusApproveCA === ApproveStatus.UNSUCCESSFULLY_APPROVED
      ? messageResponse.approveDeed
      : messageResponse.denyDeed;
  return (
    <>
      <ModalMain
        visible={isModalVisible}
        destroyOnClose={true}
        handle={() => onCancelModal()}
        onOk={() => handleOk()}
        confirmLoading={confirmLoading}
        footer={
          <div className="footer-custom-modal">
            <SelectCustom
              className="select-form-custom select-status-trust"
              placeholder=""
              bordered
              style={{ width: '155px' }}
              suffixIcon={<ArrowDownIcon style={{ color: '#0C3399' }} />}
              defaultValue={
                statusApproveCA ||
                (trustDocumentSelected?.approve && ApproveStatus[trustDocumentSelected?.approve]) ||
                ApproveStatus.APPROVE
              }
              value={statusApproveCA}
              onChange={(value) => {
                setStatusApproveCA(value);
              }}
            >
              {menu.map((type) => (
                <Option key={type.key} value={type.key}>
                  {type.label}
                </Option>
              ))}
            </SelectCustom>
            <ButtonCustom
              disabled={
                (isEdit && statusApproveCA && statusApproveCA !== ApproveStatus.APPROVING) ||
                (trustDocumentSelected?.approve &&
                  statusApproveCA &&
                  statusApproveCA !== ApproveStatus[trustDocumentSelected?.approve])
                  ? false
                  : true
              }
              className={`btn-custom btn-save btn-disable ${
                (isEdit && statusApproveCA && statusApproveCA !== ApproveStatus.APPROVING) ||
                (trustDocumentSelected?.approve &&
                  statusApproveCA &&
                  statusApproveCA !== ApproveStatus[trustDocumentSelected?.approve])
                  ? 'btn-primary'
                  : null
              }`}
              key={'submit'}
              onClick={() => beforeApproveCA()}
            >
              <FileSaveIcon />
              <span> {titleBtnSave}</span>
            </ButtonCustom>
          </div>
        }
        zIndex={999}
        maskClosable={false}
      >
        <ViewModalUpload
          listDocument={listDocument}
          defaultFileList={defaultFileList}
          formInquiryCA={formInquiryCA}
          listCommune={listCommune}
          listDistrict={listDistrict}
          province={province}
          typeDocument={typeDeedSelected}
          key={'view-modal-upload'}
          dataForm={dataForm}
          deleteFileUpload={(file) => {
            deleteUploadFiles(file);
          }}
          onChangeUploadFiles={(propsFile: UploadChangeParam<any>) =>
            onChangeUploadFiles(propsFile)
          }
          SelectProvince={(filter: string, idFilter: string, type?: 'DNQD' | 'DN' | undefined) =>
            SelectProvince(filter, idFilter, type)
          }
          beforeUpload={() => beforeUpload()}
          handleOnChangeInput={() => handleOnChangeInput()}
          handleOnChangeSelectedDeed={(type) => {
            handleOnChangeSelectedDeed(type);
          }}
        />
      </ModalMain>
      <ModalCheckOwner
        titleButton={'Đồng ý'}
        onCancle={() => onCloseApprove()}
        onCreate={() => onApproveCA()}
        visible={isvisbleModalConfirm}
        description={descriptionModal}
        zIndex={1000}
        isLoading={isLoading}
      />
    </>
  );
};
export default ModalConfirm;
