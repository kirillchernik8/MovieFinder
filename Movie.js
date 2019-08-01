import React from 'react';
import { StyleSheet, Text, View, Button, Image, StatusBar } from 'react-native';
import 'isomorphic-fetch';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";


class Movie extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#4F6D7A"
        />
        <View style={styles.back}>
          <Button title=" Back to The List " onPress={this.props.onPress} color='#1900ff'/>
        </View>
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w260_and_h390_bestv2${
              this.props.movietToShow.poster_path
            }`,
          }}
        />
        <Text style={styles.header}> {this.props.movietToShow.title} </Text>
        <Text style={styles.overview}>{this.props.movietToShow.overview}</Text>
        <View style={styles.save}>
        <Button title="save" onPress={this.props.saveToFav} color='#1900ff'/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1900ff',
    height: wp('280%'),
    color: "white"
  },
  header: {
    fontSize: 20,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    position: 'relative',
    top:200,
    color: "white"
  },
  image: {
    width: wp('54.5%'),
    height: hp("40%"),
    position: 'relative',
    left: 25,
    top:200
  },
  overview: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    marginTop: 20,
    position: 'relative',
    top:200,
    color: "white"
  },
  back: {
    backgroundColor: 'white',
    borderRadius: 5,
    position: 'relative',
    top:200,
  },
  save:{
    backgroundColor: 'white',
    position: 'relative',
    top:200,
  }
});

export default Movie;
