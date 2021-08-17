import React from 'react';
import { useAccess, Access } from 'umi';
import { Radio } from 'antd';

const PageA = (props:any) => {
  const { foo } = props;
  const access = useAccess(); // access 实例的成员: canReadFoo, canUpdateFoo, canDeleteFoo
  const onChange = e => {
    console.log('radio checked', e.target.value);
    //setValue(e.target.value);
  };
  



  return (
    <Radio.Group onChange={onChange} >
      <Radio value={1}>A</Radio>
      <Radio value={2}>B</Radio>
      <Radio value={3}>C</Radio>
      <Radio value={4}>D</Radio>
    </Radio.Group>
  );
};

 export default PageA;
