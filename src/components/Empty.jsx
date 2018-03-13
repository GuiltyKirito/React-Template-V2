import { Card } from 'antd';
import { translate } from 'react-i18next';
import BasicBreadcrumb from './Layout/BasicBreadcrumb';

@translate(['empty'])
class Empty extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const breadcrumbList = [
      {
        name: this.props.t('title'),
      },
    ];

    return(
      <div>
        <BasicBreadcrumb breadcrumbList={breadcrumbList} />
        <Card bordered={false}>
          Empty!!!
        </Card>
      </div>
    );
  }
}

export default Empty;
