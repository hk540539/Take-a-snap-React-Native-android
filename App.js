import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './screens/Home';
import CameraScreen from './screens/CameraScreen';

const MainNavigator = createStackNavigator(
	{
		Home: {
			screen: Home
		},
		CameraScreen: { screen: CameraScreen }
	},
	{
		defaultNavigationOptions: {
			title: 'App',
			headerTintColor: '#fff',
			headerStyle: {
				backgroundColor: '#0A79DF'
			},
			headerTitleStyle: { color: '#FFF' }
		}
	}
);
const App = createAppContainer(MainNavigator);
export default App;
