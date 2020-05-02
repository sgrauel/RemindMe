import * as React from 'react';
import { View, Text, Image } from 'react-native';

function PictureGallery(props) {
    const { title, uri, text } = props.route.params;
    return (
        <View>
            <Text>{title}</Text>
            <Image style={{ width: 100, height: 150 }} source={{uri : uri}} mode="fit" />
            <Text>{text}</Text>
        </View>
    );
}

export default PictureGallery;
