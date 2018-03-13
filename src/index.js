/**
 * Global CSS
 */
import 'sanitize.css/sanitize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'element-theme-default';
import 'ant-design-pro/dist/ant-design-pro.css';
import './index.css';

/**
 * Global JS
 */
import 'bootstrap';

/**
 * React 相關
 */
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { ConnectedRouter } from 'react-router-redux';
import { I18nextProvider } from 'react-i18next';
import { LocaleProvider } from 'antd';
import { i18n as elementI18n } from 'element-react';
import locale from 'element-react/src/locale/lang/zh-TW';
import zhTW from 'antd/lib/locale-provider/zh_TW';

import registerServiceWorker from './registerServiceWorker';

import i18n from './i18n';
import routes from './routes';
import stores, { history } from './stores';

elementI18n.use(locale);
i18n.changeLanguage('zh-TW');

const Index = () => (
  <Provider store={stores}>
    <I18nextProvider i18n={i18n}>
      <LocaleProvider locale={zhTW}>
        <ConnectedRouter history={history}>
          {renderRoutes(routes)}
        </ConnectedRouter>
      </LocaleProvider>
    </I18nextProvider>
  </Provider>
);

render(<Index />, document.getElementById('root'));
registerServiceWorker();
