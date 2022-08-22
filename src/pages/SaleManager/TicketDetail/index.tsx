import {
  DeleteIconTicketDetail,
  FileSaveIconTicket,
  NoteIcon,
  NoteIconTicket,
} from '@/themes/icons';
import {
  PageContainer,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Breadcrumb, Card, Col, PageHeader, Row } from 'antd';
import { useCallback, useMemo } from 'react';
import { useLocation } from 'umi';
import './index.less';

const TicketDetail = () => {
  const location = useLocation();
  const isCreated = (location.query?.isCreated as string) === '1';
  console.log('isCreated', isCreated);

  //   const [resultRespon, setResultRespon] = useState<API.PageInquiryCADto>();
  //   const [listCAActive, setListCAActive] = useState<API.InquiryCADto>();

  //   const { run: runGetAllCA } = useRequest(
  //     (params = { phone: '', page: 0, size: 10 }) => getAllCAActive(params),
  //     {
  //       manual: true,
  //       onSuccess(data: any) {
  //         const dataNews = data as { inquiryCAList: API.PageInquiryCADto };
  //         if (dataNews && dataNews?.inquiryCAList?.content) {
  //           setResultRespon(data?.inquiryCAList);
  //           setListCAActive(data?.inquiryCAList.content);
  //         }
  //       },
  //       onError(error) {
  //         console.log(error);
  //       },
  //     },
  //   );

  const BuildBreadcrumb = useCallback(() => {
    return (
      <Breadcrumb separator=">" className="breadcrumb-custom">
        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item>Ticket</Breadcrumb.Item>
        <Breadcrumb.Item href="/sale-manager/ticket-list">Danh sách Ticket</Breadcrumb.Item>
      </Breadcrumb>
    );
  }, []);

  const BuildPageHeader = useMemo(() => {
    return (
      <PageHeader
        breadcrumbRender={BuildBreadcrumb}
        title="Danh Sách Ticket"
        className="custom-page-header"
      >
        <div className="group-filter"></div>
      </PageHeader>
    );
  }, [BuildBreadcrumb]);

  return (
    <>
      <div className="wrapper-page-container">
        {BuildPageHeader}
        <PageContainer className="page-container-custom-v2" pageHeaderRender={false}>
          <Card
            style={{
              width: '100%',
            }}
          >
            <div className="wrapper-detail-ticket">
              <ProForm
                submitter={{
                  render: ({ form, reset }) => {
                    return [
                      <button
                        key="rest"
                        className="btn-decline-modal"
                        onClick={(e) => {
                          reset();
                          e.preventDefault();
                        }}
                      >
                        <DeleteIconTicketDetail style={{ marginRight: 8 }} />
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
                        <FileSaveIconTicket style={{ marginRight: 8 }} />
                        Xác nhận
                      </button>,
                    ];
                  },
                }}
                onValuesChange={(_, values) => {
                  console.log(values);
                }}
                onFinish={async (value) => {
                  console.log(value);
                  return true;
                }}
              >
                <Row gutter={[32, 0]}>
                  <Col span={12} className="cls-border-detail-col">
                    <ProFormText style={{ width: '100%' }} name="name" label="Mã ticket" disabled />

                    <ProFormText
                      name="ticketName"
                      label="Tên ticket"
                      rules={[{ required: true, message: 'Vui lòng nhập tên ticket' }]}
                      placeholder="Tên ticket"
                      className="custom-input"
                    />

                    <ProFormText
                      style={{ width: '100%' }}
                      name="ticketType"
                      label="Loại ticket"
                      rules={[{ required: true, message: 'Vui lòng nhập loại ticket' }]}
                      placeholder="Loại ticket"
                      className="custom-input"
                    />

                    <ProFormSelect
                      style={{ width: '100%' }}
                      name="select"
                      label="Mức độ yêu cầu"
                      valueEnum={{
                        open: 'Unresolved',
                        closed: 'Resolved',
                      }}
                      placeholder="Mức độ yêu cầu"
                      className="custom-select"
                      rules={[{ required: true, message: 'Please select your country!' }]}
                    />

                    <ProFormSelect
                      style={{ width: '100%' }}
                      name="select"
                      label="Trạng thái"
                      valueEnum={{
                        open: 'Unresolved',
                        closed: 'Resolved',
                      }}
                      placeholder="Trạng thái"
                      className="custom-select"
                      rules={[{ required: true, message: 'Please select your country!' }]}
                    />

                    <ProFormSelect
                      style={{ width: '100%' }}
                      name="select"
                      label="Người tiếp nhận"
                      valueEnum={{
                        open: 'Unresolved',
                        closed: 'Resolved',
                      }}
                      className="custom-select"
                      placeholder="Người tiếp nhận"
                      rules={[{ required: true, message: 'Please select your country!' }]}
                    />

                    <ProFormTextArea
                      style={{ width: '100%' }}
                      name="text"
                      label="Nội dung ticket"
                      placeholder="Nhập nội dung"
                      rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
                    />
                  </Col>
                  <Col span={12}>
                    <div className="title-detail-ticket">Ngô Thanh Dũng</div>
                    <ProFormText
                      style={{ width: '100%' }}
                      name="name"
                      label="UniCloudID"
                      rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
                      placeholder="Tên ticket"
                    />

                    <ProFormText
                      style={{ width: '100%' }}
                      name="name"
                      label="Số điện thoại"
                      rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
                      placeholder="Tên ticket"
                    />

                    <ProFormText
                      style={{ width: '100%' }}
                      name="name"
                      label="Email"
                      rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
                      placeholder="Tên ticket"
                    />
                    {!isCreated && (
                      <>
                        <div className="div-note-wrapper-title">
                          <NoteIcon /> <span>Ghi chú</span>
                        </div>
                        <div className="div-wrapper-note">
                          <p className="title-note-cmt">
                            <span>Nguyễn Duy Hùng | 09:47, 13/06/2022</span> <NoteIconTicket />
                          </p>
                          <p className="detail-note-cmt">
                            <span>
                              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                              sint. Velit officia consequat duis enim velit mollit.
                            </span>
                          </p>
                          <p className="title-note-cmt">
                            <span>Nguyễn Duy Hùng | 09:47, 13/06/2022</span> <NoteIconTicket />
                          </p>
                          <p className="detail-note-cmt">
                            <span>
                              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                              sint. Velit officia consequat duis enim velit mollit.
                            </span>
                          </p>
                          <ProFormTextArea
                            style={{ width: '100%' }}
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
                            placeholder="Nhập ghi chú"
                          />
                        </div>
                      </>
                    )}
                  </Col>
                </Row>
              </ProForm>
            </div>
          </Card>
        </PageContainer>
      </div>
    </>
  );
};

export default TicketDetail;
