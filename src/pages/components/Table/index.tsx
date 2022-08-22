import avatarImg from '@/assets/images/png/avatar/supper-large.png';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

import ButtonCustom from '@/components/Button';
import CardUser from '@/components/Card/CardUser';
import DropdownCustom from '@/components/Dropdown';
import ModalMain from '@/components/Modal';
import ProcessCustom from '@/components/Process';
import type { DataType } from '@/pages/LevelManagement/RequestListPage/data';
import * as ListData from '@/pages/LevelManagement/RequestListPage/data';
import { CaretDownOutlined } from '@ant-design/icons';
import { Menu, Space } from 'antd';

export type ProTableCustomProps = {
  onDataSourceChange?: (_data: any[]) => void;
};
const columnsTable: ProColumns<any>[] = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'Mã yêu cầu',
    dataIndex: 'codeRequest',
    key: 'codeRequest',
    render: (_, codeRequest) => {
      return <span style={{ textTransform: 'capitalize' }}>{codeRequest.codeRequest}</span>;
    },
  },
  {
    title: 'Loại yêu cầu',
    dataIndex: 'type',
    key: 'type',
    render: (_, type) => {
      return <span style={{ textTransform: 'capitalize' }}>{type.type}</span>;
    },
  },
  {
    title: 'Thông tin khách hàng',
    key: 'user',
    dataIndex: 'user',
    render: (_: any, user) => {
      console.log('user', user);

      return <CardUser avatar={avatarImg} dataUser={user.user} />;
    },
  },
  {
    title: 'Đối tượng sử dụng',
    key: 'userObject',
    dataIndex: 'userObject',
    render: (_, userObject) => {
      return <span style={{ textTransform: 'capitalize' }}>{userObject.userObject}</span>;
    },
  },
  {
    title: 'Gói dịch vụ',
    key: 'servicePackage',
    dataIndex: 'servicePackage',
  },
  {
    title: 'HS bản mềm',
    key: 'hsBanMem',
    dataIndex: 'hsBanMem',
    render: (_, item) => {
      const visible = false;
      console.log('item', item);

      return (
        <>
          <ButtonCustom className="btn-process-arrow" onClick={() => !visible}>
            <ProcessCustom
              type="circle"
              percent={100}
              width={40}
              status="success"
              format={(percent) => <span>{percent ? percent / 25 : 0} / 4</span>}
            />
            <CaretDownOutlined />
          </ButtonCustom>
          <ModalMain
            title="xin chào tittle"
            visible={false}
            handle={function (): void {
              throw new Error('Function not implemented.');
            }}
          >
            <h1>xin chào</h1>
          </ModalMain>
        </>
      );
    },
  },
  {
    title: 'HS bản cứng',
    key: 'hsBanCung',
    dataIndex: 'hsBanCung',
    render: (_, item) => {
      console.log('item', item);
      const menu = (
        <Menu
          items={[
            {
              label:
                item.hsBanCung.status === 'đã hoàn thành' ? 'Chưa hoàn thành' : 'Đã hoàn thành',
              key: '0',
            },
          ]}
        />
      );
      return (
        <DropdownCustom
          className={`${
            item.hsBanCung.status === 'đã hoàn thành' ? 'dropdown-success' : 'dropdown-dangerous'
          }`}
          overlay={menu}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space style={{ textTransform: 'capitalize' }}>
              {item.hsBanCung.status}
              <CaretDownOutlined />
            </Space>
          </a>
        </DropdownCustom>
      );
    },
  },
  {
    title: 'Trạng thái yêu cầu',
    key: 'statusRequest',
    dataIndex: 'statusRequest',
    render: (_, status) => {
      let classNameStatus = '';

      switch (status.statusRequest) {
        case 'hoàn thành':
          classNameStatus = 'btn-normal';
          break;
        case 'chưa tiếp nhận':
          classNameStatus = 'btn-dangerous';
          break;
        case 'đang hỗ trợ':
          classNameStatus = 'btn-warning';
          break;

        default:
          break;
      }
      return (
        <ButtonCustom style={{ width: '128px' }} className={`btn-custom ${classNameStatus}`}>
          {status.statusRequest.toUpperCase()}
        </ButtonCustom>
      );
    },
  },
];

const ProTableCustom: React.FC<ProTableCustomProps> = (props) => (
  <>
    <ProTable<DataType>
      onDataSourceChange={props.onDataSourceChange}
      toolBarRender={false}
      defaultSize="middle"
      search={false}
      columns={columnsTable}
      request={() => {
        return Promise.resolve({
          total: 200,
          data: ListData.dataTable,
          success: true,
        });
      }}
    />
  </>
);
export default ProTableCustom;
