'use strict';
import React, {
  Component,
  StyleSheet,
  Image
} from 'react-native';

class BackgroundImageContainer extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes: {
    children: React.element;
  };

  render() {
    return (
      <Image
        source={this.props.image}
        resizeMode="cover"
        style={styles.backgroundImageContainer}>
        {this.props.children}
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImageContainer: {
    width: null,
    height: null,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BackgroundImageContainer;
