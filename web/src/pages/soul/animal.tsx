import React, { FC, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, message, Divider, Button, Modal } from 'antd';
import { GhostItem } from './data';
import OperationModal from './components/OperationModal';
import { useRequest, Link } from 'umi';
import service from './service';
import { Input } from 'antd';
import { history } from 'umi';
import { ModalForm, ProFormSelect } from '@ant-design/pro-form';
import { values } from 'lodash';
import moment from 'moment';
type SearchProps = {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
};


const animal: FC<SearchProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  /* current作为修改值可能存在部分属性 */
  const [current, setCurrent] = useState<Partial<GhostItem> | undefined>(undefined);
  const [pagesize, setPagesize] = useState<number>(1);
  const [opFlag, setOpFlag] = useState<number>(0);
  const [params, setParams] = useState<string>('');
  var aa = 0 ;
const state = '3';
  //获取数据
  let { data } = useRequest(
    async () => {
      return await service.querystate(state, params);
    },
    {
      refreshDeps: [opFlag],
    },
  );


  const deleteItem = async (id: number) => {
    const res = await service.removeGhost(id);
    if (!res.error) {
      message.success('放逐成功！');
      setOpFlag(opFlag + 1);
    }
  };


  const columns = [
    {
      title: '灵魂ID',
      key: 'id',
      render: (_: any, record: any) => (
        <span>
          <span>
            <Link to={`/lifebook.detail/${record.id}`}>{record.id}</Link>
          </span>
        </span>
      ),
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      valueType: 'textarea',
    },

    {
      title: '出生日期',
      key: 'lifetime',
      valueType: 'textarea',
      render: (_: any, record: any) => {
        return moment(record.time_start).format('YYYY年MM月DD日');
      },
    },
    {
      title: '死亡日期',
      key: 'lifetime',
      valueType: 'textarea',
      render: (_: any, record: any) => {
        return moment(record.time_end).format('YYYY年MM月DD日');
      },
    },
    {
      title: '死亡方式 ',
      dataIndex: 'cause',
      key: 'cause',
      valueType: 'textarea',
    },
    {
      title: '寿命/日',
      render: (_: any, record: any) => {
        
       return moment(record.time_end).diff(moment(record.time_start), 'day')
        //return (parseInt(moment(record.time_end).format('YYYYMMDD'))-parseInt(moment(record.time_start).format('YYYYMMDD')));
      },
      key: 'sort',
      valueType: 'textarea',
    },
    {
      title: '剩余寿命/日',
      render: (_: any, record: any) => {
         aa =moment(record.time_end).diff(moment(moment().format()), 'day');
        return aa <= 0 ? ("阳寿已尽" ): aa;
      },
      key: 'sort',
      valueType: 'textarea',
    },

    {
      title: '操作',
      key: 'action',
      render: (item: GhostItem) => (
        aa<=0?'已死亡':
        <span>
          <a
            onClick={() => {
              showEditModal(item);
            }}
          >
            编辑
          </a>
         
        </span>
      ),
    },
  ];
  /* 添加current置空 */


  /* 编辑框将item传给current */
  const showEditModal = (item: GhostItem) => {
    setVisible(true);
    setCurrent({ ...item });
  };

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


  return (
    <div>
        <Card  >
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

export default animal;
