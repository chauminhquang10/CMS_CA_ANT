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

  //#region api get tab hóa đơn
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

  //#region api get lịch sử khóa mở khóa CA
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

  //#region api get chi tiết khách hàng
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

  //#region	state & func modal thông báo confirm thông tin hồ sơ bản cứng

  const { run: runUpdateHardFile, loading: loadingUpdateHardFile } =
    useRequest<API.ResponseBaseInquireATrustCAResponse>(
      (params: API.UpdateHardFileStatusRequest) => updateHardFileStatus(params),
      {
        manual: true,
        onSuccess(data) {
          if (data) {
            notification.success({ message: 'Cập nhật thông tin hồ sơ thành công.' });
            runGetDetailOfTrustCA();
            setVisibleNotificationMain(false);
            setIsCheckedConfirm(true);
            setIsDisbleSwitch(true);
          } else {
            notification.error({ message: 'Có lỗi xảy ra khi cập nhật hồ sơ bản cứng' });
          }
        },
      },
    );

  const handleModalConfirm = () => {
    setTypeForm('confirmHardFile');
    setVisibleNotificationMain(true);
    setTitleNotifi('Thông báo');
    setDesNotifi(
      'Bạn có muốn xác nhận hoàn thành thông tin hồ sơ bản cứng? Thao tác này không thể	  hoàn tác',
    );
  };
  const handleActionConfirmHardFile = () => {
    runUpdateHardFile({ id: idCustomer, complete: true });
    return true;
  };
  //#endregion

  //#region logic xử lý khóa, mở khóa chứng thư
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
            notification.success({ message: 'Khóa/Mở khóa chứng thư số thành công' });
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
        message: 'Không thể thực hiện tạm khóa chứng thư đang có trạng thái ngưng hoạt động',
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

  //#region check loại file khi upload file
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
  //       message.error(`${file.name} không đúng định dạng file`);
  //       return Upload.LIST_IGNORE;
  //     }
  //     const isLt5M = file.size / 1024 / 1024 < 5;
  //     if (!isLt5M) {
  //       message.error(`${file.name} dung lượng vượt quá 5M`);
  //       return Upload.LIST_IGNORE;
  //     }
  //     return;
  //   }, []);
  //#endregion

  //#region logic xử lý thu hồi
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
            notification.success({ message: 'Thu hồi chứng thư số thành công' });
            runGetDetailOfTrustCA();
            setVisibleNotificationMain(false);
          } else {
            notification.error({ message: 'Có lỗi xảy ra khi thu hồi chứng thư' });
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
          title="Chi tiết khách hàng"
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
                title={'Thông tin khách hàng'}
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
                    <p className="lable-details lable-infor-customer">Người sở hữu</p>
                    <p className="lable-details lable-infor-customer">Số điện thoại</p>
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
                      tab="Chứng thư số"
                      className="overflow-y-custom style-4"
                      style={{ paddingRight: '20px' }}
                    >
                      <p className="lable-title-infor" style={{ paddingBottom: 8 }}>
                        Thông tin gói cước
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
                                    ? 'Mở khóa'
                                    : 'Khóa'
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
                                title={'Thu hồi'}
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
                          <span className="lable-details">Tên gói cước</span>
                          <p className="details-information" style={{ marginTop: 4 }}>
                            ---
                          </p>
                          <span className="lable-details">Đối tượng sử dụng</span>
                          <p className="details-information" style={{ marginTop: 4 }}>
                            {!individualOrEnterprise ? 'Cá nhân' : 'Tổ chức'}
                          </p>
                          <span className="lable-details">Trạng thái thanh toán</span>
                          <p className="details-information" style={{ marginTop: 4 }}>
                            {detailCAActive?.subscriptionInfo?.paymentStatus === 'PAID' ? (
                              <>
                                Đã thanh toán
                                <CheckCircleFillIcon style={{ marginLeft: 6 }} />
                              </>
                            ) : (
                              <>
                                Đang thanh toán
                                <CheckCircleFillIconX style={{ marginLeft: 6 }} />
                              </>
                            )}
                          </p>
                        </Col>
                        <Col span={8}>
                          <span className="lable-details">Trạng thái kích hoạt</span>
                          <p className="details-information" style={{ marginTop: 4 }}>
                            {detailCAActive?.subscriptionInfo?.activeStatus === 'ACTIVE' ? (
                              <>
                                Đã kích hoạt
                                <CheckCircleFillIcon style={{ marginLeft: 6 }} />
                              </>
                            ) : (
                              <>
                                Chưa kích hoạt
                                <CheckCircleFillIconX style={{ marginLeft: 6 }} />
                              </>
                            )}
                          </p>
                          <span className="lable-details">Trạng thái hoạt động</span>
                          <p className="details-information" style={{ marginTop: 4 }}>
                            {BuildDetailStatusOperating(detailCAActive)}
                          </p>
                          <span className="lable-details">Số serial chứng thư</span>
                          <p className="details-information" style={{ marginTop: 4 }}>
                            {detailCAActive?.subscriptionInfo?.inquiryCAId
                              ? detailCAActive?.subscriptionInfo.inquiryCAId
                              : '---'}
                          </p>
                        </Col>
                        <Col span={8}>
                          <span className="lable-details">Ngày bắt đầu</span>
                          <p className="details-information" style={{ marginTop: 4 }}>
                            {detailCAActive?.subscriptionInfo?.beginDate
                              ? convertDateTimeStr(detailCAActive?.subscriptionInfo.beginDate)
                              : '---'}
                          </p>
                          <span className="lable-details">Ngày hết hạn</span>
                          <p className="details-information" style={{ marginTop: 4 }}>
                            {detailCAActive?.subscriptionInfo?.beginDate
                              ? convertDateTimeStr(detailCAActive?.subscriptionInfo.expireDate)
                              : '---'}
                          </p>
                        </Col>
                      </Row>
                      <p className="lable-title-infor">Thông tin chứng thư</p>
                      {!individualOrEnterprise && (
                        <Row className="wrap-detail-infor">
                          <Col span={8}>
                            <span className="lable-details">Họ tên</span>
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
                            <span className="lable-details">Quốc gia</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.addressDetail?.city
                                ? detailCAActive?.caInfo.addressDetail?.city
                                : '---'}
                            </p>
                            <span className="lable-details">Tỉnh/Thành phố</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.addressDetail?.city
                                ? detailCAActive?.caInfo.addressDetail?.city
                                : '---'}
                            </p>
                            <span className="lable-details">Quận/Huyện</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.addressDetail?.district
                                ? detailCAActive?.caInfo.addressDetail?.district
                                : '---'}
                            </p>
                          </Col>
                          <Col span={8}>
                            <span className="lable-details">Phường/Xã</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.addressDetail?.ward
                                ? detailCAActive?.caInfo.addressDetail?.ward
                                : '---'}
                            </p>
                            <span className="lable-details">Địa chỉ đầy đủ</span>
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
                            THÔNG TIN ĐƠN VỊ
                          </Col>
                          <Col span={8}>
                            <span className="lable-details">Tên doanh nghiệp</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.enterpriseInfo?.enterpriseName
                                ? detailCAActive?.caInfo.enterpriseInfo.enterpriseName
                                : '---'}
                            </p>
                            <span className="lable-details">Mã số thuế</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.enterpriseInfo?.taxCode
                                ? detailCAActive?.caInfo.enterpriseInfo.taxCode
                                : '---'}
                            </p>
                            <span className="lable-details">Quốc gia</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              ---
                            </p>
                          </Col>
                          <Col span={8}>
                            <span className="lable-details">Tỉnh/Thành phố</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.enterpriseInfo?.addressDetail?.city
                                ? detailCAActive?.caInfo.enterpriseInfo.addressDetail?.city
                                : '---'}
                            </p>
                            <span className="lable-details">Quận/Huyện</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.enterpriseInfo?.addressDetail?.district
                                ? detailCAActive?.caInfo.enterpriseInfo.addressDetail?.district
                                : '---'}
                            </p>
                            <span className="lable-details">Phường/Xã</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.enterpriseInfo?.addressDetail?.ward
                                ? detailCAActive?.caInfo.enterpriseInfo.addressDetail?.ward
                                : '---'}
                            </p>
                          </Col>
                          <Col span={8}>
                            <span className="lable-details">Địa chỉ đầy đủ</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.enterpriseInfo?.addressDetail?.address
                                ? detailCAActive?.caInfo.enterpriseInfo.addressDetail?.address
                                : '---'}
                            </p>
                          </Col>
                          <Col span={24} className="div-under-organization-details" />

                          {/* <Col span={24} className="lable-organization-details">
                        THÔNG TIN LÃNH ĐẠO DOANH NGHIỆP (Giám đốc/Tổng giám đốc)
                      </Col>
                      <Col span={8}>
                        <span className="lable-details">Họ tên</span>
                        <p className="details-information" style={{ marginTop: 4 }}>
                          {dataTable[0].certificateInformation.organizationLeaderFullName}
                        </p>
                      </Col>
                      <Col span={8}>
                        <span className="lable-details">Số điện thoại</span>
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
                            NGƯỜI ĐẠI DIỆN MUA HÀNG
                          </Col>
                          <Col span={8}>
                            <span className="lable-details">Họ tên</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.buyerInfo?.fullName
                                ? detailCAActive?.caInfo?.buyerInfo?.fullName
                                : '---'}
                            </p>
                            <span className="lable-details">Chức vụ</span>
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
                            <span className="lable-details">Số điện thoại</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.buyerInfo?.phoneNumber
                                ? detailCAActive?.caInfo?.buyerInfo?.phoneNumber
                                : '---'}
                            </p>
                          </Col>
                          <Col span={24} className="div-under-organization-details" />

                          <Col span={24} className="lable-organization-details">
                            NGƯỜI SỞ HỮU CHỨNG THƯ
                          </Col>
                          <Col span={8}>
                            <span className="lable-details">Họ tên</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.ownerInfo?.fullName
                                ? detailCAActive?.caInfo?.ownerInfo?.fullName
                                : '---'}
                            </p>
                            <span className="lable-details">Chức vụ</span>
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
                            <span className="lable-details">Số điện thoại</span>
                            <p className="details-information" style={{ marginTop: 4 }}>
                              {detailCAActive?.caInfo?.ownerInfo?.phoneNumber
                                ? detailCAActive?.caInfo?.ownerInfo?.phoneNumber
                                : '---'}
                            </p>
                          </Col>
                        </Row>
                      )}
                      <p className="lable-title-infor">
                        <span style={{ marginRight: 8 }}>Thông tin hồ sơ bản mềm</span>
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
                        <span style={{ marginRight: 8 }}>Thông tin hồ sơ bản cứng</span>
                        <Switch
                          className="switch-custom"
                          onChange={() => {
                            handleModalConfirm();
                          }}
                          checked={isCheckedConfirm}
                          disabled={isDisbleSwitch}
                        />
                        {isDisbleSwitch && (
                          <span className="lable-finished-detail-infor">Hoàn thành</span>
                        )}
                        {!isDisbleSwitch && (
                          <span className="lable-unfinished-detail-infor">Chưa Hoàn thành</span>
                        )}
                      </p>
                    </ProCard.TabPane>
                    <ProCard.TabPane
                      key="tab2"
                      tab="Hóa đơn"
                      className="overflow-y-custom style-4"
                      style={{ paddingRight: '20px' }}
                    >
                      <Row gutter={16}>
                        <p className="lable-title-infor">Hóa đơn</p>
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
                    <ProCard.TabPane key="tab4" tab="Yêu cầu">
                      <Row gutter={16}>
                        <p className="lable-title-infor">Yêu cầu</p>
                      </Row>
                      <Row>
                        <BuildTableChildRequest item={dataBill} />
                      </Row>
                    </ProCard.TabPane> */}
                  </ProCard>
                </Row>
              </ProCard>

              <ModalMain
                title="Khóa chứng thư"
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
                          Hủy bỏ
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
                          Xác nhận
                        </button>,
                      ];
                    },
                  }}
                  onFinish={async () => {
                    handleModal();
                    setTypeForm('certificateLock');
                    setVisibleNotificationMain(true);
                    setTitleNotifi('Thông báo');
                    setDesNotifi(
                      ' Bạn có muốn xác nhận thao tác Khóa/Mở khóa chứng thư này? Thao tác này không thể hoàn tác.',
                    );
                    return true;
                  }}
                  className="custom-form-certificate-lock"
                >
                  {console.log('aaaaa', detailCAActive?.subscriptionInfo?.activeStatus)}
                  <ProForm.Group style={{ width: '100%', maxWidth: 756 }}>
                    <ProFormRadio.Group
                      name="radioLockOrUnlockCA"
                      label="Trạng thái"
                      options={[
                        {
                          label: 'Khóa',
                          value: 'lock',
                        },
                        {
                          label: 'Mở khóa',
                          value: 'unlock',
                        },
                      ]}
                      rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
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
                      label="Lý do"
                      showSearch
                      debounceTime={300}
                      className="custom-select"
                      style={{ marginRight: 50 }}
                      options={[
                        { label: 'Vi phạm hợp đồng', value: 'BREACH_OF_CONTRACT' },
                        { label: 'Cơ quan nhà nước', value: 'GOVERNMENT' },
                        { label: 'Khác', value: 'OTHER' },
                      ]}
                      placeholder="Chọn lý do"
                      rules={[{ required: true, message: 'Vui lòng chọn lý do' }]}
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
                      label="Chi tiết lý do"
                      placeholder="Nhập chi tiết"
                    />
                  )}

                  <Row style={{ alignItems: 'center' }}>
                    <ProCard
                      title="Lịch sử"
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
                title="Thu hồi chứng thư"
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
                          Hủy bỏ
                        </button>,
                        <button
                          key="next"
                          className="btn-accept-modal"
                          onClick={(e) => {
                            form?.submit();
                            e.preventDefault();
                          }}
                        >
                          Xác nhận
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
                    setTitleNotifi('Thông báo');
                    setDesNotifi(
                      ' Bạn có muốn xác nhận thu hồi chứng thư này? Thao tác này không thể  hoàn tác.',
                    );
                  }}
                  className="custom-form-certificate-lock"
                >
                  <ProFormSelect
                    name="selectReasonRecall"
                    label="Lý do"
                    showSearch
                    debounceTime={300}
                    className="custom-select"
                    options={[
                      { label: 'Vi phạm hợp đồng', value: 'BREACH_OF_CONTRACT' },
                      { label: 'Cơ quan nhà nước', value: 'GOVERNMENT' },
                      { label: 'Khác', value: 'OTHER' },
                    ]}
                    placeholder="Chọn lý do"
                    rules={[{ required: true, message: 'Vui lòng chọn lý do' }]}
                  />

                  {/* <Row style={{ alignItems: 'center' }} className="row-input-upload-custom">
                    <Col span={24} className="title-input-upload-custom">
                      Văn bản yêu cầu <span style={{ color: 'red' }}>*</span>
                    </Col>
                    <Col span={24} className="custom-input-upload">
                      <ProFormUploadButton
                        name="upload"
                        title="Tải lên"
                        label={
                          <>
                            <IconFile />
                            <span className="sub-title-input-upload">
                              Tải tệp lên (pdf, png, jpg, doc, xls)
                            </span>
                          </>
                        }
                        rules={[{ required: true, message: 'Vui lòng tải lên file' }]}
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
                        //   extra="Tải tệp lên (pdf, png, jpg, doc, xls)"
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
