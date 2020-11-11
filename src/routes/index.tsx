import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
} from 'react-native';
import AuthRoutes from './Auth';
import Auth from '../utils/firebase/Auth';
import HomeRoutes from './Home';

interface IRouteProps {
  // TODO: add user type
  user: any;
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
    if (this.props.loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      );
    }

    if (!this.props.user || !this.props.user.email) {
      return <AuthRoutes />;
    }

    return <HomeRoutes />;
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect((state) => ({
  user: state.auth.user,
  loading: state.loader.app,
}))(Routes);
