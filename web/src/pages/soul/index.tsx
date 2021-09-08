import { PageContainer } from '@ant-design/pro-layout';
import { Input } from 'antd';
import type { FC } from 'react';
import React from 'react';
import { history } from 'umi';
import { GhostItem } from './data';
import{  useState } from 'react';
import OperationModal from './components/OperationModal';
import Test from "./test.";

import animal from './animal'
import ghoul from './ghoul'





type SearchProps = {

  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
};

const tabList = [
  {
    key: 'god',
    tab: '天人',
  },
  {
    key: 'people',
    tab: '人间',
  },
  {
    key: 'shura',
    tab: '修罗',
  },
  {
    key: 'animal',
    tab: '畜生',
  },
  {
    key: 'ghoul',
    tab: '恶鬼',
  },
  {
    key: 'hell',
    tab: '地狱',
  },
];

const Search: FC<SearchProps> = (props) => {
  const [params, setCurrent] = useState<string>('');
  const [visible, setVisible] =  useState<boolean>(false);
  const [opFlag, setOpFlag] = useState<number>(0);

  let aa  = 0;
  const handleOk = (): number => {

    setVisible(false)
    console.log("gggggggggggggg",visible)
    return 3

  };
  const handleTabChange = (key: string) => {
    const { match } = props;
    const url = match.url === '/' ? '' : match.url;
    switch (key) {
      case 'god':
        history.push(`${url}/god`);
        break;
      case 'people':
        history.push(`${url}/people`);
        break;
      case 'shura':
        history.push(`${url}/shura`);
        break;
      case 'animal':
        history.push(`${url}/animal`);
        break;
      case 'ghoul':
        history.push(`${url}/ghoul`);
        break;
      case 'hell':
        history.push(`${url}/hell`);
        break;
      default:
        break;
    }
  };
 

  const handleFormSubmit = (value: string) => {
    setVisible(true)
    console.log("___KKKKKKKKK",visible)
    setCurrent(value)
    
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
    <PageContainer
      content={
        <div style={{ textAlign: 'center' }}>
          <Input.Search
            placeholder="请输入"
            enterButton="搜索"
            size="large"
            onSearch={handleFormSubmit}
            style={{ maxWidth: 522, width: '100%' }}
          />
        </div>
      }
      tabList={tabList}
      tabActiveKey={getTabKey()}
      onTabChange={handleTabChange}
    >
     {/* {props.children} */}
     {props.children && React.cloneElement(props.children, {
              params:params,onnn:handleOk,op:visible,set1:setVisible
            })}
      {/* <Test params={params} visible={visible} onn={handleOk} setVisible={setVisible} /> */}
    </PageContainer>
    
  );
};

export default Search;
