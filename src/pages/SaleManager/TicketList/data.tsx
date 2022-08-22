interface FilterModel {
  key: string | number;
  type: string | number;
  label: string;
  value: string;
  isactive: boolean;
  listFilterChild?: FilterModel[];
}

const ListOptionFilter: FilterModel[] = [
  {
    key: 'item-1',
    type: 'type-1',
    label: 'Đối tượng sử dụng',
    value: 'Đối tượng sử dụng',
    isactive: false,
    listFilterChild: [
      { key: 'item-1', type: 'type-child-0', label: 'Tổ chức', value: 'Tổ chức', isactive: false },
      { key: 'item-2', type: 'type-child-1', label: 'Cá nhân', value: 'Cá nhân', isactive: false },
      {
        key: 'item-3',
        type: 'type-child-2',
        label: 'Cá nhân trong tổ chức',
        value: 'Cá nhân trong tổ chức',
        isactive: false,
      },
    ],
  },
  { key: 'item-2', type: 'type-2', label: 'Gói dịch vụ', value: 'Gói dịch vụ', isactive: false },
  { key: 'item-3', type: 'type-3', label: 'Thời hạn', value: 'Thời hạn', isactive: false },
  {
    key: 'item-4',
    type: 'type-4',
    label: 'Trạng thái chứng thư',
    value: 'Trạng thái chứng thư',
    isactive: false,
  },
  {
    key: 'item-5',
    type: 'type-5',
    label: 'Hồ sơ bản mềm',
    value: 'Hồ sơ bản mềm',
    isactive: false,
  },
  {
    key: 'item-6',
    type: 'type-6',
    label: 'Hồ sơ bản cứng',
    value: 'Hồ sơ bản cứng',
    isactive: false,
  },
];

export { FilterModel };
export default ListOptionFilter;
