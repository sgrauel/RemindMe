import * as React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

export default function VideoLibrary() {

    const rows = [
      { id: 0, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '},
      { id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '},
      { id: 2, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '},
      { id: 3, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '},
      { id: 4, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' },
      { id: 5, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' }
    ]
    
    const extractKey = ({ id }) => id
    
    const renderItem = ({ item }) => {
      return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Image style={{ width: 100, height: 150 }} source={require('../img/Rosler-LeFlaneur319x253.jpg')} />
          <Text style={styles.row}>
                  {item.text}
          </Text>
        </View>
      )
    }
  
  
    return (
      <FlatList
          style={styles.container}
          data={rows}
          renderItem={renderItem}
          keyExtractor={extractKey}
        />
      /*
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
      */
    );
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