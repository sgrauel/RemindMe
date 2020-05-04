import * as React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

function PictureGallery(props) {
    const { title, uri, text } = props.route.params;
    return (
        <Grid>
            <Row size={5}>
            </Row>
            <Row size={55}>
                <Col> 
                </Col>
                <Col size={2}></Col>
                    <View>
                        <Image style={styles.image} source={{uri : uri}} mode="cover" />
                    </View>
                <Col>
                </Col>
            </Row>
            <Row size={5}>
                <Col></Col>
                <Col size={2}>
                    <Text style={styles.title}>{title}</Text>
                </Col>
                <Col></Col>
            </Row>
            <Row size={35}>
                <Text style={styles.paragraph}>{text}</Text>
            </Row>
        </Grid>
    );
}

export default PictureGallery;

const win = Dimensions.get('window');

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: 'contain',
        width: win.width,
        height: win.height,
        marginBottom: 20
    },
    paragraph: {
        margin: 20
    },
    title: {
        textAlignVertical: "center",
        textAlign: "center"
    }
});
