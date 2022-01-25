import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import Animated from "react-native-reanimated";

interface SubslideProps {
  subtitle: string;
  description: string;
  last?: boolean;
}

const Subslide = ({
  subtitle,
  description,
  last,
}: SubslideProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },

  subtitle: {
    fontFamily: "SFProText-Semibold",
    fontSize: 24,
    lineHeight: 30,
    marginBottom: 12,
    color: "black",
    textAlign: "center",
  },

  description: {
    fontFamily: "SFProText-Regular",
    fontSize: 16,
    lineHeight: 24,
    color: "black",
    textAlign: "center",
    marginBottom: 40,
  },
});

export default Subslide;
