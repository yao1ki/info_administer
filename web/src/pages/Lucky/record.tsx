import { FC, useState } from 'react';
import { Row, Card, Col, message, Modal } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

import service from './service';
import { useRequest } from 'umi';
import styles from './style.less';

const Personnel: FC<{}> = () => {
  const [opFlag, setOpFlag] = useState<number>(0);

  let data = useRequest(
    async () => {
      return await service.recordlist();
    },
    {
      refreshDeps: [opFlag],
    },
  );
  return (
    <PageContainer>
      {
        <Row>
          {data.data === undefined
            ? ''
            : data.data.map((v: any, i: any) => (
                <Col span={6}>
                  {
                    <a
                      onClick={() => {
                        Modal.success({
                          content: v.experience,
                        });
                      }}
                    >
                      {
                        <img
                          src={`https://img1.baidu.com/it/u=4262778161,3449122068&fm=26&fmt=auto&gp=0.jpg`}
                        />
                      }
                    </a>
                  }
                </Col>
              ))}
        </Row>
      }
    </PageContainer>
  );
};

export default Personnel;
