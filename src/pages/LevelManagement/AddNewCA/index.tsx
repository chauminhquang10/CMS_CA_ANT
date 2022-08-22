// import type { DataType } from '@/pages/LevelManagement/RequestListPage/data';
import ButtonCustom from '@/components/Button';
import StepCustom from '@/components/steps';
import { InquiryGlobalContext } from '@/context/global-context';
import { getInvoiceInfo } from '@/services/unicloud-ca-cms/InvoiceController';
import {
  checkIndividualCA,
  checkUserInfo,
  confirmPayment,
  createAnAccountForOwner,
  enterEnterpriseInfo,
  enterIndividualInfo,
  getInquiryCAById,
} from '@/services/unicloud-ca-cms/TrustCMSController';
import { getInfoTrustDocumentOfInquiryCA } from '@/services/unicloud-ca-cms/TrustController';
import { ArrowrightWhiteIcon } from '@/themes/icons';
import ArrowLeftWhiteIcon from '@/themes/icons/ArrowLeftWhite';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Breadcrumb, Form, notification, PageHeader, Steps } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { history, useLocation } from 'umi';
import BuildModalChild from './Modal/Modal';
import ModalCheckOwner from './Modal/ModalCheckOwnerId';
import { ConvertMessageResponse, StatusResponse } from './model';
import StepApprove from './StepApprove';
import StepCreateOwner from './StepCreateOwner';
import Step2EnterInfoUser from './StepEnterInfoCustomer';
import StepCASelectSignature from './StepSignaturePackage';
import StepUpdateDeed from './StepUpdateStatusDeed';
import Step3Upload from './StepUploadDeed';
import imageNotFound from '@/assets/images/png/not-found.png';
import './style.less';

const { Step } = Steps;

const messageApproveConfirm = 'Bạn có chắc chắn muốn duyệt hóa đơn này?';
const successConfirm = 'Đồng ý';
const successCreateAccount = 'Tạo tài khoản';
const messageErrorEnter =
  'Không hỗ trợ cấp phát chứng thư cá nhân đối với người sở hữu' +
  ' đang tồn tại chứng thư cá nhân, vui lòng kiểm tra lại';
const messageCreateAccount =
  'Người sở hữu chứng thư chưa có tài khoản UniID, vui lòng tạo' +
  ' tài khoản trước khi cấp phát chứng thư!';
const messageErrorData = 'Không lấy được dữ liệu. Vui lòng thử lại!';

