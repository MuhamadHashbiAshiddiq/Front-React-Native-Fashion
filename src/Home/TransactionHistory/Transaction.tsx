import React from "react";

import { Box, Text } from "../../components";

import { DataPoint } from "./Graph";

interface TransactionProps {
  transaction: DataPoint;
}

const Transaction = ({ transaction }: TransactionProps) => {
  return (
    <Box>
      <Box>
        <Box flexDirection="row" alignItems="center">
          <Box
            backgroundColor={transaction.color}
            marginRight="s"
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
            }}
          />
          <Text variant="title3">{`#${transaction.id}`}</Text>
        </Box>
        <Text>{`#${transaction.value} - ${new Date(
          transaction.date
        ).toLocaleDateString()}`}</Text>
      </Box>
      <Box>
        <Text color="secondary">See more</Text>
      </Box>
    </Box>
  );
};

export default Transaction;
