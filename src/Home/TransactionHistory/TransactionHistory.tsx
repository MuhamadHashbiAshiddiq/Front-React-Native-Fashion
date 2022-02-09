import React from "react";

import Graph, { DataPoint } from "./Graph";

import { Box, Header, Text } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";

const data: DataPoint[] = [
  {
    date: new Date("2021-09-01").getTime(),
    value: 0,
    color: "primary",
  },
  {
    date: new Date("2021-10-21").getTime(),
    value: 0,
    color: "primary",
  },
  {
    date: new Date("2021-11-03").getTime(),
    value: 139.42,
    color: "orange",
  },
  {
    date: new Date("2021-11-24").getTime(),
    value: 281.23,
    color: "yellow",
  },
  {
    date: new Date("2021-12-17").getTime(),
    value: 0,
    color: "primary",
  },
  {
    date: new Date("2022-01-08").getTime(),
    value: 198.54,
    color: "danger",
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
        <Graph data={data} />
      </Box>
    </Box>
  );
};

export default TransactionHistory;
