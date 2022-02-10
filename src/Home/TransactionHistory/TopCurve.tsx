import React from "react";
import Svg, {
  Circle,
  ClipPath,
  Defs,
  Path,
  Rect,
} from "react-native-svg";

import { useTheme } from "../../components";

interface TopCurveProps {
  footerHeight: number;
}

const TopCurve = ({ footerHeight }: TopCurveProps) => {
  const theme = useTheme();
  const size = theme.borderRadii.xl;

  return (
    <Svg
      width={size}
      height={size}
      style={{
        position: "absolute",
        bottom: footerHeight,
        right: 0,
      }}
      viewBox="0 0 1 1"
    >
      <Defs>
        <ClipPath id="clip">
          <Path
            d="M 0 1 A 0 0, 0, 0, 0, 1 0 L 1 1"
            fill={theme.colors.lightBlue}
          />
        </ClipPath>
      </Defs>
      <Rect
        clipPath="url(#clip)"
        x={0}
        y={0}
        width={1}
        height={1}
        fill={theme.colors.lightBlue}
      />
      <Circle
        cx={0.5}
        cy={0.5}
        r={0.5}
        fill={theme.colors.danger}
        clipPath="url(#clip)"
      />
    </Svg>
  );
};

export default TopCurve;
