import React from "react";
import { ScrollView } from "react-native";

import Graph, { DataPoint } from "./Graph/Graph";
import Transaction from "./Transaction";

import { Box, Header, Text } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";

const minDate = new Date("2021-08-01").getTime();
const maxDate = new Date("2022-02-01").getTime();

const data: DataPoint[] = [
  {
    date: new Date("2021-10-29").getTime(),
    value: 139.42,
    color: "orange",
    id: 245674,
  },
  {
    date: new Date("2021-11-24").getTime(),
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
              Total Spent
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
          minDate={minDate}
          maxDate={maxDate}
        />
        <ScrollView>
          {data.map((transaction, index) => (
            <Transaction
              key={index}
              transaction={transaction}
            />
          ))}
        </ScrollView>
      </Box>
    </Box>
  );
};

export default TransactionHistory;
