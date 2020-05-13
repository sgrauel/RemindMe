import React from 'react';
import { View, Text, Switch } from 'react-native';
import { connect } from 'react-redux';

function CollectionsLibrary(props) {

    /*
    const renderCollection = ({ collection }) => {

    }

    const FlatListItemSeparator = () => <View style={styles.line} />;
    */

    // const extractKey = ({ id }) => id;

    /*
    const { collections } = this.props;

    if (collections) {
        console.log("collections: ");
        console.log(collections); 
    }
    */


    return (
        <View style={{flex: 1}}>
        <View style={{ flex: 0.08, justifyContent: 'flex-start', alignItems: 'center' }}>
           <Switch
            style={{marginRight: 20, marginTop: 10, marginLeft: 250}}
            value={true}
            onValueChange={v => {
              props.navigation.navigate("    RemindMe");
            }}
          />
          <Text style={{marginTop: 10, marginLeft: 250}}>Memos</Text>
        </View>
        <View style={{flex: 0.92}}>
        </View>
      </View>
    );
}

/*
const styles = StyleSheet.create({
    line: {
      height: 2,
      width: "100%",
      backgroundColor:"black"
    }
  });
*/



const mapStateToProps = state => {
    return {
      collections: state.collections.collections
    }
  }
  
  const mapDispatchToProps = {
    /*fetchDataAll*/
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CollectionsLibrary);