import React from 'react';
import { connect } from 'react-redux';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import AuthRoutes from './Auth';
import Auth from '../utils/firebase/Auth';
import HomeRoutes from './Home';
import Loader from '@/components/Loader';

interface IRouteProps {
  user: FirebaseAuthTypes.User;
  token: string;
  loading: boolean;
  dispatch: Function;
}

class Routes extends React.Component {
  auth: Auth;

  constructor(props: IRouteProps) {
    super(props);
    this.auth = new Auth(props.dispatch);
  }

  componentDidMount() {
    this.auth.init();
  }

  render() {
    const { loading, user } = this.props;

    if (loading) {
      return <Loader />;
    }

    if (!user || !user.email) {
      return <AuthRoutes />;
    }

    return <HomeRoutes />;
  }
}

export default connect((state) => ({
  user: state.auth.user,
  loading: state.loader.app,
}))(Routes);
