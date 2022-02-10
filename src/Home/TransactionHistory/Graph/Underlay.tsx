import React from "react";
import { StyleSheet } from "react-native";

import { Box, Text, useTheme } from "../../../components";
import { lerp } from "./Scale";

export const MARGIN = "xl";

const ROW_HEIGHT = 16;
const formatter = Intl.DateTimeFormat("en", {
  month: "short",
});

interface UnderlayProps {
  minY: number;
  maxY: number;
  minX: number;
  maxX: number;
  dates: number[];
  step: number;
}

const Underlay = ({
  dates,
  minY,
  maxY,
  step,
  minX,
  maxX,
}: UnderlayProps) => {
  const theme = useTheme();
  const numberOfMonths = new Date(maxX - minX).getMonth();
  const minDate = new Date(minX);

  return (
    <Box style={StyleSheet.absoluteFill}>
      <Box flex={1} justifyContent="space-between">
        {[1, 0.66, 0.33, 0].map((t) => {
          return (
            <Box
              key={t}
              flexDirection="row"
              alignItems="center"
              height={ROW_HEIGHT}
              style={{
                top:
                  t === 0
                    ? ROW_HEIGHT / 2
                    : t === 1
                    ? -ROW_HEIGHT / 2
                    : 0,
              }}
            >
              <Box
                width={theme.spacing[MARGIN]}
                paddingRight="s"
              >
                <Text color="darkGrey" textAlign="right">
                  {Math.round(lerp(minY, maxY, t))}
                </Text>
              </Box>
              <Box
                flex={1}
                height={1}
                backgroundColor="grey"
              />
            </Box>
          );
        })}
      </Box>
      <Box
        marginLeft={MARGIN}
        height={theme.spacing[MARGIN]}
        flexDirection="row"
        alignItems="center"
      >
        {new Array(numberOfMonths)
          .fill(0)
          .map(
            (_, i) =>
              new Date(
                minDate.setMonth(minDate.getMonth() + i)
              )
          )
          .map((date, index) => (
            <Box width={step} key={index}>
              <Text color="darkGrey" textAlign="center">
                {formatter.format(new Date(date))}
              </Text>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default Underlay;
