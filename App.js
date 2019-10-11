import React from 'react';
import {
    createStackNavigator,
    createBottomTabNavigator,
    createDrawerNavigator,
    createSwitchNavigator,
    createAppContainer
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import AuthScreen from './src/components/auth/AuthScreen';
import MainScreen from './src/containers/MainScreen';
import NotificationScreen from './src/containers/NotificationScreen';
import LoginScreen from './src/components/auth/LoginScreen';
import RegisterScreen from './src/containers/RegisterScreen';
import LogoutScreen from './src/components/auth/LogoutScreen';
import AddTaskScreen from './src/containers/AddTaskScreen';
import GroupTaskScreen from './src/containers/GroupTaskScreen';
import ViewTaskScreen from './src/containers/ViewTaskScreen';
import TaskCalendar from './src/components/TaskCalendar';
import AddGrouptaskScreen from './src/containers/AddGroupTaskScreen';
import ViewGroupTaskScreen from './src/containers/ViewGroupTaskScreen';
import ViewLvl2Task from './src/components/lvl2Task/ViewLvl2Task';
import DailyTaskScreen from './src/containers/DailyTaskScreen';
import AddDailyTaskScreen from './src/containers/AddDailyTaskScreen';
import ArchiveScreen from './src/containers/ArchiveScreen';
import ProfileScreen from './src/containers/ProfileScreen';
import editProfileScreen from './src/containers/editProfileScreen';
import ChangePassScreen from './src/containers/ChangePassScreen';
import SubscriptionScreen from './src/containers/SubscriptionScreen';
import ThankU4SubsScreen from './src/containers/ThankU4SubsScreen';

const AppStack = createStackNavigator(
    {
        Main: { screen: MainScreen },
        ViewTask: { screen: ViewTaskScreen },
        AddTask: { screen: AddTaskScreen },
        // Notification: { screen: NotificationScreen }
    }
);

const GroupStack = createStackNavigator(
    {
        GroupTaskScreen: { screen: GroupTaskScreen },
        ViewGroupTaskScreen: { screen: ViewGroupTaskScreen },
        TaskCalendarScreen: { screen : TaskCalendar },
        AddGroupTask: { screen: AddGrouptaskScreen },
        ViewLvl2Task: { screen: ViewLvl2Task }
    }
);

const DailyStack = createStackNavigator(

    {
        DailyTask: { screen: DailyTaskScreen },
        AddDaily: { screen: AddDailyTaskScreen },
    }
);

const ProfileStack = createStackNavigator(
    {
        Profile: { screen: ProfileScreen },
        EditProfile: { screen: editProfileScreen},
        ChangePassword: { screen: ChangePassScreen },
        Subscription: { screen: SubscriptionScreen },
        ThankYou: { screen: ThankU4SubsScreen }
    }
);

const ArchiveStack = createStackNavigator(
    {
        ArchiveScreen: { screen: ArchiveScreen },
    }
);

const NotificationStack = createStackNavigator(
    {
        Notification: { screen: NotificationScreen }
    }
);

const Tabs = createBottomTabNavigator(
    {
        Main: {
            screen: AppStack,
            navigationOptions: {
                tabBarLabel: 'Solo task',
            }
        },
        GroupTask: {
            screen: GroupStack,
            navigationOptions: {
                tabBarLabel: 'Group',
            }
        },
        Daily: {
            screen: DailyStack,
            navigationOptions: {
                tabBarLabel: 'Daily',
            }
        }
    },
    {
        initialRouteName: 'GroupTask',
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Icon;
                let iconName;

                if (routeName === 'Main') {
                    iconName = `tasks`;
                } else if (routeName === 'GroupTask') {
                    iconName = `group`;
                }else if (routeName === 'Daily') {
                    iconName = `history`;
                }

                return <IconComponent name={iconName} size={20} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: '#e74c3c',
            inactiveTintColor: 'gray',
        },
    }
);

const Drawer = createDrawerNavigator(
    {
        Home: { screen: Tabs },
        Archive: { screen: ArchiveStack },
        Profile: { screen: ProfileStack },
        Logout: { screen: LogoutScreen },
    }
);

const AuthStack = createStackNavigator(
    {
        Login: LoginScreen,
        Register: RegisterScreen
    },
    {
        headerMode: 'none',
    }
);

//switchNavigator if for focusing only 1 screen at a time, others will be reset to its state.
export default createAppContainer(createSwitchNavigator(
    {
        AuthScreen: AuthScreen,
        App: Drawer,
        Auth: AuthStack,
        Notif: NotificationStack,
    },
    {
        initialRouteName: 'AuthScreen',
    }
));