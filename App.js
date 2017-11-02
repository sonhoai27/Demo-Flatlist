/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Button,
  TextInput
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component{
  constructor(props){
    super(props)
    this.state={
      mang: [],
      statusRefresh: false,
      pageOfPrd: 2,
    }
  }
  render() {
    return (
     <View>
       <Header/>
       <SearchBar/>
        <FlatList
          refreshing={this.state.statusRefresh}  
          onRefresh={()=> {
            this._refresh()
          }}
          onEndReachedThreshold={1}
          onEndReached={()=> {
            this._refresh()
          }}

          numColumns={1}
          data={this.state.mang}
          renderItem={({item}) =>
            <View style={styles.item}>
              <View style={styles.ViewL}>
                <Image  style={{width: 150, height: 200, borderRadius: 8}}
                  source={{uri: item.image}}
                />
              </View>
              <View style={styles.ViewR}>
                <Text style={styles.name}>
                    {item.name}
                </Text>
                <Text style={styles.price}>
                    {item.price}
                </Text>
                <View style={styles.btnAddToCart}>
                  <Button
                    title="Add to cart"
                    onPress={()=> this._onPressAddToCart(item.price)}
                    
                  />
                </View>
              </View>
            </View>

          }
        />
     </View>
    );
  }

  _refresh(){

    this.setState({
      statusRefresh: true,
      pageOfPrd: this.state.pageOfPrd + 1,
    })
      fetch("http://192.168.1.118:8082/FlatList/getAllPrd.php?page=" + this.state.pageOfPrd)
      .then((res)=> res.json())
      .then((resJson)=> {
        if(resJson != ""){
            this.setState({
              mang: this.state.mang.concat(resJson),
              statusRefresh: false,
          })
        }else{
          alert("Hết")
          this.setState({
              statusRefresh: false,
          })
        }
      })
      .catch((e)=> {
        console.log(e + "")
      })
  }

  componentDidMount(){
    fetch("http://192.168.1.118:8082/FlatList/getAllPrd.php?page=1")
    .then((res)=> res.json())
    .then((resJson)=> {
      this.setState({
        mang: resJson
      })
    })
    .catch((e)=> {
      console.log(e + "")
    })
  }

  _onPressAddToCart(id){
    alert("Đã thêm vào giỏ hàng." + id)
  }
}

class Header extends Component{
  render(){
    return(
      <View style={styles.header}>
          <View style={styles.viewHeaderMenu}>
            <Image 
                style={styles.img_menu}
                source={{uri: 'https://maxcdn.icons8.com/Share/icon/p1em/User_Interface//menu1600.png'}}>
            </Image>
          </View>
          <View style={styles.viewHeaderShop}>
            <Text style={styles.txt_header}>DQWatch</Text>
          </View>
          <View style={styles.viewHeaderCart}>
            <Image 
              style={styles.img_cart}
              source={{uri: 'http://icons.iconarchive.com/icons/icons8/ios7/512/Ecommerce-Shopping-Bag-icon.png'}}>
            </Image>
          </View>
      </View>
    );
  }
}
class SearchBar extends Component{
  render(){
    return(
      <View>
        <TextInput style={styles.searchBar}
          placeholder={"Search"}
          underlineColorAndroid='transparent'
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    height: 44,
    backgroundColor: '#08f',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: "space-between",
    padding: 6,
  },
  txt_header: {
    color: '#fff',
    fontSize: 18,
  },
  img_menu: {
    height: 25,
    width: 25,
  },
  img_cart: {
    height: 25,
    width: 25,
    
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  name: {
    fontSize: 14,
  },
  price: {
    color: '#08f',
    marginTop: 10,
  },
  ViewR: {
    flex: 1,
    position: 'relative',
  },
  ViewL: {
    flex: 1
  },
  btnAddToCart: {
    position: 'absolute',
    bottom: 10,
  },
  searchBar: {
    height: 40,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#eee'
  }
});
