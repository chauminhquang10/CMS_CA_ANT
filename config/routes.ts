export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/levelManagement',
    name: 'Quản lý cấp phát',
    icon: '/icons/icon-menu-1.svg',
    access: 'canAdmin',
    routes: [
      {
        path: '/levelManagement/certificate-list',
        name: 'Danh sách chứng thư',
        component: './LevelManagement/CertificateListPage',
      },
      {
        path: '/levelManagement/request-list',
        name: 'Danh sách yêu cầu',
        component: './LevelManagement/RequestListPage',
      },
      {
        path: '/levelManagement/request-list/add-new-ca',
        component: './LevelManagement/AddNewCA',
      },
      {
        path: '/levelManagement/certificate-list/customer-details',
        // name: 'Chi tiết khách hàng',
        component: './LevelManagement/CustomerDetails',
        hideInMenu: true,
      },
    ],
  },
  // {
  //   path: '/sale-manager',
  //   name: 'Quản lý bán hàng',
  //   icon: '/icons/icon-menu-2.svg',
  //   access: 'canAdmin',
  //   routes: [
  //     {
  //       path: '/1',
  //       name: 'Quản lý hóa đơn',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       path: '/2',
  //       name: 'Cơ hội',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       path: '/sale-manager/ticket-list',
  //       name: 'Ticket',
  //       icon: 'smile',
  //       component: './SaleManager/TicketList',
  //     },
  //     {
  //       path: '/sale-manager/ticket-detail',
  //       name: 'Ticket',
  //       icon: 'smile',
  //       component: './SaleManager/TicketDetail',
  //       hideInMenu: true,
  //     },
  //     {
  //       path: '/4',
  //       name: 'FAQs',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       path: '/5',
  //       name: 'Mã giảm giá',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       path: '/6',
  //       name: 'Quản lý gói cước',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //   ],
  // },
  {
    path: '/',
    redirect: '/levelManagement/certificate-list',
  },
  {
    component: './404',
  },
];
