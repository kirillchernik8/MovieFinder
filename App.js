import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Button,
  Picker,
  Image,
  Text,
  TouchableHighlight
} from "react-native";
import key from "./key.js";
import Movie from "./Movie.js";
import { Map } from "immutable";
import "isomorphic-fetch";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      toRender: "list",
      selected: null,
      favorites: [],
      showFavs: false,
      listOfGenres: [],
      selectedGenreId: null,
      isAnyGenreSelected: false
    };

    this.getMovies = this.getMovies.bind(this);
    this.onClick = this.onClick.bind(this);
    this.getBack = this.getBack.bind(this);
    this.saveToFavorites = this.saveToFavorites.bind(this);
    this.showFavsOrList = this.showFavsOrList.bind(this);
    this.getGenres = this.getGenres.bind(this);
    this.selectGenre = this.selectGenre.bind(this);
  }

  componentDidMount() {
    this.getGenres();
    this.getMovies();
  }

  getGenres() {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`
    )
      .then(res => res.json())
      .then(resJ => this.setState({ listOfGenres: resJ.genres }))
      .catch(err => console.error(err));
  }

  selectGenre(genre) {
    this.setState(
      {
        isAnyGenreSelected: !this.state.isAnyGenreSelected,
        selectedGenreId: genre.id
      },
      () => this.getMovies()
    );
  }

  showFavsOrList() {
    this.setState({ showFavs: !this.state.showFavs });
  }

  saveToFavorites() {
    let data = {
      id: this.state.selected.id,
      title: this.state.selected.title,
      overview: this.state.selected.overview
    };
    let newState = this.state.favorites.slice();
    newState.push(data);
    this.setState({ favorites: newState });
  }

  onClick(item) {
    this.setState({ toRender: "movie" });
    this.setState({ selected: item });
  }

  getBack() {
    this.setState({ toRender: "list" });
  }

  getMovies() {
    let URLToFetch =
      this.state.selectedGenreId === null
        ? `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false`
        : `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${
            this.state.selectedGenreId
          }`;
    fetch(URLToFetch)
      .then(res => res.json())
      .then(resJ => this.setState({ movies: resJ.results }))
      .catch(err => console.error(err));
  }

  render() {
    let dataToRender = this.state.showFavs
      ? this.state.favorites
      : this.state.movies;
    return (
      <View style={styles.container}>
        {this.state.toRender === "list" ? (
          <Picker
            itemStyle={styles.pickerItem}
            selectedValue={this.state.selectedGenreId}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ selectedGenreId: itemValue }, () =>
                this.getMovies()
              )
            }
          >
            {this.state.listOfGenres.map(genre => {
              return (
                <Picker.Item
                  keyExtractor={item => item.id.toString()}
                  label={genre.name}
                  value={genre.id}
                  style={[styles.picker]}
                />
              );
            })}
          </Picker>
        ) : (
          <Text />
        )}

        {this.state.toRender === "list" ? (
          <View>
            <Button
              style={styles.button}
              color="#1900ff"
              title={this.state.showFavs ? "Show All" : "Show favorites"}
              onPress={this.showFavsOrList}
            />

            <FlatList
              horizontal={true}
              data={dataToRender}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.scroll}>
                  <TouchableHighlight
                    style={{ width: 320, marginLeft: 30 }}
                    onPress={() => this.onClick(item)}
                  >
                    <Image
                      style={{ width: 300, height: 400 }}
                      source={{
                        uri: `https://image.tmdb.org/t/p/w260_and_h390_bestv2${
                          item.poster_path
                        }`
                      }}
                    />
                  </TouchableHighlight>
                  <Button
                    title={item.title}
                    style={styles.titleButton}
                    color="white"
                    onPress={() => this.onClick(item)}
                  />
                </View>
              )}
            />
          </View>
        ) : (
          <Movie
            onPress={this.getBack}
            movietToShow={this.state.selected}
            saveToFav={this.saveToFavorites}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'AvenirNext-Medium-06',
    flex: 1,
    width: wp("100%"),
    height: hp("100%"),
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20%",
    fontFamily: 'AvenirNext-Medium-06',
    borderRadius:10
  },
  scroll: {
    backgroundColor: '#1900ff',
    color: "white",
    paddingTop: 10,
    borderRadius: 25
 
  },
  titleButton:{
    textDecorationColor: "white"
  },
  button: {
    position: "relative",
    marginTop: "20%",
    marginRight:40,
    marginLeft:40,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  picker:{
    height: 50,
    width: 100,
    position: "relative",
    marginTop: "30%",
    marginBottom: "50%"
  },
  pickerItem:{
    color: '#1900ff',
    borderColor: '#1900ff',
  }
});

export default App;
