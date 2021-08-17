import React from 'react';
import { useAccess, Access } from 'umi';

const PageA = (props:any) => {
  const { foo } = props;
  const access = useAccess(); // access 实例的成员: canReadFoo, canUpdateFoo, canDeleteFoo

  if (access.adminRouteFilter) {
    // 任意操作
  }

  return (
    <div>
      <Access accessible={access.adminRouteFilter} fallback={<div>Can not read foo content.</div>}>
        Foo content.
      </Access>

    </div>
  );
};

export default PageA;
