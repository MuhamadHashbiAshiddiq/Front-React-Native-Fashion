// import { State } from "react-native-gesture-handler";
// import Animated, {
//   block,
//   startClock,
// } from "react-native-reanimated";
// import {
//   snapPoint,
//   spring,
//   useClock,
//   useValue,
// } from "react-native-redash";
// import { add, cond, eq, set } from "lodash";

// interface WithSpringParams {
//   value: Animated.Node<number>;
//   velocity: Animated.Node<number>;
//   state: Animated.Node<State>;
//   snapPoints: number[];
//   onSnap: (values: readonly number[]) => void;
// }

// export const useSpring = ({
//   value,
//   velocity,
//   state: gestureState,
//   snapPoints,
//   onSnap,
// }: WithSpringParams) => {
//   const offset = useValue(0);
//   const clock = useClock();
//   const state = {
//     position: useValue(0),
//     finished: useValue(0),
//     time: useValue(0),
//     velocity: useValue(0),
//   };
//   const config = {
//     toValue: useValue(0),
//     damping: 6,
//     mass: 1,
//     stiffness: 64,
//     overshootClamping: useValue(0),
//     restSpeedThreshold: useValue(0.01),
//     restDisplacementThreshold: useValue(0.01),
//   };

//   return block([
//     cond(eq(gestureState, State.BEGAN), [
//       set(offset, state.position),
//     ]),
//     cond(eq(gestureState, State.ACTIVE), [
//       set(state.position, add(offset, value)),
//       set(state.velocity, velocity),
//       set(
//         config.toValue,
//         snapPoint(
//           state.position,
//           state.velocity,
//           snapPoints
//         )
//       ),
//     ]),
//     cond(eq(gestureState, State.END), [
//       startClock(clock),
//       spring(clock, state, config),
//     ]),
//     state.position,
//   ]);
// };
