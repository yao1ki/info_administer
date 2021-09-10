import { FC, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, message, Divider, Modal } from 'antd';
import { GhostItem } from './data.d';
import OperationModal from './components/OperationModal';
import { useRequest } from 'umi';
import service from './service';
import { Input } from 'antd';
import { history } from 'umi';
import app from './index';
import { useEffect } from 'react';

import { react } from '@babel/types';
const state = '2';
type SearchProps = {
  params: string;
  refresh: any;
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
};

const Personnel: FC<SearchProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  /* current作为修改值可能存在部分属性 */
  const [current] = useState<Partial<GhostItem> | undefined>(undefined);
  const [pagesize, setPagesize] = useState<number>(1);
  const [opFlag, setOpFlag] = useState<number>(0);
  const [params, setParams] = useState<string>('');
  //获取数据
  let { data } = useRequest(
    async () => {
      return await service.list(state, props.params);
    },
    {
      refreshDeps: [opFlag],
    },
  );
  const confirmDelete = (current: GhostItem) => {
    Modal.confirm({
      title: '确认勾魂',
      content: '确定勾对人了吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => showEditModal(JSON.stringify(current?.id)),
    });
  };
  const showEditModal = async (id: any) => {
    const res = await service.updateGhost(id, { state: '3' });
    if (!res.error) {
      message.success('确认成功！');
      setOpFlag(opFlag + 1);
      props.refresh();
    }
  };
  const columns = [
    {
      title: '灵魂ID',
      dataIndex: 'id',
      key: 'id',
      valueType: 'textarea',
    },
    {
      title: '姓名/种类',
      dataIndex: 'name',
      key: 'name',
      valueType: 'textarea',
    },
    {
      title: '勾魂使者',
      dataIndex: 'name',
      key: 'name',
      valueType: 'textarea',
      render: (_: any, record: any) => {
        return record.orders.map((v: any, i: any) => {
          if (i) {
            return '、' + v.user.name;
          } else {
            return v.user.name;
          }
        });
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (item: GhostItem) => (
        <span>
          <a
            onClick={() => {
              confirmDelete(item);
            }}
          >
            确认已勾魂
          </a>
          <Divider type="vertical" />
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
  useEffect(()=>{
    setOpFlag(opFlag+1)
  },[props.params])

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

      <OperationModal current={current} visible={visible} onOk={handleOk} onCancel={handleCancel} />
    </div>
  );
};

export default Personnel;
