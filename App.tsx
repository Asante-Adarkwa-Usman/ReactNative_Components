import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, Button } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FeedScreen from './src/screens/FeedScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import PopularScreen from './src/screens/PopularScreen';
import TrendingScreen from './src/screens/TrendingScreen';


const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();


function ExploreTopTabs() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Popular" component={PopularScreen} />
      <TopTab.Screen name="Trending" component={TrendingScreen} />
    </TopTab.Navigator>
  );
}

function ExploreScreen() {
  const navigation = useNavigation();
  const parentDrawer = navigation.getParent() as DrawerNavigationProp<{}>;
  return (
    <View style={{ flex: 1 }}>
      <ExploreTopTabs />
      <Button title="Open Drawer" onPress={() => parentDrawer?.openDrawer()} />
    </View>
  );
}

function HomeTabs() {
  return (
    <BottomTab.Navigator 
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: { backgroundColor: '#1976d2' },
      tabBarActiveTintColor: '#ffffff',
      tabBarInactiveTintColor: '#b0bec5',
      tabBarLabelStyle: { fontSize: 16 },
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Feed') {
          iconName = 'feed';
        } else if (route.name === 'Explore') {
          iconName = 'explore';
        }
        return <MaterialIcons name={iconName as string} size={size} color={color} />;
      },
    })}
    >
      <BottomTab.Screen name="Feed" component={FeedScreen} />
      <BottomTab.Screen name="Explore" component={ExploreScreen} />
    </BottomTab.Navigator>
  );
}



export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={HomeTabs} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
