import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { login } from './action';

const mapStateToProps = state => ({
  isLogin: state.user.login,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      redirect: pathname => replace(pathname),
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps);
