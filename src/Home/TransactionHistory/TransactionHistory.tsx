import React from "react";
import {
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from "react-native";

import Graph, { DataPoint } from "./Graph/Graph";
import Transaction from "./Transaction";
import TopCurve from "./TopCurve";

import {
  Box,
  Header,
  Text,
  makeStyles,
} from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import { Theme } from "../../components/Theme";

const footerHeight = Dimensions.get("window").width / 3;

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: theme.borderRadii.xl,
  },
  scrollView: {
    paddingBottom: footerHeight,
  },
}));

const startDate = new Date("2021-08-01").getTime();
const numberOfMonths = 6;

const data: DataPoint[] = [
  {
    date: new Date("2021-10-10").getTime(),
    value: 139.42,
    color: "orange",
    id: 245674,
  },
  {
    date: new Date("2021-11-15").getTime(),
    value: 281.23,
    color: "yellow",
    id: 245675,
  },
  {
    date: new Date("2022-01-08").getTime(),
    value: 198.54,
    color: "danger",
    id: 245676,
  },
];

const TransactionHistory = ({
  navigation,
}: HomeNavigationProps<"TransactionHistory">) => {
  const styles = useStyles();
  return (
    <Box flex={1} backgroundColor="white">
      <Header
        left={{
          icon: "menu",
          onPress: () => navigation.openDrawer(),
        }}
        right={{
          icon: "share",
          onPress: () => true,
        }}
        title="Transaction History"
      />
      <Box padding="m">
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Box>
            <Text
              variant="header"
              color="secondary"
              opacity={0.3}
            >
              TOTAL SPENT
            </Text>
            <Text variant="title1">$619.19</Text>
          </Box>
          <Box
            backgroundColor="primaryLight"
            borderRadius="m"
            padding="m"
          >
            <Text color="primary">All Time</Text>
          </Box>
        </Box>
        <Graph
          data={data}
          startDate={startDate}
          numberOfMonths={numberOfMonths}
        />
        <ScrollView
          contentContainerStyle={styles.scrollView}
        >
          {data.map((transaction, index) => (
            <Transaction
              key={index}
              transaction={transaction}
            />
          ))}
        </ScrollView>
      </Box>
      <TopCurve {...{ footerHeight }} />
      <Box
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        height={footerHeight}
      >
        <Image
          style={styles.footer}
          source={require("../../components/assets/patterns/patterns3.png")}
        />
      </Box>
    </Box>
  );
};

export default TransactionHistory;
