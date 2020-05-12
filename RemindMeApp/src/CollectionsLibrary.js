import React from 'react';
import { View, Text, Switch } from 'react-native';

function CollectionsLibrary(props) {
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

export default CollectionsLibrary;