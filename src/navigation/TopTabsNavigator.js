import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {HomeHeader} from '../components/HomeHeader';

//Screens
import AssignmentsScreen from '../screens/AssignmentsScreen';
import HomeScreen from '../screens/HomeScreen';

import {
  ASSIGNMENTS_SCREEN_NAME,
  HOME_SCREEN_NAME,
} from '../constants/routeNames';

const Tab = createMaterialTopTabNavigator();

function TopTabNavigation() {
  return (
    <>
      <HomeHeader />
      <Tab.Navigator>
        <Tab.Screen name={HOME_SCREEN_NAME} component={HomeScreen} options={{title: 'Khóa học'}} />
        <Tab.Screen
          name={ASSIGNMENTS_SCREEN_NAME}
          component={AssignmentsScreen}
          options={{title: 'Bài tập'}}
        />
      </Tab.Navigator>
    </>
  );
}

export default TopTabNavigation;
