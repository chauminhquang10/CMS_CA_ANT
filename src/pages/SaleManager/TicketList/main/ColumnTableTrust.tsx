import TagCustom from '@/components/Tag';
import { Link } from 'umi';

export const ColumnsTableUser = () => {
  return [
    {
      title: 'STT',
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: 'Mã ticket',
      key: 'user',
      dataIndex: 'user',
      //   sorter: (a: API.InquiryCADto, b: API.InquiryCADto) =>
      //     a?.user?.fullName?.localeCompare(b?.user?.fullName as string),
      render: () => {
        return <Link to={`/sale-manager/ticket-detail?isCreated=0&ticketID=1`}>TK-12B51A</Link>;
      },
    },
    {
      title: 'Tên ticket - loại ticket',
      //   key: 'statusRequest',
      //   dataIndex: 'statusRequest',
      //   sorter: (a: any, b: any) => a.individualOrEnterprise - b.individualOrEnterprise,

      render: () => {
        return 'Hỗ trợ khách hàng - Khiếu nại';
      },
    },
    {
      title: 'Mức độ ưu tiên',
      key: 'individualOrEnterprise',
      dataIndex: 'individualOrEnterprise',
      //   sorter: (a: API.InquiryCADto, b: API.InquiryCADto) =>
      //     a?.user?.fullName?.localeCompare(b?.user?.fullName as string),
      render: () => {
        return <TagCustom type="normal" label={'BÌNH THƯỜNG'} />;
      },
    },
    {
      title: 'Người tạo',
      dataIndex: '',
      key: '',
      valueType: 'date',
      //   sorter: (a: API.InquiryCADto, b: API.InquiryCADto) =>
      //     moment(a.dateBegin).unix() - moment(b.dateExpire).unix(),
      render: () => {
        return (
          <>
            <div className="title-creator-ticket">Ngô Thanh Dũng</div>
            <div>
              <span className="detail-creator-ticket">Tạo lúc: 16:30, 12/05/2022</span>
            </div>
          </>
        );
      },
    },
    {
      title: 'Người tiếp nhận',
      key: 'inquiryCAType',
      dataIndex: 'inquiryCAType',
      render: () => {
        return (
          <>
            <div className="title-creator-ticket">Ngô Thanh Dũng</div>
            <div>
              <span className="detail-creator-ticket">Tạo lúc: 16:30, 12/05/2022</span>
            </div>
          </>
        );
      },
    },
    {
      title: 'Tình trạng',
      key: 'softDocumentInfo',
      dataIndex: 'softDocumentInfo',
      render: () => {
        return <div className="title-creator-ticket">Hoàn Thành</div>;
      },
    },
  ];
};

export default ColumnsTableUser;
