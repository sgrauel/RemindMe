import * as React from 'react';
import { View, Text } from 'react-native';
import { Video } from "expo-av";

function VideoPlayer({route}) {
    const { title, uri, text } = route.params;

    return (
        <View>
            <Text>{title}</Text> 
            <Text>{uri}</Text>
            <Text>{text}</Text>
        </View>
    );
}

export default VideoPlayer;