import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import VideoLibrary from './src/VideoLibrary';
import VideoPlayer from './src/VideoPlayer';
import CameraPage  from './src/CameraCapture/camera.page';
import PictureGallery from './src/PictureGallery';
import { Provider } from 'react-redux';
import Store from './source/reduxStore';

const Stack = createStackNavigator();

/*
function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('@expo/snack-static/react-native-logo.png')}
    />
  );
}
*/

/*
function CameraPage() {
    return (
      <View><Text>Hello World!</Text></View>
    )
}
*/

function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="    RemindMe"
            component={VideoLibrary}
            options={({navigation}) => ({
              /* headerTitle: props => <LogoTitle {...props} />, */
              headerLeft: () => (
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text>  </Text>
                  <Entypo onPress={() => navigation.navigate('Camera Page')} name="camera" size={32} color="black" />
                  <Text>  </Text>
                  <Entypo onPress={() => alert('Upload Video/Photo')} name="upload" size={32} color="black" />
                </View>
              ),
              headerRight: () => (
              <Entypo onPress={() => alert('Social practice docs')} name="documents" size={32} color="black" style={{marginRight: 10}} />
              ),
            })}
          />
          <Stack.Screen options={{headerShown: false}} name="Camera Page" component={CameraPage} />
          <Stack.Screen name="Video Player" component={VideoPlayer} />
          <Stack.Screen name="Picture Gallery" component={PictureGallery} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;