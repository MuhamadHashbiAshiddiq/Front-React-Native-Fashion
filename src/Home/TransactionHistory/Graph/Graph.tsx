import React from "react";
import { Dimensions } from "react-native";

import { useTheme, Box } from "../../../components";
import { Theme } from "../../../components/Theme";

import { lerp } from "./Scale";
import Underlay, { MARGIN } from "./Underlay";

const { width: wWidth } = Dimensions.get("window");
const aspectRatio = 195 / 305;

export interface DataPoint {
  date: number;
  value: number;
  color: keyof Theme["colors"];
  id: number;
}

interface GraphProps {
  data: DataPoint[];
  minDate: number;
  maxDate: number;
}

const Graph = ({ data, minDate, maxDate }: GraphProps) => {
  const numberOfMonths = new Date(
    maxDate - minDate
  ).getMonth();
  const theme = useTheme();
  const canvasWidth = wWidth - theme.spacing.m * 2;
  const canvasHeight = canvasWidth * aspectRatio;
  const width = canvasWidth - theme.spacing.l;
  const height = canvasHeight - theme.spacing.l;
  const step = width / numberOfMonths;
  const values = data.map((p) => p.value);
  const dates = data.map((p) => p.date);
  const minY = Math.min(...values);
  const maxY = Math.max(...values);

  return (
    <Box
      marginTop={MARGIN}
      paddingBottom={MARGIN}
      paddingLeft={MARGIN}
    >
      <Underlay
        minY={minY}
        maxY={maxY}
        minX={minDate}
        maxX={maxDate}
        dates={dates}
        step={step}
      />
      <Box width={width} height={height}>
        {data.map((point) => {
          const i = new Date(
            point.date - minDate
          ).getMonth();
          if (point.value === 0) {
            return null;
          }
          return (
            <Box
              key={point.id}
              position="absolute"
              left={i * step}
              bottom={0}
              width={step}
              height={lerp(0, height, point.value / maxY)}
            >
              <Box
                backgroundColor={point.color}
                position="absolute"
                opacity={0.1}
                top={0}
                bottom={0}
                borderTopLeftRadius="m"
                borderTopRightRadius="m"
                left={theme.spacing.m}
                right={theme.spacing.m}
              />
              <Box
                backgroundColor={point.color}
                position="absolute"
                top={0}
                height={32}
                left={theme.spacing.m}
                right={theme.spacing.m}
                borderRadius="m"
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Graph;
