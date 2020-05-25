import React from 'react';
import { View, Text, Switch, Platform, StyleSheet, Image, Video, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Collection, ThemeProvider } from 'react-native-ios-kit';
import { MaterialIcons } from '@expo/vector-icons';
import * as VideoThumbnails from 'expo-video-thumbnails';
// import { uid } from 'react-uid';

function CollectionsLibrary(props) {

    /*
    const renderCollection = ({ item }) => {

      const renderItem = (item) => {
        const ext = item.uri.split('.').pop();
         return (Platform.OS == 'ios' && ext !== 'jpg'? 
          <Video
            source={{ uri: item.uri }}
            usePoster
            shouldPlay={false}
            resizeMode="cover"
            />:
          <Image style={{ width: 100, height: 150 }} source={{uri : item.uri}} cover="fit" />);
      }

      return (
          <Collection
            numberOfColumns={4}
            data={item}
            renderItem={renderItem}
      
            renderSectionHeader={({ section }) => <Title1>{section.title}</Title1>}
            keyExtractor={(item, index) => `${item}_${index}`}
            refreshing={this.state.refreshing}
            onRefresh={this.refresh}
          />
      );
    }
    */

   const renderItem = item => {

     const ext = item.uri.split('.').pop();

     return (
        <TouchableHighlight onPress={() => ext !== 'jpg' ?
          props.navigation.navigate('Video Player',Object.assign({},item,{ prevRoute: 'Collections Library'})) 
        : props.navigation.navigate('Picture Gallery',item)}>
        <Image style={{ width: 100, height: 150 }} source={ext === 'mov' || ext === 'mp4' ? {uri : item.videoThumbnail} :{uri : item.uri}} cover="fit" />
      </TouchableHighlight>
     );
    }

    const FlatListItemSeparator = () => <View style={styles.line} />;

    const addingToCollection = (collection) => {
      if (props.data.length !== 0) {
        props.navigation.navigate("    RemindMe", {
          prevRoute: "Collections Library",
          collectionId: collection.key,
          isSelecting: true
        });
      } else {
        Alert.alert(
          "No Memos Exist",
          "Please create more memos to add to a collection.",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
      }
    };

    // const extractKey = ({ id }) => id;

    const { collections } = props;

    if (collections) {
        console.log("collections: ");
        console.log(collections);
        console.log("collections[0] = " + collections[0]);
    }

    /*
    let data = collections.filter(xs => xs.length == 0 ? false : true);
    data = data.map(xs =>
      Object.assign({},{
        key: uid(xs),
        data: xs 
      })
    );

    console.log('data: ' + data);
    */

   // filter out null list produced when collections is a singleton
   /*
   const data = collections.filter(xs => xs.data.length == 0 ? false : true);
   */
   // console.log('data: ' + data);

    return (
        <ThemeProvider>
           <View style={{flex: 1}}>
            <View style={{ flex: 0.15, justifyContent: 'flex-start', alignItems: 'center' }}>
              <Switch
                style={{marginRight: 20, marginTop: 10, marginLeft: 250}}
                value={true}
                onValueChange={v => {
                  props.navigation.navigate("    RemindMe");
                }}
              />
              <Text style={{marginTop: 10, marginLeft: 250}}>Memos</Text>
            </View>
            <View style={{flex: 0.85, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap'}}>
              { Platform.OS == 'ios' ?
              <Collection
                numberOfColumns={4}
                data={collections}
                renderItem={renderItem}
                renderSectionFooter={FlatListItemSeparator}
              />:
              collections.map(collection => 
                <View style={{flexDirection: 'row', margin: 20}}>
                  {collection.data.map(item => renderItem(item))}
                  <TouchableOpacity onPress={addingToCollection.bind(this,collection)}>
                    <MaterialIcons name="add" size={32} color="black" />
                  </TouchableOpacity>
                </View>)
              }
            </View>
          </View>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    line: {
      height: 2,
      width: "100%",
      backgroundColor:"black"
    }
  });



const mapStateToProps = state => {
    return {
      collections: state.collections.collections,
      data: state.app.data
    }
  }
  
  const mapDispatchToProps = {
    /*fetchDataAll*/
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CollectionsLibrary);