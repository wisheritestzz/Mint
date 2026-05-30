import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';

const Router = import.meta.env.PROD ? HashRouter : BrowserRouter;
import { ConfigProvider, App as AntApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { themeConfig } from './styles/theme';
import App from './App';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={themeConfig} locale={zhCN}>
      <AntApp>
        <Router>
          <App />
        </Router>
      </AntApp>
    </ConfigProvider>
  </StrictMode>,
);
