'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import BackgroundImageContainer from './BackgroundImageContainer';

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes: {
    containerStyle: View.propTypes.style,
  };

  render() {
    return (
      <BackgroundImageContainer
        image={require('../assets/images/camerasBackground.jpg')}>
        <View>
          <Text style={styles.text}>Loading...</Text>
        </View>
      </BackgroundImageContainer>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 48,
    fontFamily: 'Park Lane NF',
    color: 'rgba(255,255,255,0.8)',
    backgroundColor: 'rgba(0,0,0,0)',
  },
});

export default Loading;
