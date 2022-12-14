import avatarImg from '@/assets/images/png/avatar/user-male.png';
import ButtonCustom from '@/components/Button';
import ModalMain from '@/components/Modal';
import ProcessCustom from '@/components/Process';
import { getInvoiceInfo } from '@/services/unicloud-ca-cms/InvoiceController';
import {
  getDetailOfTrustCA,
  getLockHistoryOfCa,
  lockOrUnlockCA,
  revokeACA,
  updateHardFileStatus,
} from '@/services/unicloud-ca-cms/TrustCMSController';
import {
  CheckCircleFillIcon,
  CheckCircleFillIconX,
  IconViewHistory,
  LockedIcon,
  LockIcon,
  RecallIcon,
} from '@/themes/icons';
import { convertDateTimeStr } from '@/utils/main';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormRadio,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-components';
import type { RadioChangeEvent } from 'antd';
import { Col, Image, notification, PageHeader, Row, Spin, Switch, Tooltip } from 'antd';
import { useCallback, useState } from 'react';
import { useLocation, useRequest } from 'umi';
import './index.less';
import {
  BuildBreadcrumb,
  BuildDetailStatusOperating,
  BuildTableChild,
  BuildTableChildBill,
  BuildTableChildHistory,
} from './main/ColumnTableTrust';
import ModalNotificationCustomerDetail from './modal/ModalNotificationCustomerDetail';

