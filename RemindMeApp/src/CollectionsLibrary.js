import React from 'react';
import { View, Text, Switch, Platform, StyleSheet, Image, Video } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Collection, ThemeProvider } from 'react-native-ios-kit';
import { uid } from 'react-uid';

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

    const FlatListItemSeparator = () => <View style={styles.line} />;

    const extractKey = ({ id }) => id;

    // const extractKey = ({ id }) => id;

    const { collections } = props;

    if (collections) {
        console.log("collections: ");
        console.log(collections);
        console.log("collections[0] = " + collections[0]);
    }

    let data = collections.filter(xs => xs.length == 0 ? false : true);
    data = data.map(xs =>
      Object.assign({},{
        key: uid(xs),
        data: xs 
      })
    );

    console.log('data: ' + data);

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
              {Platform.OS == 'ios' ?
              <Collection
                numberOfColumns={4}
                data={data}
                renderItem={renderItem}
                renderSectionFooter={FlatListItemSeparator}
              />:
              collections.map(collection => 
                <View style={{flexDirection: 'row', margin: 20}}>
                  {collection.map(item => renderItem(item))}
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
      collections: state.collections.collections
    }
  }
  
  const mapDispatchToProps = {
    /*fetchDataAll*/
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CollectionsLibrary);