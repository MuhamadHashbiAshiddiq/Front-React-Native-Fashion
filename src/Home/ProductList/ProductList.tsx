import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeRoutes } from "../../components/Navigation";
import { Box, Text, Image } from "../../components/Theme";
import api from "../../utils/api";
import NewsCard from "./NewsCard";
import { Product } from "./Product";
import { StyleSheet, StatusBar } from "react-native";

const Item = ({ title }) => {
  // console.log("title", title);
  <View style={StyleSheet.item}>
    <Text style={styles.title}>{title}</Text>
  </View>;
};

const ProductList = ({
  navigation,
}: HomeRoutes<ProductList>) => {
  const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  function getDataProduct() {
    api
      .get("products")
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch(function (err) {
        // console.log(err);
      });
    // .finally(function () {
    //   setIsLoading(false);
    // });
  }

  if (!data) {
    return null;
  }
  // const getDataProduct = async () => {
  //   let res;
  //   try {
  //     const res = await api.get("products").then((res) => {
  //       console.log(res.data);
  //       setData(res.data);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  useEffect(() => {
    // setIsLoading(true);
    getDataProduct();
  }, []);

  const renderItem = ({ item }) => (
    <>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          marginHorizontal: 5,
        }}
      >
        <Image
          style={{
            width: 100,
            height: 100,
          }}
          source={{ uri: item.image }}
        />
        <View
          style={{
            justifyContent: "space-between",
          }}
        >
          <Text Style={{ fontWeight: "bold" }}>
            {item.title}
          </Text>
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text>test</Text>
      {/* {isLoading ? (
        <ActivityIndicator />
      ) : (
        )} */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={data.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default ProductList;
