import React from 'react';
import { Camera } from 'expo-camera';
import { Video, Audio } from "expo-av";
import { View, Text, TextInput, ScrollView, Button, Platform, Image } from 'react-native';
import { Button as Button_, ThemeProvider, DefaultTheme, Icon } from 'react-native-ios-kit';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Col, Row, Grid } from "react-native-easy-grid";
import { getCreateMemo } from '../../source/actions/app';
import { connect } from 'react-redux';
import { uid } from 'react-uid';
import * as VideoThumbnails from 'expo-video-thumbnails';


import styles from './styles';
import Toolbar from './toolbar.component';
// import Gallery from './gallery.component';


class CameraPage extends React.Component {
    camera = null;

    state = {
        captures: [],
        title: '',
        text: '',
        capturing: null,
        hasCameraPermission: null,
        cameraType: Camera.Constants.Type.back,
        flashMode: Camera.Constants.FlashMode.off,
        replayMode: false,
        uploadMode: false
    };

    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });

    handleCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
    };

    /*
    playsound = async () => {
        try {
           
           const { sound: soundObject, status } = await 
              Audio.Sound.createAsync(require('../../assets/sounds/Electronic_Chime-KevanGC-495939803.mp3'), { shouldPlay: true });
            return await soundObject.playAsync();
        } 
        catch (error) { console.log(error); }
    };
    */

    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        this.setState({ capturing: false, captures: [photoData, ...this.state.captures], replayMode: true });
    };

    handleLongCapture = async () => {
        const playsound = async () => {
            try {
               
               const { sound: soundObject, status } = await 
                  Audio.Sound.createAsync(require('../../assets/sounds/Electronic_Chime-KevanGC-495939803.mp3'), { shouldPlay: true });
                return await soundObject.playAsync();
            } 
            catch (error) { console.log(error); }
        };

        if (Platform.OS == 'ios') { 
            playsound();
            await new Promise(r => setTimeout(r, 1000)); // sleep 1 second
        }
        
        const videoData = await this.camera.recordAsync();
        this.setState({ capturing: false, captures: [videoData, ...this.state.captures], replayMode: true });
    };

    /*
        - take the head of captures and include it in a call to an action creator
        - navigate to video library with the 'navigate' object
    */
    createMemo = async (captures_, title, text) => {

        const generateThumbnail = async (uri_) => {
            try {
              const { uri } = await VideoThumbnails.getThumbnailAsync(
                uri_,
                {
                  time: 15000,
                }
              );
              return Promise.resolve(uri);
            } catch (e) {
              console.warn(e);
            }
          };


        const { getCreateMemo } = this.props;
        const id = uid(captures_);
        const isSelected = false;
        const selectedClass = {};

        const ext = captures_[0].uri.split('.').pop();
        let memo_ = {};
        if (ext === 'mov' || ext === 'mp4') {
            const videoThumbnail = await generateThumbnail(captures_[0].uri);
            memo_ = Object.assign({},captures_[0],{
                id,
                title,
                text,
                isSelected,
                selectedClass,
                videoThumbnail
            });
        } else {
            memo_ = Object.assign({},captures_[0],{
                id,
                title,
                text,
                isSelected,
                selectedClass
            });
        }

        getCreateMemo(memo_);
        const { navigation } = this.props;
        navigation.navigate('    RemindMe');
    };

    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

        this.setState({ hasCameraPermission });
    };
    

    render() {
        const { hasCameraPermission, flashMode, cameraType, capturing, captures, replayMode, uploadMode, text, title  } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        // add X button to memo page that goes back to the replay page
        if (uploadMode) {
            return (
                <ThemeProvider>
                    <React.Fragment>
                        {Platform.OS == "ios" ? 
                            <View></View>:
                            <MaterialCommunityIcons  
                                onPress={() => this.setState({replayMode: true, uploadMode: false})} 
                                name="close-circle" 
                                size={32} 
                                style={styles.close2} 
                            />
                        }
                        <View style={{ padding: 10, marginBottom: 200, marginTop: 40 }}>
                            <Text>Video Title:</Text> 
                            <TextInput
                                style={{ height: 40, backgroundColor: 'white' }}
                                onChangeText={ttl => this.setState({ title: ttl })}
                                value={title}
                            />
                            <Text>Memorandum:</Text> 
                            <TextInput
                                multiline={true}
                                numberOfLines={100}
                                style={{ height: 80, backgroundColor: 'white' }}
                                onChangeText={txt => this.setState({ text: txt })}
                                value={text}
                            />
                            <ScrollView>
                                <Text style={{ padding: 10, fontSize: 45 }}>
                                    {title}
                                </Text>
                                <Text style={{ padding: 10, fontSize: 25 }}>
                                    {text}
                                </Text>
                            </ScrollView>
                            {Platform.OS == 'ios' ? 
                                <Button_ onPress={() => this.createMemo(captures,title,text)} 
                                         title="Create Memo" color="white" rounded inverted> CREATE MEMO </Button_> :
                                <Button onPress={() => this.createMemo(captures,title,text)} title="Create Memo" color="#0000ff" />}
                        </View>
                    </React.Fragment>
                </ThemeProvider>
                    
            );
        }

        // Image Gallery
        // Put this in between View and Toolbar
        // {captures.length > 0 && <Gallery captures={captures}/>}
        if (!replayMode) {
            return (
                <React.Fragment>
                    <View>
                        <Camera
                            type={cameraType}
                            flashMode={flashMode}
                            style={styles.preview}
                            ref={camera => this.camera = camera}
                        />
                    </View>
                    <Toolbar 
                        capturing={capturing}
                        flashMode={flashMode}
                        cameraType={cameraType}
                        setFlashMode={this.setFlashMode}
                        setCameraType={this.setCameraType}
                        onCaptureIn={this.handleCaptureIn}
                        onCaptureOut={this.handleCaptureOut}
                        onLongCapture={this.handleLongCapture}
                        onShortCapture={this.handleShortCapture}
                    />
                </React.Fragment>
            );
        } else {
            const file_ext = captures[0].uri.split('.').pop();
            return (
                <React.Fragment>
                    <View>
                    {file_ext == 'mp4' || file_ext == 'mov' ?
                        <Video 
                            source={{uri : captures[0].uri }} 
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="cover"
                            shouldPlay
                            isLooping
                            style={styles.cover} 
                        />:
                        <Image
                            source={{uri: captures[0].uri}}
                            resizeMode="cover"
                            style={styles.cover}
                        />   
                    }
                    <MaterialCommunityIcons onPress={() => this.setState({replayMode: false})} name="close-circle" size={32} style={styles.close} />
                    </View>
                    <Grid style={styles.bottomToolbar}>
                        <Row>
                            <Col style={styles.alignCenter}> 
                            </Col>
                            <Col size={2}></Col>
                            <Col style={styles.alignCenter}>
                                <Entypo onPress={() => this.setState({uploadMode: true, replayMode: false})} name="upload" size={32} color="white" />
                            </Col>
                        </Row>
                    </Grid>
                </React.Fragment>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
      data: state.app.data
    }
  }
  
  const mapDispatchToProps = {
    getCreateMemo
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CameraPage);