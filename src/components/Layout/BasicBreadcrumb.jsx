import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'element-react';
import { translate } from 'react-i18next';

const BasicBreadcrumb = ({ breadcrumbList, t }) => {
  return (
    <Breadcrumb style={{marginBottom: '16px'}}>
      <Breadcrumb.Item>
        <Link to="/">{t('breadcrumb.home')}</Link>
      </Breadcrumb.Item>
      {breadcrumbList &&
        breadcrumbList.length &&
        breadcrumbList.map(item => (
          <Breadcrumb.Item key={item.name}>
            {item.to ? <Link to={item.to}>{item.name}</Link> : item.name}
          </Breadcrumb.Item>
        ))}
    </Breadcrumb>
  );
};

BasicBreadcrumb.propTypes = {
  breadcrumbList: PropTypes.array.isRequired,
};

export default translate(['layout'])(BasicBreadcrumb);
