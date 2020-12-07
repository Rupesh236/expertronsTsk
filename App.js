import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Voice from '@react-native-community/voice';
import Video from 'react-native-video';

const {height, width} = Dimensions.get('window');

function Assignment() {
  const [end, setEnd] = useState(
    'https://images.all-free-download.com/footage_preview/webm/pigeon_107.webm',
  );
  const [getError, setError] = useState('');
  const [getResult, setResult] = useState('');
  const Question = [
    'Pigeon is bird',
    'Grapes is fruit',
    'Nature is our Mother',
  ];
  const Data = [
    'https://images.all-free-download.com/footage_preview/webm/pigeon_107.webm',
    'https://images.all-free-download.com/footage_preview/webm/merlot_grape_145.webm',
    'https://images.all-free-download.com/footage_preview/webm/scallions_69.webm',
  ];

  useEffect(() => {
    Voice.onSpeechStart = SpeechStart;
    Voice.onSpeechEnd = SpeechEnd;
    Voice.onSpeechError = SpeechError;
    Voice.onSpeechResults = SpeechResult;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const afterEnd = (res) => {
    console.log(typeof res);
    Question.map((question, index) => {
      console.log(question.toLowerCase());
      if (res == question.toLowerCase()) {
        setEnd(Data[index]);
      } else {
        console.log('somting is wrong');
      }
    });
  };

  const SpeechStart = (event) => {
    console.log('SpeechStart: ', event.value);
  };

  const SpeechEnd = (event) => {
    console.log('SpeechEnd: ', event.value);
  };

  const SpeechError = (event) => {
    console.log('SpeechError: ', event);
    setError(JSON.stringify(event.error));
  };

  const SpeechResult = (event) => {
    console.log('SpeechResult:', event.value[0]);
    setResult(event.value[0]);
    //setEnd(event.value[0]);
    afterEnd(event.value[0].toLowerCase());
  };

  return (
    <View style={styles.styleContainer}>
      <View style={styles.styleVideoView}>
        <Video
          style={{
            flex: 1,
            borderRadius: 20,
          }}
          resizeMode="cover"
          source={{
            uri: end,
          }}
          onError={(err) => console.log(err)}
          // onReadyForDisplay={() => {
          //   console.log(Data.indexOf(end));
          // }}
          // onEnd={() => {
          //   console.log(Data.indexOf(end));
          // }}
        ></Video>
      </View>
      <View style={styles.styleModal}>
        <View style={styles.styleTxtView}>
          <TouchableOpacity onPress={() => setEnd(Data[0])}>
            <Icons name="play-circle-outline" size={20} color="blue"></Icons>
          </TouchableOpacity>
          <Text style={styles.styleTxt}>{Question[0]}</Text>
        </View>
        <View style={styles.styleTxtView}>
          <TouchableOpacity onPress={() => setEnd(Data[1])}>
            <Icons name="play-circle-outline" size={20} color="blue"></Icons>
          </TouchableOpacity>
          <Text style={styles.styleTxt}>{Question[1]}</Text>
        </View>
        <View style={styles.styleTxtView}>
          <TouchableOpacity onPress={() => setEnd(Data[2])}>
            <Icons name="play-circle-outline" size={20} color="blue"></Icons>
          </TouchableOpacity>
          <Text style={styles.styleTxt}>{Question[2]}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.styleMicrophone}
        onPress={() => Voice.start('en-US')}>
        <Icons name="microphone" size={50} color="#ffffff"></Icons>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  styleVideoView: {
    height: height * 0.6,
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 20,
    borderColor: 'blue',
    borderWidth: 1,
  },
  styleModal: {
    marginTop: 10,
    marginHorizontal: 40,
  },
  styleTxt: {
    color: 'red',
    marginVertical: 10,
    paddingLeft: 10,
  },
  styleTxtView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  styleMicrophone: {
    marginTop: 10,
    width: 70,
    height: 70,
    alignSelf: 'center',
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 70 / 2,
  },
});

export default Assignment;
