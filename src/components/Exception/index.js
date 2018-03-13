import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import './index.module.css';

import images from './images';

const Exception = ({ type, title, description, t }) => {
  const pageType = [403, 404, 500].includes(type) ? type : 404;

  return (
    <div styleName="exception">
      <div styleName="image-block">
        <div styleName="image-element" style={{ backgroundImage: `url(${images[pageType]})` }} />
      </div>

      <div styleName="content">
        <h1>{title || t(`${pageType}.title`)}</h1>
        <div styleName="description">{description || t(`${pageType}.description`)}</div>
        <div styleName="actions">
          <Link to="/">
            <Button type="primary">{t('back')}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

Exception.propTypes = {
  type: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default translate(['exception'])(Exception);
