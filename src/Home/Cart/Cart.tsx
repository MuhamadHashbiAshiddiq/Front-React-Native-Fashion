import React from "react";
import { Header } from "../../components";
import CartContainer from "./CartContainer";

const Cart = () => {
  return (
    <CartContainer>
      <Header
        left={{
          icon: "Menu",
          onPress: () => navigation.openDrawer(),
        }}
        right={{ icon: "share", onPress: () => true }}
        title="Cart"
      />
    </CartContainer>
  );
};

export default Cart;
