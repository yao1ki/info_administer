import { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { reduce } from 'lodash';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#DC143C',
//  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '地府管理系统',
 
 // title: '地狱管理系统',
  pwa: false,
  logo: 'https://cdn.pixabay.com/photo/2016/11/28/21/40/pentagram-1866115__340.png',
  iconfontUrl: '',
};

export default Settings;
