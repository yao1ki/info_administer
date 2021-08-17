/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    adminRouteFilter: currentUser && (currentUser.auth === 1||currentUser.auth === 99) ,
    userRouteFilter: currentUser && (currentUser.auth === 2||currentUser.auth === 99),
    guestRouteFilter: currentUser && (currentUser.auth === 1||currentUser.auth === 0||currentUser.auth === 99),
  };
}
