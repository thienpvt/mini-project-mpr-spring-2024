import { useMemo, useState } from "react";
import { StyledComponent } from "nativewind";
import { View, Text, Button, Alert } from "react-native";
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import Ripple from "react-native-material-ripple";

export default function StartGameScreen(props: any) {
  const [rowNumber, setRowNumber] = useState<number>();
  const [columnNumber, setColumnNumber] = useState<number>();
  const rowButtons: RadioButtonProps[] = useMemo(() => ([
    {
      id: '2',
      label: '2',
      value: '2',
      color: '#eab308',
      labelStyle: { color: '#eab308' }
    },
    {
      id: '3',
      label: '3',
      value: '3',
      color: '#eab308',
      labelStyle: { color: '#eab308' }
    },
    {
      id: '4',
      label: '4',
      value: '4',
      color: '#eab308',
      labelStyle: { color: '#eab308' }
    },
    {
      id: '5',
      label: '5',
      value: '5',
      color: '#eab308',
      labelStyle: { color: '#eab308' }
    },
    {
      id: '6',
      label: '6',
      value: '6',
      color: '#eab308',
      labelStyle: { color: '#eab308' }
    },
    {
      id: '7',
      label: '7',
      value: '7',
      color: '#eab308',
      labelStyle: { color: '#eab308' }
    },
  ]), []);
  const columnButtons: RadioButtonProps[] = useMemo(() => ([
    {
      id: '2',
      label: '2',
      value: '2',
      color: '#eab308',
      labelStyle: { color: '#eab308' }
    },
    {
      id: '3',
      label: '3',
      value: '3',
      color: '#eab308',
      labelStyle: { color: '#eab308' }
    },
    {
      id: '4',
      label: '4',
      value: '4',
      color: '#eab308',
      labelStyle: { color: '#eab308' }
    },
  ]), []);
  const handlePress = () => {
    if (rowNumber && columnNumber) {
      if (rowNumber * columnNumber % 2 !== 0) {
        Alert.alert('Warning', 'The number of rows multiplied by the number of columns must be divisible by 2, please choose again!', [
          {text: 'OK', style: 'cancel'},
        ]);
        return;
      } else
        props.onStartGame(rowNumber, columnNumber);
    } else{
      Alert.alert('Warning', 'Please choose row number and column number', [
        {text: 'OK', style: 'cancel'},
      ]);
    }
  };
  return (
    <StyledComponent component={View} tw="mt-7 mx-3 container-lg flex">
      <StyledComponent component={Text} tw="text-center text-2xl text-white uppercase">
        Card flip game
      </StyledComponent>
      <StyledComponent component={View} tw="mt-5">
        <StyledComponent component={Text} tw="text-yellow-500 text-lg uppercase">
          Instructions
        </StyledComponent>
        <StyledComponent component={Text} tw="text-white text-base mt-2">
          Click the green cards to see what number they uncover and try to find the matching number underneath the other cards.
        </StyledComponent>
        <StyledComponent component={Text} tw="text-white text-base mt-2">
          Uncover two matching numbers in a row to eliminate them from the game.
        </StyledComponent>
        <StyledComponent component={Text} tw="text-white text-base mt-2">
          Eliminate all cards as fast as you can to win the game. Have fun FLIPing!
        </StyledComponent>
        <StyledComponent component={Text} tw="text-yellow-500 text-lg uppercase my-2">
          Select board size
        </StyledComponent>
        <StyledComponent component={View} tw="flex flex-row items-start mt-3">
          <StyledComponent component={View} tw="flex justify-center w-1/2 ">
            <StyledComponent component={Text} tw="text-white text-base text-center uppercase">
              Rows number
            </StyledComponent>
            <StyledComponent component={RadioGroup} radioButtons={rowButtons} onPress={(rowNumber) => setRowNumber(parseInt(rowNumber))} selectedId={rowNumber?.toString()} />
          </StyledComponent>
          <StyledComponent component={View} tw="flex justify-center w-1/2 ">
            <StyledComponent component={Text} tw="text-white text-base text-center uppercase">
              Columns number
            </StyledComponent>
            <StyledComponent component={RadioGroup} radioButtons={columnButtons} onPress={(columnNumber) => setColumnNumber(parseInt(columnNumber))} selectedId={columnNumber?.toString()} />
          </StyledComponent>
        </StyledComponent>
        <StyledComponent component={View} tw="flex flex-row justify-center mt-5">
          <StyledComponent component={Ripple} rippleContainerBorderRadius={50} tw="px-3 py-2 m-1 bg-rose-950 rounded-xl py-1" onPress={handlePress}>
            <StyledComponent component={Text} tw="text-center text-white text-lg">
              Play game
            </StyledComponent>
          </StyledComponent>
        </StyledComponent>
      </StyledComponent>
    </StyledComponent>
  );
}
