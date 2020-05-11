import React, {Component} from 'react';
import { Video } from "expo-av";
import { View, Text, FlatList, Image, StyleSheet, Platform, Button, ScrollView, SafeAreaView } from 'react-native';
import { Button as Button_ } from 'react-native-ios-kit';
import { connect } from 'react-redux';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import { dispatchSelectItem, dispatchRemoveItems, dispatchCreateCollection } from '../source/actions/app';
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
              this.props.navigation.navigate('Video Player', item)}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5, margin: 10}}>
              {Platform.OS == 'ios' ?
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

      return (
          <TouchableOpacity
            style={item.selectedClass}
            onPress={() => {
                console.log("call selectItem");
                selectItem(item);
            }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5, margin: 10}} >
              {Platform.OS == 'ios' ?
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



    FlatListItemSeparator = () => <View style={styles.line} />;

    extractKey = ({ id }) => id;

    /*
    ListFooter = () => {
      return Platform.OS == 'ios' ? 
          <Button_ onPress={() => this.props.navigation.navigate('    RemindMe', { isSelecting: false })} 
          title="Create Memo" color="white" rounded inverted> CREATE MEMO </Button_> :
          <Button onPress={() => this.props.navigation.navigate('    RemindMe',{ isSelecting: false })} title="Create Memo" color="#0000ff" />;
    }
    */

    EndSelecting = () => {
      const xs = this.props.data.filter(item => item.isSelected);
      this.props.dispatchCreateCollection(xs);
      this.props.dispatchRemoveItems();
      this.props.navigation.navigate('    RemindMe',{ isSelecting: false });
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
      try {
        isSelecting = this.props.route.params.isSelecting;
      } catch (TypeError) {
      }

      console.log('isSelecting= ' + isSelecting);
      
      return (
        <View style={{flex: 1}}>
        <View style={isSelecting ? {flex: 0.95} : {flex: 1}}>
            <FlatList
              style={styles.container}
              data={data}
              renderItem={isSelecting ? this.renderItem2 : this.renderItem}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              ListFooterComponent={this.ListFooter}
              keyExtractor={this.extractKey}
            />
        </View>
        <View style={isSelecting ? {flex: 0.05} : {flex: 0}}>
        { isSelecting ? (Platform.OS == 'ios' ? 
          <Button_ onPress={this.EndSelecting} 
          title="Done" color="white" rounded inverted> I'm done </Button_> :
            <Button onPress={this.EndSelecting} title="I'm Done" color="#0000ff" />) :
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
    dispatchCreateCollection
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(VideoLibrary);