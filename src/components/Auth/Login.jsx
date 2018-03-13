import container from './container';
import { Alert, Button, Form, Input, Layout, Loading } from 'element-react';
import { translate } from 'react-i18next';

import * as constant from './constant';

import './Login.module.css';

@translate(['login'])
@container
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.submit = this.submit.bind(this);

    this.state = {
      loading: false,
      error: false,
      errorCode: 0,
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: this.props.t('rules.message.username'), trigger: 'blur' },
        ],
        password: [
          { required: true, message: this.props.t('rules.message.password'), trigger: 'blur' },
        ],
      },
    };
  }

  componentWillMount() {
    document.body.style.backgroundColor = '#d2d6de';
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  handleChange(key, value) {
    this.setState({
      form: {
        ...this.state.form,
        [key]: value,
      },
    });
  }

  handleClose() {
    this.setState({
      error: false,
      errorCode: 0,
    });
  }

  submit(event) {
    event.preventDefault();

    this.refs.form.validate(valide => {
      if (valide) {
        this.setState({ loading: true });

        this.props.login(this.state.form.username, this.state.form.password).then(res => {
          this.setState({ loading: false });

          if (this.props.isLogin) {
            const pathname =
              (this.props.location.from && this.props.location.from.pathname) || constant.BASE;

            this.props.redirect(pathname);
            window.location.reload();
          } else if (res.status !== 200) {
            this.setState({
              error: true,
              errorCode: res.status,
            });
          }
        });
      }
    });
  }

  render() {
    return (
      <div styleName="login-box">
        {// loading
        this.state.loading && <Loading fullscreen={this.state.loading} />}

        <div styleName="login-logo">{this.props.t('title')}</div>

        <div styleName="login-box-body">
          <Form ref="form" model={this.state.form} rules={this.state.rules} onSubmit={this.submit}>
            {// error
            this.state.error && (
              <Form.Item>
                <Alert
                  title={this.props.t(`error.${this.state.errorCode}`)}
                  type="error"
                  showIcon
                  onClose={this.handleClose}
                />
              </Form.Item>
            )}

            <Form.Item prop="username">
              <Input
                icon="fa fa-user"
                placeholder={this.props.t('form.username')}
                onChange={this.handleChange.bind(this, 'username')}
              />
            </Form.Item>

            <Form.Item prop="password">
              <Input
                icon="fa fa-lock"
                type="password"
                placeholder={this.props.t('form.password')}
                onChange={this.handleChange.bind(this, 'password')}
              />
            </Form.Item>

            <Layout.Row>
              <Layout.Col span="6" offset="18">
                <Button
                  icon="fa fa-sign-in"
                  nativeType="submit"
                  type="primary"
                  onClick={this.submit}
                >
                  {this.props.t('form.login')}
                </Button>
              </Layout.Col>
            </Layout.Row>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
