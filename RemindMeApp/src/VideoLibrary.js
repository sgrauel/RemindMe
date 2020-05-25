import React, {Component} from 'react';
import { Video } from "expo-av";
import { View, Text, FlatList, Image, StyleSheet, Platform, Button, Switch } from 'react-native';
import { Button as Button_, ThemeProvider } from 'react-native-ios-kit';
import { connect } from 'react-redux';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import { dispatchSelectItem, dispatchRemoveItems, dispatchCreateCollection, dispatchAddToCollection } from '../source/actions/app';
import { uid } from 'react-uid';
// import { fetchDataAll } from '../source/actions/app';

class VideoLibrary extends Component {
    
    /*
    componentDidMount() {
      const { fetchDataAll } = this.props;
      fetchDataAll()
    }
    */
    
    renderItem = ({ item }) => {
      let view_str = '';
      if (Platform.OS == 'ios') {
        view_str = item.text.slice(0,135);
      } else {
        view_str = item.text.slice(0,230);
      }

      const ext = item.uri.split('.').pop();
      return (
          <TouchableOpacity
            /* style={{backgroundColor: "#87CEFA"}} */
            onPress={() =>
              ext == 'jpg' ? this.props.navigation.navigate('Picture Gallery', item) :
              this.props.navigation.navigate('Video Player', Object.assign({},item,{ prevRoute: 'Video Library'}))}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5, margin: 10}}>
              {Platform.OS == 'ios' && ext !== 'jpg'  ?
                <Video
                  style={{ height: 150, width: 100 }}
                  source={{ uri: item.uri }}
                  usePoster
                  shouldPlay={false}
                  resizeMode="cover"
                />:
                <Image style={{ width: 100, height: 150 }} source={{uri : item.uri}} mode="fit" />
              }
              
              <Text style={styles.row} >
                      {view_str}
              </Text>
            </View>
          </TouchableOpacity>
      )
    }

    renderItem2 = ({ item }) => {

      const selectItem = item => {
        item.isSelected = !item.isSelected;
        item.selectedClass = item.isSelected ? styles.selected : {};
      
        const index = this.props.data.findIndex(
          item_ => item.id === item_.id
        );
        
        console.log("index: " + index);
        console.log('item: ' + item);

        this.props.dispatchSelectItem(index,item);
      };
      

      let view_str = '';
      if (Platform.OS == 'ios') {
        view_str = item.text.slice(0,135);
      } else {
        view_str = item.text.slice(0,230);
      }
      
      const ext = item.uri.split('.').pop();

      return (
          <TouchableOpacity
            style={item.selectedClass}
            onPress={() => {
                console.log("call selectItem");
                selectItem(item);
            }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5, margin: 10}} >
              {Platform.OS == 'ios' && ext !== 'jpg' ?
                <Video
                  style={{ height: 150, width: 100 }}
                  source={{ uri: item.uri }}
                  usePoster
                  shouldPlay={false}
                  resizeMode="cover"
                />:
                <Image style={{ width: 100, height: 150 }} source={{uri : item.uri}} cover="fit" />
              }
              
              <Text style={styles.row} >
                    {view_str}
              </Text>
            </View>
          </TouchableOpacity>
      )
    }



    FlatListItemSeparator = () => <View style={styles.line} />;

    extractKey = ({ id }) => id;

    EndSelecting = () => {
      const xs = this.props.data.filter(item => item.isSelected);
      const key = uid(xs);
      this.props.dispatchCreateCollection(key,xs);
      this.props.dispatchRemoveItems();
      this.props.navigation.navigate('    RemindMe',{ isSelecting: false });
    }

    EndSelecting2 = (collectionId) => {
      const ys = this.props.data.filter(item => item.isSelected);
      this.props.dispatchAddToCollection(collectionId,ys);
      this.props.dispatchRemoveItems();
      this.props.navigation.navigate('    RemindMe', { isSelecting: false});
    }

    render() {
      const { data, collections } = this.props;
      if (data) {
        console.log("data: ");
        console.log(data);
      }

      if (collections) {
        console.log("collections: ");
        console.log(collections); 
      }

      let isSelecting;
      let prevRoute;
      let collectionId;
      try {
        isSelecting = this.props.route.params.isSelecting;
        prevRoute = this.props.route.params.prevRoute;
        collectionId = this.props.route.params.collectionId;
      } catch (TypeError) {
      }

      console.log('isSelecting= ' + isSelecting);
      console.log('prevRoute=' + prevRoute);
      console.log('collectionId=' + collectionId);
      
      return (
        <View style={{flex: 1}}>
        <View style={{ flex: 0.08, justifyContent: 'flex-start', alignItems: 'center' }}>
           <Switch
            style={{marginRight: 20, marginTop: 10, marginLeft: 250}}
            value={false}
            onValueChange={v => {
              this.props.navigation.navigate("Collections Library");
            }}
          />
          <Text style={{marginTop: 10, marginLeft: 250}}>Collections</Text>
        </View>
        <View style={isSelecting ? {flex: 0.87} : {flex: 1}}>
            <FlatList
              style={styles.container}
              data={data}
              renderItem={isSelecting ? this.renderItem2 : this.renderItem}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              keyExtractor={this.extractKey}
            />
        </View>
        <View style={isSelecting ? {flex: 0.05} : {flex: 0}}>

          { isSelecting ? (Platform.OS == 'ios' ? 
          <ThemeProvider>
            <Button_ onPress={prevRoute === 'Collections Library' ? this.EndSelecting2.bind(this,collectionId) : this.EndSelecting} 
          title="Done" color="white" rounded inverted> I'm Done </Button_>
          </ThemeProvider> :
            <Button onPress={prevRoute === 'Collections Library' ? this.EndSelecting2.bind(this,collectionId) : this.EndSelecting} title="I'm Done" color="#0000ff" />) :
            <View></View>}
        </View>
      </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    row: {
      padding: 20,
      marginRight: 80
    },
    line: {
      height: 2,
      width: "100%",
      backgroundColor:"black"
    },
    selected: {
      backgroundColor: "#00BFFF"
    }
  });

  const mapStateToProps = state => {
    return {
      data: state.app.data,
      collections: state.collections.collections
    }
  }
  
  const mapDispatchToProps = {
    /*fetchDataAll*/
    dispatchSelectItem,
    dispatchRemoveItems,
    dispatchCreateCollection,
    dispatchAddToCollection
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(VideoLibrary);