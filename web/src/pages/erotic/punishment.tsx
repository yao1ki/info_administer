import { FC, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table,Divider} from 'antd';
import { GhostItem } from './data.d';
import Back from './components/chargeback';
import { useRequest } from 'umi';
import service from './service';
import { Input } from 'antd';
import { history } from 'umi';
import moment from 'moment'
type SearchProps = {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
};

const state = "4"
const Personnel: FC<SearchProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<GhostItem> | undefined>(undefined);

  /* current作为修改值可能存在部分属性 */
  const [pagesize, setPagesize] = useState<number>(1);
  const [opFlag, setOpFlag] = useState<number>(0);
  const [params, setParams] = useState<string>('');
  //获取数据
  let { data } = useRequest(
    async () => {
      return await service.list(state, params);
    },
    {
      refreshDeps: [opFlag],
    },
  );

  const updateGhost = (item: GhostItem) => {
    setVisible(true);
    setCurrent({ ...item });
   // await service.updateGhost(id,{lifetime:lifetime-1})
    //setOpFlag(opFlag + 1);
  };


  const updatelifetime =async (id: any) => {
    (await service.updateGhost(id,{state:'5',lifetime:'0'})).error?'':(
    setOpFlag(opFlag + 1)
      
    )
  };
  const columns = [
    {
      title: '灵魂ID',
      dataIndex: 'id',
      key: 'id',
      valueType: 'textarea',
    },
    {
      title: '受刑时间/日',
      dataIndex: 'lifetime',
      valueType: 'textarea',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      valueType: 'textarea',
    },
    {
      title: '审判记录',
      dataIndex: 'reason',
      valueType: 'textarea',
    },

    {
      title: '剩余受刑时间/日',
      valueType: 'textarea',
      render: (_: any, record: any) => {
        const aa = parseInt(record.lifetime)- moment(moment().format()).diff(moment(record.time_end), 'days');
        return aa<=0?updatelifetime(record.id):aa+'日'
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (item: GhostItem) => (
        <span >
          <a
            onClick={() => {
              updateGhost(item)
             
            }}
          >
           更改刑期
          </a>
          {/* <Divider type="vertical" />
          <a
            onClick={() => {
            }}
          >
            使用刑具
          </a> */}
        </span>
      ),
    },

  ];


  const handleOk = () => {
    setVisible(false);
    setOpFlag(opFlag + 1);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleJump = (page: number) => {
    setPagesize(page);
  };
  const pagination = {
    position: ['bottomRight'],
    showTotal: (total: number) => {
      return `共 ${total} 条记录 第 ${pagesize} / ${Math.ceil(total / 10)} 页`;
    },
    pageSize: 10,
    onChange: handleJump,
  };




  const getTabKey = () => {
    const { match, location } = props;
    const url = match.path === '/' ? '' : match.path;
    const tabKey = location.pathname.replace(`${url}/`, '');
    if (tabKey && tabKey !== '/') {
      return tabKey;
    }
    return 'articles';
  };

  return (
    <div>

        <Card>
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(record: GhostItem): number => record.id as number}
          />
        </Card>

      <Back current={current} visible={visible} onOk={handleOk} onCancel={handleCancel} />

    </div>
  );
};

export default Personnel;