const CustomerDetails = () => {
  const [tab, setTab] = useState('tab1');
  const location = useLocation();
  const idCustomer = location.query?.userId as string;
  const [detailCAActive, setDetailCAActive] = useState<API.GetDetailOfTrustCAResponse>();
  const [detailReceipt, setDetailReceipt] = useState<API.GetInvoiceInfoResponse>();
  const [detailLockHistoryOfCa, setDetailLockHistoryOfCa] =
    useState<API.GetLockHistoryOfCAResponse>();
  const [individualOrEnterprise, setIndividualOrEnterprise] = useState<boolean | undefined>(false);
  const percentSuccess = Math.floor(
    ((detailCAActive?.softDocumentInfo?.numOfAvailableDocument as number) * 100) /
      (detailCAActive?.softDocumentInfo?.numberOfDocument as number),
  );

  const [isCheckedConfirm, setIsCheckedConfirm] = useState(detailCAActive?.hardDocumentStatus);
  const [isDisbleSwitch, setIsDisbleSwitch] = useState(detailCAActive?.hardDocumentStatus);

  //#region api get tab h??a ????n
  const { run: runGetDetailBill } = useRequest<API.ResponseBaseGetInvoiceInfoResponse>(
    getInvoiceInfo,
    {
      manual: true,
      onSuccess(data) {
        if (data) {
          setDetailReceipt(data);
        }
      },
      onError(error) {
        console.log(error);
      },
    },
  );
  //#endregion

  //#region api get l???ch s??? kh??a m??? kh??a CA
  const { run: runGetLockHistoryOfCa } = useRequest<API.ResponseBaseGetLockHistoryOfCAResponse>(
    () => getLockHistoryOfCa({ id: idCustomer }),
    {
      manual: true,
      onSuccess(data) {
        if (data) {
          setDetailLockHistoryOfCa(data);
        }
      },
      onError(error) {
        console.log(error);
      },
    },
  );
  //#endregion

  //#region api get chi ti???t kh??ch h??ng
  const { loading, run: runGetDetailOfTrustCA } =
    useRequest<API.ResponseBaseGetDetailOfTrustCAResponse>(
      () => getDetailOfTrustCA({ id: idCustomer }),
      {
        onSuccess(data) {
          if (data) {
            const result = data;
            setIndividualOrEnterprise(result?.subscriptionInfo?.individualOrEnterprise);
            setDetailCAActive(result);
            runGetDetailBill({ transactionId: result?.transactionId });
            runGetLockHistoryOfCa();
            setIsCheckedConfirm(result?.hardDocumentStatus);
            setIsDisbleSwitch(result?.hardDocumentStatus);
          }
        },
        onError(error) {
          console.log(error);
        },
      },
    );
  //#endregion

  //#region	state modal main nofication
  const [titleNotifi, setTitleNotifi] = useState('');
  const [desNotifi, setDesNotifi] = useState('');
  const [typeForm, setTypeForm] = useState<
    'certificateLock' | 'certificateRecall' | 'confirmHardFile'
  >('certificateLock');
  const [visibleNotificationMain, setVisibleNotificationMain] = useState(false);
  //#endregion

  //#region	state & func modal th??ng b??o confirm th??ng tin h??? s?? b???n c???ng

  const { run: runUpdateHardFile, loading: loadingUpdateHardFile } =
    useRequest<API.ResponseBaseInquireATrustCAResponse>(
      (params: API.UpdateHardFileStatusRequest) => updateHardFileStatus(params),
      {
        manual: true,
        onSuccess(data) {
          if (data) {
            notification.success({ message: 'C???p nh???t th??ng tin h??? s?? th??nh c??ng.' });
            runGetDetailOfTrustCA();
            setVisibleNotificationMain(false);
            setIsCheckedConfirm(true);
            setIsDisbleSwitch(true);
          } else {
            notification.error({ message: 'C?? l???i x???y ra khi c???p nh???t h??? s?? b???n c???ng' });
          }
        },
      },
    );

  const handleModalConfirm = () => {
    setTypeForm('confirmHardFile');
    setVisibleNotificationMain(true);
    setTitleNotifi('Th??ng b??o');
    setDesNotifi(
      'B???n c?? mu???n x??c nh???n ho??n th??nh th??ng tin h??? s?? b???n c???ng? Thao t??c n??y kh??ng th???	  ho??n t??c',
    );
  };
  const handleActionConfirmHardFile = () => {
    runUpdateHardFile({ id: idCustomer, complete: true });
    return true;
  };
  //#endregion

  //#region logic x??? l?? kh??a, m??? kh??a ch???ng th??
  const [formCustomLock] = ProForm.useForm();
  const [visible, setVisible] = useState(false);
  const [isDisabledActionLock, setIsDisabledActionLock] = useState(true);
  const [visibleTextAreaReason, setVisibleTextAreaReason] = useState(false);
  const handleModal = useCallback(() => {
    setVisible(!visible);
  }, [visible]);
  const { run: runLockOrUnlockCA, loading: loadingLockOrUnlockCA } =
    useRequest<API.ResponseBaseLockACAResponse>(
      (params: API.LockACARequest) => lockOrUnlockCA(params),
      {
        manual: true,
        onSuccess(data) {
          if (data) {
            notification.success({ message: 'Kh??a/M??? kh??a ch???ng th?? s??? th??nh c??ng' });
            formCustomLock.resetFields();
            setVisibleNotificationMain(false);
            runGetDetailOfTrustCA();
          }
        },
      },
    );
  const handleLock = () => {
    if (detailCAActive?.subscriptionInfo?.activeStatus === 'STOP') {
      setVisibleNotificationMain(false);
      notification.error({
        message: 'Kh??ng th??? th???c hi???n t???m kh??a ch???ng th?? ??ang c?? tr???ng th??i ng??ng ho???t ?????ng',
      });
      return;
    } else {
      formCustomLock.validateFields().then((values) => {
        runLockOrUnlockCA({
          id: idCustomer,
          lock: values?.radioLockOrUnlockCA === 'lock',
          reason: values?.selectLockOrUnlockCA,
        });
      });
      return true;
    }
  };
  //#endregion

  //#region check lo???i file khi upload file
  //   const handleBeforeUpload = useCallback((file: RcFile) => {
  //     const isCorrectFileType =
  //       file.type === 'image/png' ||
  //       file.type === 'image/jpg' ||
  //       file.type === 'application/pdf' ||
  //       file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
  //       file.type === 'application/vnd.ms-excel' ||
  //       file.type === 'application/msword' ||
  //       file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  //     if (!isCorrectFileType) {
  //       message.error(`${file.name} kh??ng ????ng ?????nh d???ng file`);
  //       return Upload.LIST_IGNORE;
  //     }
  //     const isLt5M = file.size / 1024 / 1024 < 5;
  //     if (!isLt5M) {
  //       message.error(`${file.name} dung l?????ng v?????t qu?? 5M`);
  //       return Upload.LIST_IGNORE;
  //     }
  //     return;
  //   }, []);
  //#endregion

  //#region logic x??? l?? thu h???i
  const [visibleRecall, setVisibleRecall] = useState(false);
  const [formCustomRecall] = ProForm.useForm();
  const handleModalRecall = () => {
    setVisibleRecall(!visibleRecall);
  };

  const { run: runRecallCA, loading: loadingRecallCA } =
    useRequest<API.ResponseBaseRevokeACAResponse>(
      (params: API.RevokeACARequest) => revokeACA(params),
      {
        manual: true,
        onSuccess(data) {
          if (data) {
            notification.success({ message: 'Thu h???i ch???ng th?? s??? th??nh c??ng' });
            runGetDetailOfTrustCA();
            setVisibleNotificationMain(false);
          } else {
            notification.error({ message: 'C?? l???i x???y ra khi thu h???i ch???ng th??' });
          }
        },
      },
    );

  const handleActionRecall = () => {
    formCustomRecall.validateFields().then((values) => {
      runRecallCA({ id: idCustomer, reason: values?.selectReasonRecall });
    });
    return true;
  };
  //#endregion

  return (
    <>
      <div className="wrapper-page-container">
        <PageHeader
          breadcrumbRender={BuildBreadcrumb}
          title="Chi ti???t kh??ch h??ng"
          className="custom-page-header"
        />
        <PageContainer className="page-container-custom-v2" pageHeaderRender={false}>
          {loading && (
            <div style={{ width: '100%', textAlign: 'center' }}>
              <Spin size="large" />
            </div>
          )}
          {!loading && (
            <>
              <ProCard
                title={'Th??ng tin kh??ch h??ng'}
                style={{
                  width: '100%',
                }}
                className="card-custom-details-infor-wrap"
              >
                <Row gutter={16} style={{ marginTop: 20, paddingLeft: 12 }}>
                  <Col span={3} className="col-avatar">
                    <Image
                      src={
                        detailCAActive?.userInfo?.avatar
                          ? `data:image/png;base64,${detailCAActive?.userInfo?.avatar}`
                          : avatarImg
                      }
                    />
                  </Col>
                  <Col span={3}>
                    <p className="lable-details lable-infor-customer">Ng?????i s??? h???u</p>
                    <p className="lable-details lable-infor-customer">S??? ??i???n tho???i</p>
                    <p className="lable-details lable-infor-customer">Email</p>
                  </Col>
                  <Col span={17}>
                    <p className="details-information details-infor-customer">
                      {detailCAActive?.userInfo?.fullName}
                    </p>
                    <p className="details-information details-infor-customer">
                      {detailCAActive?.userInfo?.phone}
                      {detailCAActive?.userInfo?.verifiedPhone ? (
                        <CheckCircleFillIcon style={{ marginLeft: 6 }} />
                      ) : (
                        <CheckCircleFillIconX style={{ marginLeft: 6 }} />
                      )}
                    </p>
                    <p className="details-information details-infor-customer">
                      {detailCAActive?.userInfo?.email}
                      {detailCAActive?.userInfo?.verifiedMail ? (
                        <CheckCircleFillIcon style={{ marginLeft: 6 }} />
                      ) : (
                        <CheckCircleFillIconX style={{ marginLeft: 6 }} />
                      )}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <ProCard
                    tabs={{
                      tabPosition: 'top',
                      activeKey: tab,
                      onChange: (key) => {
                        setTab(key);
                      },
                    }}
                    className="card-custom-details-infor"
                  >
                    <ProCard.TabPane
                      key="tab1"
                      tab="Ch???ng th?? s???"
                      className="overflow-y-custom style-4"
                      style={{ paddingRight: '20px' }}
                    >
                      <p className="lable-title-infor" style={{ paddingBottom: 8 }}>
                        Th??ng tin g??i c?????c
                        {
                          <>
                            <span
                              style={{
                                float: 'right',
                                display: 'flex',
                                alignItems: 'center',
                                columnGap: '12px',
                              }}
                            >
                              <Tooltip
                                placement="bottomRight"
                                title={
                                  detailCAActive?.subscriptionInfo?.activeStatus === 'LOCK'
                                    ? 'M??? kh??a'
                                    : 'Kh??a'
                                }
                                overlayClassName="tooltip-custom"
                              >
                                <ButtonCustom
                                  className={` btn-custom custom-button-details-page ${
                                    detailCAActive?.subscriptionInfo?.activeStatus === 'LOCK'
                                      ? 'is-lock'
                                      : ''
                                  }`}
                                  onClick={() => handleModal()}
                                  disabled={
                                    detailCAActive?.subscriptionInfo?.activeStatus === 'REVOKE'
                                      ? true
                                      : false
                                  }
                                >
                                  {detailCAActive?.subscriptionInfo?.activeStatus === 'LOCK' ? (
                                    <LockedIcon />
                                  ) : (
                                    <LockIcon />
                                  )}
                                </ButtonCustom>
                              </Tooltip>
                              <Tooltip
                                placement="bottomRight"
                                title={'Thu h???i'}
                                overlayClassName="tooltip-custom"
                              >
                                <ButtonCustom
                                  className="btn-custom custom-button-details-page"
                                  onClick={() => handleModalRecall()}
                                  disabled={
                                    detailCAActive?.subscriptionInfo?.activeStatus === 'REVOKE'
                                      ? true
                                      : false
                                  }
                                >
                                  <RecallIcon />
                                </ButtonCustom>
                              </Tooltip>
                            </span>
                          </>
                        }
                      </p>
                      <Row className="wrap-detail-infor">
                        <Col span={8}>
                          <span className="lable-details">T??n g??i c?????c</span>
                          <p className="details-information" style={{ marginTop: 4 }}>
                            ---
                          </p>
                          <span className="lable-details">?????i t?????ng s??? d???ng</span>
                          <p className="details-information" style={{ marginTop: 4 }}>
                            {!individualOrEnterprise ? 'C?? nh??n' : 'T??? ch???c'}
                          </p>
                          <span className="lable-details">Tr???ng th??i thanh to??n</span>
                          <p className="details-information" style={{ marginTop: 4 }}>
                            {detailCAActive?.subscriptionInfo?.paymentStatus === 'PAID' ? (
                              <>
                                ???? thanh to??n
                                <CheckCircleFillIcon style={{ marginLeft: 6 }} />
                              </>
                            ) : (
                              <>
                                ??ang thanh to??n
                                <CheckCircleFillIconX style={{ marginLeft: 6 }} />
                              </>
                            )}
                          </p>
                        </Col>
                        <Col span={8}>
                          <span className="lable-details">Tr???ng th??i k??ch ho???t</span>
                          <p className="details-information" style={{ marginTop: 4 }}>
                            {detailCAActive?.subscriptionInfo?.activeStatus === 'ACTIVE' ? (
                              <>
                                ???? k??ch ho???t
                                <CheckCircleFillIcon style={{ marginLeft: 6 }} />
                              </>
                            ) : (
                              <>
                                Ch??a k??ch ho???t
                                <CheckCircleFillIconX style={{ marginLeft: 6 }} />
                              </>
                            )}
                          </p>
                          <span className="lable-details">Tr???ng th??i ho???t ?????ng</span>
                          <p className="details-information" style={{ marginTop: 4 }}>
                            {BuildDetailStatusOperating(detailCAActive)}
                          </p>
                          <span className="lable-details">S??? serial ch???ng th??</span>
                          <p className="details-information" style={{ marginTop: 4 }}>
                            {detailCAActive?.subscriptionInfo?.inquiryCAId
                              ? detailCAActive?.subscriptionInfo.inquiryCAId
                              : '---'}
                          </p>
                        </Col>
                        <Col span={8}>
                          <span className="lable-details">Ng??y b???t ?????u</span>
                          <p className="details-information" style={{ marginTop: 4 }}>
                            {detailCAActive?.subscriptionInfo?.beginDate
                              ? convertDateTimeStr(detailCAActive?.subscriptionInfo.beginDate)
                              : '---'}
                          </p>
                          <span className="lable-details">Ng??y h???t h???n</span>
                          <p className="details-information" style={{ marginTop: 4 }}>
                            {detailCAActive?.subscriptionInfo?.beginDate
                              ? convertDateTimeStr(detailCAActive?.subscriptionInfo.expireDate)
                              : '---'}
                          </p>
                        </Col>
                      </Row>
                      <p className="lable-title-infor">Th??ng tin ch???ng th??</p>
                      {!individualOrEnterprise && (
                        <Row className="wrap-detail-infor">
                          <Col span={8}>
                            <span className="lable-details">H??? t??n</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.ownerInfo?.fullName
                                ? detailCAActive?.caInfo.ownerInfo.fullName
                                : '---'}
                            </p>
                            <span className="lable-details">Email</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.ownerInfo?.emailAddress
                                ? detailCAActive?.caInfo.ownerInfo.emailAddress
                                : '---'}
                            </p>
                          </Col>
                          <Col span={8}>
                            <span className="lable-details">Qu???c gia</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.addressDetail?.city
                                ? detailCAActive?.caInfo.addressDetail?.city
                                : '---'}
                            </p>
                            <span className="lable-details">T???nh/Th??nh ph???</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.addressDetail?.city
                                ? detailCAActive?.caInfo.addressDetail?.city
                                : '---'}
                            </p>
                            <span className="lable-details">Qu???n/Huy???n</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.addressDetail?.district
                                ? detailCAActive?.caInfo.addressDetail?.district
                                : '---'}
                            </p>
                          </Col>
                          <Col span={8}>
                            <span className="lable-details">Ph?????ng/X??</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.addressDetail?.ward
                                ? detailCAActive?.caInfo.addressDetail?.ward
                                : '---'}
                            </p>
                            <span className="lable-details">?????a ch??? ?????y ?????</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.addressDetail?.address
                                ? detailCAActive?.caInfo.addressDetail?.address
                                : '---'}
                            </p>
                          </Col>
                        </Row>
                      )}
                      {individualOrEnterprise && (
                        <Row className="wrap-detail-infor">
                          <Col span={24} className="lable-organization-details">
                            TH??NG TIN ????N V???
                          </Col>
                          <Col span={8}>
                            <span className="lable-details">T??n doanh nghi???p</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.enterpriseInfo?.enterpriseName
                                ? detailCAActive?.caInfo.enterpriseInfo.enterpriseName
                                : '---'}
                            </p>
                            <span className="lable-details">M?? s??? thu???</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.enterpriseInfo?.taxCode
                                ? detailCAActive?.caInfo.enterpriseInfo.taxCode
                                : '---'}
                            </p>
                            <span className="lable-details">Qu???c gia</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              ---
                            </p>
                          </Col>
                          <Col span={8}>
                            <span className="lable-details">T???nh/Th??nh ph???</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.enterpriseInfo?.addressDetail?.city
                                ? detailCAActive?.caInfo.enterpriseInfo.addressDetail?.city
                                : '---'}
                            </p>
                            <span className="lable-details">Qu???n/Huy???n</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.enterpriseInfo?.addressDetail?.district
                                ? detailCAActive?.caInfo.enterpriseInfo.addressDetail?.district
                                : '---'}
                            </p>
                            <span className="lable-details">Ph?????ng/X??</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.enterpriseInfo?.addressDetail?.ward
                                ? detailCAActive?.caInfo.enterpriseInfo.addressDetail?.ward
                                : '---'}
                            </p>
                          </Col>
                          <Col span={8}>
                            <span className="lable-details">?????a ch??? ?????y ?????</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.enterpriseInfo?.addressDetail?.address
                                ? detailCAActive?.caInfo.enterpriseInfo.addressDetail?.address
                                : '---'}
                            </p>
                          </Col>
                          <Col span={24} className="div-under-organization-details" />

                          {/* <Col span={24} className="lable-organization-details">
                        TH??NG TIN L??NH ?????O DOANH NGHI???P (Gi??m ?????c/T???ng gi??m ?????c)
                      </Col>
                      <Col span={8}>
                        <span className="lable-details">H??? t??n</span>
                        <p className="details-information" style={{ marginTop: 4 }}>
                          {dataTable[0].certificateInformation.organizationLeaderFullName}
                        </p>
                      </Col>
                      <Col span={8}>
                        <span className="lable-details">S??? ??i???n tho???i</span>
                        <p className="details-information" style={{ marginTop: 4 }}>
                          {dataTable[0].certificateInformation.organizationLeaderTelephone}
                        </p>
                      </Col>
                      <Col span={8}>
                        <span className="lable-details">Email</span>
                        <p className="details-information" style={{ marginTop: 4 }}>
                          {dataTable[0].certificateInformation.organizationLeaderEmail}
                        </p>
                      </Col>
                      <Col span={24} className="div-under-organization-details" /> */}

                          <Col span={24} className="lable-organization-details">
                            NG?????I ?????I DI???N MUA H??NG
                          </Col>
                          <Col span={8}>
                            <span className="lable-details">H??? t??n</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.buyerInfo?.fullName
                                ? detailCAActive?.caInfo?.buyerInfo?.fullName
                                : '---'}
                            </p>
                            <span className="lable-details">Ch???c v???</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              ---
                            </p>
                          </Col>
                          <Col span={8}>
                            <span className="lable-details">Email</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.buyerInfo?.emailAddress
                                ? detailCAActive?.caInfo?.buyerInfo?.emailAddress
                                : '---'}
                            </p>
                            <span className="lable-details">S??? ??i???n tho???i</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.buyerInfo?.phoneNumber
                                ? detailCAActive?.caInfo?.buyerInfo?.phoneNumber
                                : '---'}
                            </p>
                          </Col>
                          <Col span={24} className="div-under-organization-details" />

                          <Col span={24} className="lable-organization-details">
                            NG?????I S??? H???U CH???NG TH??
                          </Col>
                          <Col span={8}>
                            <span className="lable-details">H??? t??n</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.ownerInfo?.fullName
                                ? detailCAActive?.caInfo?.ownerInfo?.fullName
                                : '---'}
                            </p>
                            <span className="lable-details">Ch???c v???</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              ---
                            </p>
                          </Col>
                          <Col span={8}>
                            <span className="lable-details">Email</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.ownerInfo?.emailAddress
                                ? detailCAActive?.caInfo?.ownerInfo?.emailAddress
                                : '---'}
                            </p>
                            <span className="lable-details">S??? ??i???n tho???i</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.ownerInfo?.phoneNumber
                                ? detailCAActive?.caInfo?.ownerInfo?.phoneNumber
                                : '---'}
                            </p>
                          </Col>
                        </Row>
                      )}
                      <p className="lable-title-infor">
                        <span style={{ marginRight: 8 }}>Th??ng tin h??? s?? b???n m???m</span>
                        <ProcessCustom
                          type="circle"
                          percent={percentSuccess}
                          width={40}
                          status="success"
                          format={() => (
                            <span>
                              {detailCAActive?.softDocumentInfo?.numOfAvailableDocument} /
                              {detailCAActive?.softDocumentInfo?.numberOfDocument}
                            </span>
                          )}
                        />
                      </p>
                      <Row>
                        {detailCAActive?.softDocumentInfo?.trustDocuments?.ID_CARD && (
                          <BuildTableChild
                            item={
                              detailCAActive?.softDocumentInfo.trustDocuments as API.TrustDocument
                            }
                          />
                        )}
                      </Row>

                      <p className="lable-title-infor" style={{ marginTop: 32 }}>
                        <span style={{ marginRight: 8 }}>Th??ng tin h??? s?? b???n c???ng</span>
                        <Switch
                          className="switch-custom"
                          onChange={() => {
                            handleModalConfirm();
                          }}
                          checked={isCheckedConfirm}
                          disabled={isDisbleSwitch}
                        />
                        {isDisbleSwitch && (
                          <span className="lable-finished-detail-infor">Ho??n th??nh</span>
                        )}
                        {!isDisbleSwitch && (
                          <span className="lable-unfinished-detail-infor">Ch??a Ho??n th??nh</span>
                        )}
                      </p>
                    </ProCard.TabPane>
                    <ProCard.TabPane
                      key="tab2"
                      tab="H??a ????n"
                      className="overflow-y-custom style-4"
                      style={{ paddingRight: '20px' }}
                    >
                      <Row gutter={16}>
                        <p className="lable-title-infor">H??a ????n</p>
                      </Row>
                      <Row>{detailReceipt && <BuildTableChildBill item={detailReceipt} />}</Row>
                    </ProCard.TabPane>
                    {/* <ProCard.TabPane key="tab3" tab="Ticket">
                      <Row gutter={16}>
                        <p className="lable-title-infor">Ticket</p>
                      </Row>
                      <Row>
                        <BuildTableChildBill item={dataBill} />
                      </Row>
                    </ProCard.TabPane>
                    <ProCard.TabPane key="tab4" tab="Y??u c???u">
                      <Row gutter={16}>
                        <p className="lable-title-infor">Y??u c???u</p>
                      </Row>
                      <Row>
                        <BuildTableChildRequest item={dataBill} />
                      </Row>
                    </ProCard.TabPane> */}
                  </ProCard>
                </Row>
              </ProCard>

              <ModalMain
                title="Kh??a ch???ng th??"
                visible={visible}
                handle={() => handleModal()}
                className="modal-lock-certificate"
                footer={false}
              >
                <ProForm
                  form={formCustomLock}
                  submitter={{
                    render: ({ form, reset }) => {
                      return [
                        <button
                          key="rest"
                          className="btn-decline-modal"
                          onClick={(e) => {
                            setIsDisabledActionLock(true);
                            setVisible(!visible);
                            reset();
                            e.preventDefault();
                          }}
                        >
                          H???y b???
                        </button>,
                        <button
                          key="next"
                          className={`btn-accept-modal ${
                            isDisabledActionLock ? 'btn-accept-modal-disabled' : ''
                          }`}
                          onClick={(e) => {
                            form?.submit();
                            e.preventDefault();
                          }}
                          disabled={isDisabledActionLock}
                        >
                          X??c nh???n
                        </button>,
                      ];
                    },
                  }}
                  onFinish={async () => {
                    handleModal();
                    setTypeForm('certificateLock');
                    setVisibleNotificationMain(true);
                    setTitleNotifi('Th??ng b??o');
                    setDesNotifi(
                      ' B???n c?? mu???n x??c nh???n thao t??c Kh??a/M??? kh??a ch???ng th?? n??y? Thao t??c n??y kh??ng th??? ho??n t??c.',
                    );
                    return true;
                  }}
                  className="custom-form-certificate-lock"
                >
                  {console.log('aaaaa', detailCAActive?.subscriptionInfo?.activeStatus)}
                  <ProForm.Group style={{ width: '100%', maxWidth: 756 }}>
                    <ProFormRadio.Group
                      name="radioLockOrUnlockCA"
                      label="Tr???ng th??i"
                      options={[
                        {
                          label: 'Kh??a',
                          value: 'lock',
                        },
                        {
                          label: 'M??? kh??a',
                          value: 'unlock',
                        },
                      ]}
                      rules={[{ required: true, message: 'Vui l??ng ch???n tr???ng th??i' }]}
                      fieldProps={{
                        onChange(e: RadioChangeEvent) {
                          if (
                            e.target.value ===
                            (detailCAActive?.subscriptionInfo?.activeStatus === 'LOCK'
                              ? 'lock'
                              : 'unlock')
                          ) {
                            setIsDisabledActionLock(true);
                          } else setIsDisabledActionLock(false);
                        },
                        defaultValue:
                          detailCAActive?.subscriptionInfo?.activeStatus === 'LOCK' ? 'lock' : '',
                      }}
                    />
                    <ProFormSelect
                      name="selectLockOrUnlockCA"
                      label="L?? do"
                      showSearch
                      debounceTime={300}
                      className="custom-select"
                      style={{ marginRight: 50 }}
                      options={[
                        { label: 'Vi ph???m h???p ?????ng', value: 'BREACH_OF_CONTRACT' },
                        { label: 'C?? quan nh?? n?????c', value: 'GOVERNMENT' },
                        { label: 'Kh??c', value: 'OTHER' },
                      ]}
                      placeholder="Ch???n l?? do"
                      rules={[{ required: true, message: 'Vui l??ng ch???n l?? do' }]}
                      fieldProps={{
                        onChange(value) {
                          if (value === 'OTHER') setVisibleTextAreaReason(true);
                          else setVisibleTextAreaReason(false);
                        },
                      }}
                    />
                  </ProForm.Group>
                  {visibleTextAreaReason && (
                    <ProFormTextArea
                      name="detailReasonOther"
                      label="Chi ti???t l?? do"
                      placeholder="Nh???p chi ti???t"
                    />
                  )}

                  <Row style={{ alignItems: 'center' }}>
                    <ProCard
                      title="L???ch s???"
                      ghost
                      gutter={8}
                      collapsible
                      defaultCollapsed
                      collapsibleIconRender={() => <IconViewHistory />}
                      className="custom-collap-view-history"
                    >
                      <Row>
                        {detailLockHistoryOfCa && (
                          <BuildTableChildHistory
                            item={detailLockHistoryOfCa as API.GetLockHistoryOfCAResponse}
                          />
                        )}
                      </Row>
                    </ProCard>
                  </Row>
                </ProForm>
              </ModalMain>
              <ModalMain
                title="Thu h???i ch???ng th??"
                visible={visibleRecall}
                handle={() => handleModalRecall()}
                className="modal-recall"
                footer={false}
              >
                <ProForm
                  form={formCustomRecall}
                  submitter={{
                    render: ({ form, reset }) => {
                      return [
                        <button
                          key="rest"
                          className="btn-decline-modal"
                          onClick={(e) => {
                            setVisibleRecall(!visibleRecall);
                            reset();
                            e.preventDefault();
                          }}
                        >
                          H???y b???
                        </button>,
                        <button
                          key="next"
                          className="btn-accept-modal"
                          onClick={(e) => {
                            form?.submit();
                            e.preventDefault();
                          }}
                        >
                          X??c nh???n
                        </button>,
                      ];
                    },
                  }}
                  onValuesChange={(_, values) => {
                    console.log(values);
                  }}
                  onFinish={async () => {
                    handleModalRecall();
                    setTypeForm('certificateRecall');
                    setVisibleNotificationMain(true);
                    setTitleNotifi('Th??ng b??o');
                    setDesNotifi(
                      ' B???n c?? mu???n x??c nh???n thu h???i ch???ng th?? n??y? Thao t??c n??y kh??ng th???  ho??n t??c.',
                    );
                  }}
                  className="custom-form-certificate-lock"
                >
                  <ProFormSelect
                    name="selectReasonRecall"
                    label="L?? do"
                    showSearch
                    debounceTime={300}
                    className="custom-select"
                    options={[
                      { label: 'Vi ph???m h???p ?????ng', value: 'BREACH_OF_CONTRACT' },
                      { label: 'C?? quan nh?? n?????c', value: 'GOVERNMENT' },
                      { label: 'Kh??c', value: 'OTHER' },
                    ]}
                    placeholder="Ch???n l?? do"
                    rules={[{ required: true, message: 'Vui l??ng ch???n l?? do' }]}
                  />

                  {/* <Row style={{ alignItems: 'center' }} className="row-input-upload-custom">
                    <Col span={24} className="title-input-upload-custom">
                      V??n b???n y??u c???u <span style={{ color: 'red' }}>*</span>
                    </Col>
                    <Col span={24} className="custom-input-upload">
                      <ProFormUploadButton
                        name="upload"
                        title="T???i l??n"
                        label={
                          <>
                            <IconFile />
                            <span className="sub-title-input-upload">
                              T???i t???p l??n (pdf, png, jpg, doc, xls)
                            </span>
                          </>
                        }
                        rules={[{ required: true, message: 'Vui l??ng t???i l??n file' }]}
                        fieldProps={{
                          multiple: true,
                          accept: `image/png, image/jpg, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, 
					application/vnd.ms-excel, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf`,
                          name: 'file',
                          beforeUpload: (file: RcFile) => handleBeforeUpload(file),
                          showUploadList: {
                            showRemoveIcon: true,
                            removeIcon: (
                              <div
                                onClick={(e) => console.log(e, 'custom removeIcon event')}
                                style={{ width: '16px', height: '16px' }}
                                className="custom-icon-remove-file"
                              >
                                <CloseOutFillIcon />
                              </div>
                            ),
                          },
                        }}
                        action="/upload.do"
                        //   extra="T???i t???p l??n (pdf, png, jpg, doc, xls)"
                      />
                    </Col>
                  </Row> */}
                </ProForm>
              </ModalMain>
              <ModalNotificationCustomerDetail
                title={titleNotifi}
                description={desNotifi}
                visible={visibleNotificationMain}
                onCancle={() => setVisibleNotificationMain(false)}
                onClick={() =>
                  typeForm === 'certificateLock'
                    ? handleLock()
                    : typeForm === 'certificateRecall'
                    ? handleActionRecall()
                    : handleActionConfirmHardFile()
                }
                isLoading={
                  typeForm === 'certificateLock'
                    ? loadingLockOrUnlockCA
                    : typeForm === 'certificateRecall'
                    ? loadingRecallCA
                    : loadingUpdateHardFile
                }
              />
            </>
          )}
        </PageContainer>
      </div>
    </>
  );
};

export default CustomerDetails;
