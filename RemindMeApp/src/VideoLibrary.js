import React, {Component} from 'react';
import { Video } from "expo-av";
import { View, Text, FlatList, Image, StyleSheet, Platform } from 'react-native';
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
      return (
          <TouchableOpacity onPress={() => alert('item pressed!')}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
              
              <Text style={styles.row}>
                      {view_str}
              </Text>
            </View>
          </TouchableOpacity>
      )
    }
    //
    render() {
      const { data } = this.props;
      if (data) {
        console.log(data);
      }
      return (
        <FlatList
            style={styles.container}
            data={data}
            renderItem={this.renderItem}
            /* keyExtractor={this.extractKey} */
          />
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    row: {
      padding: 20,
      marginBottom: 5,
      marginRight: 80,
      backgroundColor: 'skyblue',
    },
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