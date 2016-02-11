'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} from 'react-native';
import config from '../config';

const PARAMS = '?apikey=' + config.API_KEY + '&page_limit=' + config.PAGE_SIZE;
const REQUEST_URL = config.API_URL + PARAMS;

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  async fetchData() {
    let response = await fetch(REQUEST_URL);
    let responseData = await response.json();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
      loaded: true,
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    shadowOffset:{
      width: 10,
      height: 10,
    },
    shadowColor: 'black',
    shadowOpacity: 1.0,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

export default MovieList;