const AddNewCA = () => {
  const [formOwner] = Form.useForm();
  const [formLeaderShip] = Form.useForm();
  const [formInfoUnit] = Form.useForm();
  const [formUserBuy] = Form.useForm();

  const location = useLocation();
  const isApprovePage = location.query?.isApprove;
  const isUpdatePage = location.query?.isUpdate;

  const [trustId, setTrustId] = useState<string>(location.query?.inquiryId as string);
  const [dataInQuiryCA, setDataInQuiryCA] = useState<API.GetInquiryCAByIdResponse>();
  const [dataTrustDocument, setDataTrustDocument] =
    useState<API.GetInfoTrustDocumentOfInquiryCAResponse>();
  const [isCheckPayment, setIsCheckPayment] = useState(false);
  const [titleBtnModal, setTitleBtnModal] = useState(successCreateAccount);
  const [isIndividual, setIsIndividual] = useState<boolean>(false);
  const [individualIndex, setIndividualIndex] = useState(0);
  const [stepCurrent, setStepCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isNextStep, setIsNextStep] = useState(false);
  const [transactionId, setTransactionId] = useState<string>('');
  const [dataInvoice, setDataInvoice] = useState<API.GetInvoiceInfoResponse>();
  const [isVisbleOwnerId, setIsVisbleOwnerId] = useState(false);
  const [descriptionOnwerId, setDescriptionOnwerId] = useState<React.ReactNode>();
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckAccount, setIsCheckAccount] = useState(false);
  const [statusFile, setStatusFile] = useState<boolean | string | undefined>();
  const [OwnerId, setOwnerId] = useState<string>();
  const [isCreateAccount, setIsCreateAccount] = useState<boolean>(false);
  const [isCreateCANew, setIsCreateCANew] = useState<boolean>(false);

  const { run } = useRequest(
    (params: { transactionId: string }) => {
      return getInvoiceInfo(params);
    },
    {
      refreshOnWindowFocus: false,
      manual: true,
      onSuccess: (data) => {
        const dataNew = data as API.ResponseBaseGetInvoiceInfoResponse;

        if (dataNew.message === 'Success' && dataNew.data) {
          setDataInvoice(dataNew.data);
        }
      },
      onError: (e: any) => {
        notification.error({
          message: messageErrorData,
          description: e?.data?.code,
        });
      },
    },
  );

  const { run: runGetInfoTrust } = useRequest(
    (params: { id: string }) => {
      return getInfoTrustDocumentOfInquiryCA(params);
    },
    {
      refreshOnWindowFocus: false,
      manual: true,
      onSuccess: (data) => {
        const newData = data as API.ResponseBaseGetInfoTrustDocumentOfInquiryCAResponse;
        if (newData?.message === 'Success') {
          setDataTrustDocument(newData?.data);
          setIsLoading(false);
        }
      },
      onError: (e: any) => {
        notification.error({
          message: messageErrorData,
          description: e?.data?.code,
        });
      },
    },
  );

  const { run: runGetInQuiryCAbyId } = useRequest(
    (params: { id: string }) => {
      return getInquiryCAById(params);
    },
    {
      refreshOnWindowFocus: false,
      manual: true,
      onSuccess: (data) => {
        const newData = data as API.ResponseBaseGetInquiryCAByIdResponse;
        if (newData?.message === 'Success') {
          setDataInQuiryCA(newData.data);
          if (newData?.data?.individualOrEnterprise) {
            setIsIndividual(!newData?.data?.individualOrEnterprise);
          }

          const isOnPayment = newData?.data?.isOnPayment;
          if (isOnPayment === 'PAID') {
            setIsCheckPayment(true);
          }
          const transactionIdNew = newData.data?.transactionId;
          if (transactionIdNew) {
            setTransactionId(transactionIdNew);
          }
        }
      },
      onError: (e: any) => {
        notification.error({
          message: messageErrorData,
          description: e?.data?.code,
        });
      },
    },
  );

  const { run: runConfirmPayment } = useRequest(
    (params: { transactionId: string }) => {
      return confirmPayment(params);
    },
    {
      manual: true,
      onSuccess: (data) => {
        const dataNew = data as API.ResponseBaseInquireATrustCAResponse;

        if (dataNew.message === 'Success') {
          notification?.success({
            message: 'Thanh toán thành công',
          });
          setIsVisbleOwnerId(false);
          setIsLoading(false);
          runGetInQuiryCAbyId({ id: trustId });
        } else if (dataNew.message === 'Inquiry ca has complete not yet') {
          notification.error({
            message: 'Thoanh toán không thành công. Vui lòng thử lại!',
            description: 'Yêu cầu CA chưa hoàn thành!',
          });
        }
      },
      onError: (e) => {
        console.log('e', e);

        setIsVisbleOwnerId(false);
        setIsLoading(false);
        notification.error({
          message: 'Thoanh toán không thành công. Vui lòng thử lại!',
          description: 'Yêu cầu CA chưa hoàn thành!',
        });
      },
    },
  );

  const onRefreshPage = useCallback(() => {
    setIsLoading(true);
    if (trustId) {
      runGetInQuiryCAbyId({ id: trustId });
      runGetInfoTrust({ id: trustId });
    }
  }, [runGetInQuiryCAbyId, runGetInfoTrust, trustId]);

  useEffect(() => {
    if (trustId) {
      setStepCurrent(2);
      runGetInfoTrust({ id: trustId });
    }
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [runGetInfoTrust, trustId]);

  useEffect(() => {
    if (trustId) {
      runGetInQuiryCAbyId({ id: trustId });
    }
  }, [runGetInQuiryCAbyId, trustId]);

  useEffect(() => {
    if (
      trustId &&
      dataTrustDocument?.numOfAvailableDocument === dataTrustDocument?.numberOfDocument &&
      dataInQuiryCA?.isApprovingCA === 'SUCCESSFULLY_APPROVED'
    ) {
      setIsNextStep(true);
    }
    if (
      trustId &&
      transactionId &&
      isApprovePage === 'true' &&
      dataTrustDocument?.numOfAvailableDocument === dataTrustDocument?.numberOfDocument &&
      dataInQuiryCA?.isApprovingCA === 'SUCCESSFULLY_APPROVED'
    ) {
      setIsNextStep(true);
      setStepCurrent(3);
    }
    if (stepCurrent === 3 && dataInQuiryCA?.isOnPayment === 'ON_PAYMENT') {
      setIsNextStep(false);
    }
    if (trustId && isUpdatePage === 'true' && dataInQuiryCA?.isOnPayment === 'PAID') {
      setStepCurrent(4);
    }
  }, [
    stepCurrent,
    trustId,
    dataInQuiryCA?.isApprovingCA,
    dataInQuiryCA?.isOnPayment,
    run,
    transactionId,
    dataTrustDocument?.numOfAvailableDocument,
    dataTrustDocument?.numberOfDocument,
    isApprovePage,
    isUpdatePage,
  ]);

  useEffect(() => {
    if (transactionId) {
      run({ transactionId: transactionId });
    }
  }, [transactionId, run]);

  const searchUserByPhone = useCallback(
    async (props: { fullName: string; phoneNumber: string; email: string }) => {
      const request = {
        fullName: props.fullName,
        phoneNumber: props.phoneNumber,
        email: props.email,
      };
      let response;
      try {
        response = (await checkUserInfo(request)) as API.ResponseObject;
      } catch (error) {
        console.log('err', error);
      } finally {
        return response;
      }
    },
    [],
  );

  const [formCreateUser] = Form.useForm();

  const handleStepCreateOwnerCa = useCallback(() => {
    setIsCreateAccount(true);
    setIsVisbleOwnerId(false);
  }, []);

  const onCloseCreate = useCallback(
    async (values: boolean) => {
      if (!values) {
        onRefreshPage();
        setIsVisbleOwnerId(false);
        setIsLoading(false);
      }
    },
    [onRefreshPage],
  );

  let count = 0;
  const handleConfirmPayment = () => {
    if (count > 1) return;
    setIsLoading(true);
    runConfirmPayment({ transactionId: transactionId });
    count = count + 1;
  };

  const titlePage = trustId ? 'Cấp phát' : 'Cấp phát mới';

  const onChangeValueStep1 = useCallback((value: number) => {
    setIndividualIndex(value);
    if (value === 0) {
      setIsIndividual(false);
    } else {
      setIsIndividual(true);
    }
  }, []);

  const handleSelectStatusFile = useCallback((value: boolean | string | undefined) => {
    setStatusFile(value);
  }, []);

  const confirmCreateNewCA = () => {
    setIsCheckAccount(true);
    setIsCreateCANew(false);
    setIsVisbleOwnerId(false);
  };

  const handleCheckUser = useCallback(
    async (phone: string) => {
      const checkIndividualCAInfo = async (props: {
        phoneNumber: string;
        fullName: string;
        emailAddress: string;
      }) => {
        let resultcheckIndividual: string | null = '';

        const req: API.CheckIndividualCARequest = {
          fullName: props.fullName,
          phoneNumber: props.phoneNumber,
          email: props.emailAddress,
        };
        try {
          const res = (await checkIndividualCA(req)) as API.ResponseBaseCheckIndividualCAResponse;

          if (res.message === 'Success') {
            setIsVisbleOwnerId(true);
            setDescriptionOnwerId(
              <span className="description-ownerid">
                Thông tin khách hàng đã được tìm thấy. Nhấn <strong>Đồng Ý</strong> để
                <strong> Tạo mới</strong> chứng thư!
              </span>,
            );
            setIsCreateCANew(true);
            setTitleBtnModal('Đồng ý');
            return resultcheckIndividual;
          }
          throw Error();
        } catch (error: any) {
          const dataError = error?.data;

          if (dataError.message === StatusResponse[502]) {
            setDescriptionOnwerId(messageErrorEnter);
            setIsVisbleOwnerId(true);
            setTitleBtnModal('Đã hiểu');
            resultcheckIndividual = StatusResponse[502];
            return resultcheckIndividual;
          } else {
            resultcheckIndividual = dataError?.code;
            return resultcheckIndividual;
          }
        }
      };

      const CheckOwnerId = async (values: any) => {
        let resultCheckOwnerId: string | null = '';
        setIsLoading(true);
        const request = {
          fullName: '',
          phoneNumber: values.phoneNumber,
          email: '',
        };
        const responseSearchPhone = await searchUserByPhone(request);
        if (
          responseSearchPhone?.message === 'Success' &&
          responseSearchPhone?.data?.ownerCAInfo !== null
        ) {
          formOwner.setFieldsValue({
            fullName: responseSearchPhone?.data?.ownerCAInfo?.fullName,
            emailAddress: responseSearchPhone?.data?.ownerCAInfo?.email,
            phoneNumber: responseSearchPhone?.data?.ownerCAInfo?.phone,
          });
          setOwnerId(responseSearchPhone.data?.ownerCAInfo?.id);

          if (isIndividual) {
            const requestCheckIndividualCA = {
              fullName: responseSearchPhone?.data?.ownerCAInfo?.fullName,
              emailAddress: responseSearchPhone?.data?.ownerCAInfo?.email,
              phoneNumber: responseSearchPhone?.data?.ownerCAInfo?.phone,
            };
            resultCheckOwnerId = await checkIndividualCAInfo(requestCheckIndividualCA);
          } else {
            setIsVisbleOwnerId(true);
            setDescriptionOnwerId(
              <span className="description-ownerid">
                Thông tin khách hàng đã được tìm thấy. Nhấn <strong>Đồng Ý</strong> để
                <strong> Tạo mới</strong> chứng thư!
              </span>,
            );
            setIsCreateCANew(true);
            setTitleBtnModal('Đồng ý');
          }
        } else if (
          responseSearchPhone?.message === 'Success' &&
          responseSearchPhone?.data?.ownerCAInfo === null
        ) {
          setTitleBtnModal(successCreateAccount);
          setIsVisbleOwnerId(true);
          setDescriptionOnwerId(
            <span className="description-ownerid">{messageCreateAccount}</span>,
          );
          resultCheckOwnerId = StatusResponse[105];
          formOwner?.setFieldsValue({
            fullName: null,
            emailAddress: null,
          });
        } else if (responseSearchPhone?.message === StatusResponse[144]) {
          notification.error({
            message: 'Có lỗi xảy ra',
            description: ConvertMessageResponse[144],
          });
          resultCheckOwnerId = StatusResponse[144];
        }
        setIsLoading(false);
        return resultCheckOwnerId;
      };
      let responseCheckOwner: string | null = '';
      if (stepCurrent === 1) {
        responseCheckOwner = await CheckOwnerId(phone);
        if (responseCheckOwner === StatusResponse[502]) {
          return;
        }
      }
      return responseCheckOwner;
    },
    [formOwner, isIndividual, searchUserByPhone, stepCurrent],
  );

  const onCreateOwnerCA = useCallback(() => {
    setIsLoading(true);

    let response;
    formOwner.validateFields().then(async (values) => {
      if (values) {
        const reqCreateAccount = {
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
          email: values.emailAddress,
        };
        try {
          response = (await createAnAccountForOwner(reqCreateAccount)) as API.ResponseObject;
          if (response.message === 'Success') {
            setIsCreateAccount(false);
            setIsLoading(false);
            const dataOwner = response?.data;
            setIsCheckAccount(true);
            setIsVisbleOwnerId(false);
            setOwnerId(dataOwner?.userId);

            formOwner.setFieldsValue({
              phoneNumber: dataOwner?.phoneNumber,
              fullName: dataOwner?.fullName,
              emailAddress: dataOwner?.email,
            });
            notification.success({
              message: 'Tạo tài khoản thành công!',
            });
            return response;
          }
        } catch (error: any) {
          notification.error({
            message: 'Tạo tài khoản không thành công!',
            description: error?.data?.message,
          });
          setIsLoading(false);
          return null;
        }
      }
      return null;
    });
    return response;
  }, [formOwner]);

  const BuildNotData = useMemo(() => {
    return (
      <>
        {stepCurrent > 1 && !isLoading && !dataInQuiryCA && (
          <div className="page-not-found">
            <img src={imageNotFound} alt="not found" />
            <span className="title-not-found">Không có dữ liệu</span>
          </div>
        )}
      </>
    );
  }, [stepCurrent, dataInQuiryCA, isLoading]);

  const BuildModalUpload = useMemo(() => {
    const onCancle = () => {
      setVisible(!visible);
      onRefreshPage();
    };

    return <BuildModalChild onCancle={onCancle} visible={visible} />;
  }, [onRefreshPage, visible]);

  const handleCheckPayment = (value: any) => {
    setIsCheckPayment(value);
    if (value === true) {
      setIsNextStep(true);
    } else {
      setIsNextStep(false);
    }
  };

  const BuildStepApprove = useMemo(() => {
    return (
      <>
        {stepCurrent === 3 && (
          <StepApprove
            isCheck={isCheckPayment}
            inforInvoice={dataInvoice}
            onCheckPayment={handleCheckPayment}
          />
        )}
      </>
    );
  }, [dataInvoice, isCheckPayment, stepCurrent]);

  const PrevSteps = useCallback(() => {
    if (stepCurrent === 0) return;
    if (stepCurrent === 1) {
      formOwner?.resetFields();
      setIsCheckAccount(false);
      setIsCreateAccount(false);
    }
    if (stepCurrent === 3) {
      const newUrl = `${location.pathname}?inquiryId=${trustId}`;
      history.push(newUrl);
      setIsCheckPayment(false);
    }
    if (stepCurrent === 4) {
      const newUrl = `${location.pathname}?inquiryId=${trustId}&isApprove=true`;
      history.push(newUrl);
    }

    setStepCurrent((nextStep) => Math.floor(nextStep - 1));
  }, [formOwner, location.pathname, stepCurrent, trustId]);

  const NextSteps = useCallback(async () => {
    const EnterEnterPriseInfo = async (values: any) => {
      setIsLoading(true);
      let resultCodeEnterPriseInfo: number | undefined;
      const reqEnterpriseInfo: API.EnterInfoOfEnterpriseCARequest = {
        buyerInfo: {
          emailAddress: values.emailAddressBuyer,
          fullName: values.fullNameBuyer,
          phoneNumber: values.phoneNumberBuyer,
        },
        contactAddressDetail: {
          address: values.address,
          city: values.city,
          district: values.district,
          ward: values.ward,
        },
        taxCode: values.taxCode,
        companyName: values.companyName,
        ownerCAId: OwnerId || '',
        subscriptionId: '1234563',
        subscriptionInterval: 12,
      };

      try {
        const resEnterpriseInfo = (await enterEnterpriseInfo(
          reqEnterpriseInfo,
        )) as API.ResponseBaseEnterInfoOfEnterpriseCAResponse;
        if (resEnterpriseInfo?.message === 'Success') {
          resultCodeEnterPriseInfo = resEnterpriseInfo?.code;
          const dataInquiry = resEnterpriseInfo?.data;
          if (dataInquiry?.inquiryCA) {
            setTrustId(dataInquiry?.inquiryCA);
            notification?.success({
              message: 'Tạo mới yêu cầu CA thành công.',
            });
          } else {
            throw new Error();
          }
        }
      } catch (error: any) {
        console.log('error', error);

        notification.error({
          message: 'Lỗi tạo CA',
          description: error?.data?.code,
        });
      } finally {
        setIsLoading(false);
        return resultCodeEnterPriseInfo;
      }
    };

    const EnterIndividualInfor = async (values: any) => {
      setIsLoading(true);
      let resultCodeEnterIndividualInfo: number | undefined;
      const reqEnterIndividualInfo: API.EnterInfoOfIndividualCARequest = {
        ownerCAId: OwnerId || '',
        subscriptionId: '1234563',
        subscriptionInterval: 12,
        contactAddressDetail: {
          address: values.address,
          city: values.city,
          district: values.district,
          ward: values.ward,
        },
      };

      try {
        const res = (await enterIndividualInfo(
          reqEnterIndividualInfo,
        )) as API.ResponseBaseEnterInfoOfIndividualCAResponse;
        if (res.message === 'Success') {
          const dataInquiry = res?.data;
          if (dataInquiry?.inquiryCAId) {
            resultCodeEnterIndividualInfo = res?.code;
            setTrustId(dataInquiry?.inquiryCAId);
            notification?.success({
              message: 'Tạo mới yêu cầu CA thành công.',
            });
          } else {
            throw new Error(`${res}`);
          }
        }
      } catch (error: any) {
        notification.error({
          message: 'Tạo mới yêu cầu CA không thành công!',
          description: `error ${error?.data?.code}`,
        });
      } finally {
        setIsLoading(false);
        return resultCodeEnterIndividualInfo;
      }
    };

    // step 1 - find user, if find, create new CA
    if (stepCurrent === 1 && isCheckAccount) {
      let resultEnterCA: number | undefined;
      await formOwner.validateFields().then(async (values) => {
        if (values) {
          if (!isIndividual) {
            resultEnterCA = await EnterEnterPriseInfo(values);
          } else {
            resultEnterCA = await EnterIndividualInfor(values);
          }
        }
      });
      if (resultEnterCA === undefined) {
        return;
      }
    }

    // step 1 - find user, if not found, create account UnicloudID or Unicloud CA
    if (stepCurrent === 1 && isCreateAccount) {
      const onCreate = await onCreateOwnerCA();
      if (!onCreate) {
        return;
      }
    }

    if (stepCurrent === 1 && !isCheckAccount) {
      return;
    }
    if (
      stepCurrent === 2 &&
      (dataTrustDocument?.numOfAvailableDocument !== dataTrustDocument?.numberOfDocument ||
        dataInQuiryCA?.isApprovingCA !== 'SUCCESSFULLY_APPROVED')
    ) {
      return;
    }
    if (
      stepCurrent === 2 &&
      (dataTrustDocument?.numOfAvailableDocument !== dataTrustDocument?.numberOfDocument ||
        dataInQuiryCA?.isApprovingCA === 'SUCCESSFULLY_APPROVED')
    ) {
      location.query = { ...location.query, isApprove: 'true' };
      const newUrl = `${location.pathname}?inquiryId=${trustId}&isApprove=true`;
      history.push(newUrl);
    }
    if (stepCurrent === 2 && dataInQuiryCA?.isOnPayment === 'PAID') {
      setIsCheckPayment(true);
    }
    if (stepCurrent === 3 && !isCheckPayment) {
      return;
    }
    if (stepCurrent === 3 && isCheckPayment && dataInQuiryCA?.isOnPayment !== 'PAID') {
      setTitleBtnModal(successConfirm);
      setDescriptionOnwerId(messageApproveConfirm);
      setIsVisbleOwnerId(true);
      return;
    }

    if (stepCurrent === 3 && dataInQuiryCA?.isOnPayment === 'PAID') {
      location.query = { ...location.query, isUpdate: 'true' };
      const newUrl = `${location.pathname}?inquiryId=${trustId}&isUpdate=true`;
      history.push(newUrl);
    }
    if (stepCurrent === 4) {
      console.log('files', statusFile);
    }
    setStepCurrent(Math.floor(stepCurrent + 1));
  }, [
    stepCurrent,
    isCheckAccount,
    isCreateAccount,
    dataTrustDocument?.numOfAvailableDocument,
    dataTrustDocument?.numberOfDocument,
    dataInQuiryCA?.isApprovingCA,
    dataInQuiryCA?.isOnPayment,
    isCheckPayment,
    OwnerId,
    formOwner,
    isIndividual,
    onCreateOwnerCA,
    location,
    trustId,
    statusFile,
  ]);

  const BuildBottom = useMemo(() => {
    return (
      <div className="bottom-card">
        <div className="group-btn-bottm">
          <ButtonCustom
            data-icon="icon"
            disabled={stepCurrent === 2 || stepCurrent === 0 ? true : false}
            className={`btn-custom ${
              stepCurrent === 2 || stepCurrent === 0 ? 'btn-disable-step' : 'btn-icon-text'
            }`}
            onClick={() => PrevSteps()}
          >
            <ArrowLeftWhiteIcon className="arrow-fill-blue" />
            Quay lại
          </ButtonCustom>
          <ButtonCustom
            data-icon="icon"
            disabled={
              (stepCurrent > 1 && !isNextStep && !statusFile) ||
              (stepCurrent === 1 && !isCheckAccount && !isCreateAccount) ||
              isLoading
            }
            className={`btn-custom ${
              (stepCurrent > 1 && !isNextStep && !statusFile) ||
              (stepCurrent === 1 && !isCheckAccount && !isCreateAccount) ||
              isLoading
                ? 'btn-disable-step'
                : 'btn-primary'
            }`}
            onClick={() => NextSteps()}
          >
            <ArrowrightWhiteIcon
              style={{
                transform: 'rotate(180deg)',
              }}
            />
            {stepCurrent === 4 ? 'Cập nhật' : 'Tiếp theo'}
          </ButtonCustom>
        </div>
      </div>
    );
  }, [
    stepCurrent,
    isNextStep,
    statusFile,
    isCheckAccount,
    isCreateAccount,
    isLoading,
    NextSteps,
    PrevSteps,
  ]);

  const BuildCreateUser = useMemo(() => {
    return <StepCreateOwner isLoading={isLoading} formCurrent={formOwner} />;
  }, [formOwner, isLoading]);

  const BuildBreadcrumb = () => {
    return (
      <Breadcrumb separator=">" className="breadcrumb-custom">
        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item>Danh sách yêu cầu</Breadcrumb.Item>
        <Breadcrumb.Item href="/">{titlePage}</Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  return (
    <div className="wrapper-page-container">
      <PageHeader
        breadcrumbRender={BuildBreadcrumb}
        title={titlePage}
        className="custom-page-header"
      >
        <StepCustom size="small" current={stepCurrent}>
          <Step title="Chọn gói chữ ký" />
          {!isCheckAccount && !isCreateAccount && <Step title="Kiểm tra thông tin tài khoản" />}
          {isCheckAccount && !isCreateAccount && <Step title="Nhập thông tin khách hàng" />}
          {isCreateAccount && <Step title="Tạo tài khoản khách hàng" />}
          <Step title="Upload hồ sơ chứng thư" />
          <Step title="Duyệt hóa đơn" />
          <Step title="Cập nhật tình trạng file cứng" />
        </StepCustom>
      </PageHeader>
      <PageContainer
        className="page-container-custom-v2"
        style={{ marginTop: 0 }}
        pageHeaderRender={false}
        loading={false}
      >
        <ProCard
          style={{
            width: '100%',
          }}
          bodyStyle={{
            borderRadius: '8px',
            padding: '15px 24px',
          }}
        >
          <InquiryGlobalContext.Provider
            value={{
              isLoading,
              individualIndex,
              isCheckAccount,
              formOwner,
              isIndividual,
              formLeaderShip,
              formInfoUnit,
              formUserBuy,
              dataInQuiryCA,
              dataTrustDocument,
              isVisbleOwnerId,
              descriptionOnwerId,
              formCreateUser,
              onChangeValueStep1,
            }}
          >
            {stepCurrent === 0 && (
              <div className="max-width-819">
                <StepCASelectSignature
                  onChangeValue={(value) => onChangeValueStep1(value)}
                  individualIndex={0}
                />
              </div>
            )}
            {stepCurrent === 1 && !isCreateAccount && (
              <div className="max-width-1199">
                <Step2EnterInfoUser handleCheckUser={(value) => handleCheckUser(value)} />
              </div>
            )}
            {stepCurrent === 1 && isCreateAccount && <>{BuildCreateUser}</>}
            {stepCurrent === 2 && <Step3Upload onRefreshPage={() => onRefreshPage()} />}
            {BuildNotData}
            {BuildStepApprove}
            {stepCurrent === 4 && (
              <StepUpdateDeed onSelect={(value) => handleSelectStatusFile(value)} />
            )}
            <ModalCheckOwner
              onCancle={(values) => onCloseCreate(values)}
              onCreate={
                isApprovePage
                  ? () => handleConfirmPayment()
                  : isCreateCANew
                  ? () => confirmCreateNewCA()
                  : () => handleStepCreateOwnerCa()
              }
              titleButton={titleBtnModal}
              visible={isVisbleOwnerId}
              description={descriptionOnwerId}
              isLoading={isLoading}
              formCreateUser={formCreateUser}
            />
          </InquiryGlobalContext.Provider>
          {BuildBottom}
        </ProCard>

        {/* <BuildModalChild onCancle={onCancle} visible={visible} /> */}
        {BuildModalUpload}
      </PageContainer>
    </div>
  );
};

export default AddNewCA;
