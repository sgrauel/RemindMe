import React, {Component} from 'react';
import { Video } from "expo-av";
import { View, Text, FlatList, Image, StyleSheet, Platform, Button, ScrollView } from 'react-native';
import { Button as Button_ } from 'react-native-ios-kit';
import { connect } from 'react-redux';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';
// import { fetchDataAll } from '../source/actions/app';

class VideoLibrary extends Component {
    
    /*
    componentDidMount() {
      const { fetchDataAll } = this.props;
      fetchDataAll()
    }
    */

    /*
    rows = [
      { id: 0, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '},
      { id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '},
      { id: 2, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '},
      { id: 3, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '},
      { id: 4, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' },
      { id: 5, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' }
    ]
    
    extractKey = ({ id }) => id
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
            onPress={() => { 
              ext == 'jpg' ? this.props.navigation.navigate('Picture Gallery', item) :
              this.props.navigation.navigate('Video Player', item);
              console.log("call this.selectItem(item)");
              }
            }>
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

    renderItem2 = ({ item }) => {
      let view_str = '';
      if (Platform.OS == 'ios') {
        view_str = item.text.slice(0,135);
      } else {
        view_str = item.text.slice(0,230);
      }

      const ext = item.uri.split('.').pop();
      return (
          <TouchableOpacity
            onPress={() => console.log("call this.selectItem(item)")}>
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

    /*
    ListFooter = () => {
      return Platform.OS == 'ios' ? 
          <Button_ onPress={() => this.props.navigation.navigate('    RemindMe', { isSelecting: false })} 
          title="Create Memo" color="white" rounded inverted> CREATE MEMO </Button_> :
          <Button onPress={() => this.props.navigation.navigate('    RemindMe',{ isSelecting: false })} title="Create Memo" color="#0000ff" />;
    }
    */

    render() {
      const { data } = this.props;
      if (data) {
        console.log(data);
      }

      let isSelecting;
      try {
        isSelecting = this.props.route.params.isSelecting;
      } catch (TypeError) {
      }

      console.log('isSelecting= ' + isSelecting);
      
      return (
        <ScrollView style={{flex: 1}}>
          <FlatList
              style={styles.container}
              data={data}
              renderItem={isSelecting ? this.renderItem2 : this.renderItem}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              ListFooterComponent={this.ListFooter}
            /* keyExtractor={this.extractKey} */
            />
            { isSelecting ? (Platform.OS == 'ios' ? 
          <Button_ onPress={() => this.props.navigation.navigate('    RemindMe', { isSelecting: false })} 
          title="Done" color="white" rounded inverted> I'm done </Button_> :
            <Button onPress={() => this.props.navigation.navigate('    RemindMe',{ isSelecting: false })} title="I'm Done" color="#0000ff" />) :
            <View></View>}
        </ScrollView>
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
    }
  });

  const mapStateToProps = state => {
    return {
      data: state.app.data
    }
  }
  
  const mapDispatchToProps = {
    /*fetchDataAll*/
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(VideoLibrary);