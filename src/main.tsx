import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ConfigProvider, App as AntApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import { themeConfig } from './styles/theme';
import { I18nProvider, useI18n } from './i18n/context';
import App from './App';
import './styles/index.css';

function Root() {
  const { lang } = useI18n();

  return (
    <ConfigProvider theme={themeConfig} locale={lang === 'zh' ? zhCN : enUS}>
      <AntApp>
        <HashRouter>
          <App />
        </HashRouter>
      </AntApp>
    </ConfigProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <Root />
    </I18nProvider>
  </StrictMode>,
);
