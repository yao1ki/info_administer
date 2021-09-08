import React, { FC, useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, message, Divider, Button, Modal } from 'antd';
import service from './service';
import { Input } from 'antd';
import { history } from 'umi';
import moment from 'moment';
interface Props {
  visible: boolean;
  setVisible: any;
  params: string
};


const Personnel: FC<Props> = (props) => {
 const [value,setValue] = useState<number>(0);
 console.log('__>',value,props.visible)
 props.visible ? (props.setVisible(false),setValue(value + 1)) : '';



 useEffect( () => {
 },[value])


  return (
    <div>
        <div>----</div>
    </div>
  );
};

export default Personnel;
