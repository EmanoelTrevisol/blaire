import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import Root from './src/Root';
import './src/plugins/moment';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => Root);
