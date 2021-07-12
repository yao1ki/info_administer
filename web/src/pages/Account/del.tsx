import { Descriptions, message} from 'antd';
import  { FC, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useParams,useRequest} from 'umi';
import service from './service';

interface params{
  id: string;
}


const Test: FC<{}> = () => {
  /* current作为修改值可能存在部分属性 */
  const [opFlag, ] = useState<number>(0);



const params: params  = useParams();
console.log('----->',JSON.stringify(params))
console.log('111')
message.success(params.id);
console.log(params.id)
   let {data} = useRequest(
    async () => {
      return await service.listUsers();
    },
    {
      refreshDeps: [opFlag],
    },
  ); 
    console.log(data);
    
    const handleFinish = async (values: { [key: string]: any }) => {
      let res;
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



