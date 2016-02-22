'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes: {
    containerStyle: View.propTypes.style,
  };

  render() {
    return (
      <Image
        source={require('../assets/images/camerasBackground.jpg')}
        style={[this.props.containerStyle, styles.backgroundImage]}>
        <View>
          <Text style={styles.text}>Loading...</Text>
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: null,
    height: null,
  },
  text: {
    fontSize: 48,
    color: 'rgba(255,255,255,0.8)',
    backgroundColor: 'rgba(0,0,0,0)',
  },
});

export default Loading;
