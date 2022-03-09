import React, { useEffect, useState } from "react";
import { FlatList, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeRoutes } from "../../components/Navigation";
import { Image, Text } from "../../components/Theme";
import api from "../../utils/api";

const Item = ({ title }: { title: any }) => {
  // console.log("title", title);
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>;
};

const ProductList = ({ navigation }: HomeRoutes<ProductList>) => {
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

  const renderItem = ({ item }: { item: any }) => (
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
          <Text Style={{ fontWeight: "bold" }}>{item.title}</Text>
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
          data={data}
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
