/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  //   console.log('currentUser quyền', currentUser);

  return {
    canAdmin: currentUser,
  };
}
