import React from 'react';
import { View, Text, Alert, TouchableHighlight } from 'react-native';
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
import CollectionsLibrary from './src/CollectionsLibrary';

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

  const MyTheme = {
    dark: false,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: '#FFFAFA',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
    },
  };


  const createThreeButtonAlert = (navigation) => {
    Alert.alert(
      "Create Collection",
      "",
      [
        { text: "Cancel", 
          onPress: () => console.log("Cancel pressed"), 
          style: "cancel" 
        },
        {
          text: "From my videos or photos",
          onPress: () => console.log("My videos or photos")
        },
        {
          text: "From my library of memos",
          onPress: () => { 
            console.log("Library of memos");
            navigation.navigate("    RemindMe", {
              isSelecting : true
            });
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <Provider store={Store}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="    RemindMe"
            component={VideoLibrary}
            options={({navigation}) => ({
              /* headerTitle: props => <LogoTitle {...props} />, */
              headerLeft: () => (
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text>  </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Camera Page')}>
                    <Entypo name="camera" size={32} color="black" />
                  </TouchableOpacity>
                  <Text>  </Text>
                  <TouchableOpacity onPress={createThreeButtonAlert.bind(this,navigation)}>
                    <Entypo name="upload" size={32} color="black" />
                  </TouchableOpacity>
                </View>
              ),
              headerRight: () => (
              <TouchableOpacity onPress={() => alert('Social practice docs')}>
                <Entypo name="documents" size={32} color="black" style={{marginRight: 10}} />
              </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen options={{headerShown: false}} name="Camera Page" component={CameraPage} />
          <Stack.Screen name="Video Player" component={VideoPlayer} />
          <Stack.Screen name="Picture Gallery" component={PictureGallery} />
          <Stack.Screen name="Collections Library" component={CollectionsLibrary} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;