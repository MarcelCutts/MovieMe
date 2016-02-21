'use strict';
import React, {
  Component,
  Text,
  View,
} from 'react-native';

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={this.props.style}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }
}

export default Loading;
