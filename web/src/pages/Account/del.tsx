import { Descriptions, message} from 'antd';
import  { FC, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useParams,useRequest} from 'umi';
import service from './service';
import { count } from '@umijs/deps/compiled/yargs';

interface params{
  id: string;
}


const Test: FC<{}> = () => {
  /* current作为修改值可能存在部分属性 */
  const [opFlag, ] = useState<number>(0);



const params: params  = useParams();
console.log('----->',JSON.stringify(params))

   let {data} = useRequest(
    async () => {
      return await service.listUsers();
    },
    {
      refreshDeps: [opFlag],
    },
  ); 

    
    const handleFinish = async (values: { [key: string]: any }) => {
      let res 
      console.log (id)
        res = await service.updateUser(id, values);
    };




  return (
    <PageContainer >
         <Descriptions title="User Info" layout="vertical">
    <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
    <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
    <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
    <Descriptions.Item label="Address" span={2}>
      No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
    </Descriptions.Item>
    <Descriptions.Item label="Remark">empty</Descriptions.Item>
  </Descriptions>
    
    </PageContainer>
  );
};

export default Test;



