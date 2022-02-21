import React from "react";
import { View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Image } from "react-native-svg";
import { Box } from "../../components";
import CardLayout from "./CardLayout";


export enum CardType {
  VISA,
  MASTERCARD,
}

export interface CardModel {
  id: number;
  type: CardType;
  last4digits: number;
  expirationDate: string;
}

interface CardProps {
  card: CardModel;
  selected: boolean;
  onSelect: () => void;
}

const visaLogo = require("./assets/visa.png");
const mastercardLogo = require("./assets/mastercard.png");

const Card = ({ card, selected, onSelect }: CardProps) => {
  return (
    <CardLayout
      onPress={onSelect}
      backgroundColor={selected ? "primary" : "background"}
    >
      <Image
        style={
          card.type === CardType.VISA
            ? { width: 39, height: 13 }
            : { width: 32.5, height: 20 }
        }
        source={
          card.type === CardType.VISA
            ? visaLogo
            : mastercardLogo
        }
      />
    </CardLayout>
  );
};

export default Card;
