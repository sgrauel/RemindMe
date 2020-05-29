import React, { useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { dispatchUpdateMemo } from '../source/actions/app';

function PictureGallery(props) {


    const [isEditing,setIsEditing] = useState(false);
    const { id ,title, uri, text, prevRoute } = props.route.params;
    const [txt,setTxt] = useState(text);
    const [ttl,setTtl] = useState(title);

    return (
        <Grid>
             <Row size={5}></Row>
             <Row size={5}>
                <Col></Col>
                <Col size={2}>
                    { isEditing ?
                                    <TextInput
                                        value={ttl}
                                        onChangeText={(value) => setTtl(value)}
                                        autoFocus
                                        style={[styles.title,{ backgroundColor: 'white'}]}
                                    /> :
                                    <Text style={styles.title}>{ttl}</Text>
                    }
                </Col>
                <Col></Col>
            </Row>
            <Row size={20}>
                        <ScrollView>
                        { isEditing ?
                                    <TextInput
                                        value={txt}
                                        onChangeText={(value) => setTxt(value)}
                                        autoFocus
                                        style={styles.paragraphEdit}
                                        multiline={true}
                                        numberOfLines={10}
                                    /> :
                                    <Text
                                        style={styles.paragraph}
                                    >
                                        {txt}
                                    </Text>
                            }
                        </ScrollView>
            </Row>
            <Row size={10}>
                { isEditing ?
                <TouchableOpacity onPress={() => {
                        console.log('prevRoute: ' + prevRoute);
                        console.log('title: ' + ttl);
                        console.log('text: ' + txt);
                        console.log('id: ' + id);

                        const { data } = props;
                        if (data) {
                            console.log("data: ");
                            console.log(data);
                        }

                        props.dispatchUpdateMemo(id,ttl,txt);
                        setIsEditing(false);
                    }
                }>
                    <FontAwesome5 style={styles.saveedit} name="save" size={35} color="black" />
                </TouchableOpacity> :
                <TouchableOpacity onPress={() => setIsEditing(true)} >
                    <AntDesign style={styles.saveedit} name="edit" size={35} color="black" /> 
                </TouchableOpacity>
                }
            </Row>
            <Row size={60}>
                <Col> 
                </Col>
                <Col size={2}></Col>
                    <View>
                        <Image style={styles.image} source={{uri : uri}} mode="cover" />
                    </View>
                <Col>
                </Col>
            </Row>
        </Grid>
    );
}


const mapStateToProps = state => {
    return {
        data: state.app.data
    };
  }
  
  const mapDispatchToProps = {
    dispatchUpdateMemo
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(PictureGallery);

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
    paragraphEdit: {
        margin: 20,
        backgroundColor: 'white',
        height: 100
    },
    title: {
        textAlignVertical: "center",
        textAlign: "center"
    },
    saveedit: {
        marginLeft: 350
    }
});
