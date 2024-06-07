import { StyledComponent } from "nativewind";
import { useEffect, useMemo, useState } from "react";
import { View, Text, Alert } from "react-native";
import Ripple from "react-native-material-ripple";

export default function GameScreen(props: any) {
  const elements = useMemo(() => {
    return props.rowNumber * props.columnNumber
  }, []);
  const widthClassCards=useMemo(()=>{
    if(props.columnNumber===2){
      return "w-1/2"
    }
    else if(props.columnNumber===3) return "w-5/6"
  },[])
  const [array,setArray] = useState<number[]>(generateArray(elements));
  const [selectedArray, setSelectedArray] = useState<number[]>([]);
  const [tempSelected, setTempSelected] = useState<number[]>([]);
  function generateArray(n: number): number[] {
    const tempArray: number[] = [];
    while (tempArray.length < n) {
      const randomNumber = Math.floor(Math.random() * n / 2) + 1;
      if (tempArray.filter(x => x === randomNumber).length < 2) {
        tempArray.push(randomNumber);
      }
    }
    return tempArray;
  }
  const handlePress = (index: number) => () => {
    if (tempSelected.length < 2 && !tempSelected.includes(index)) {
      setTempSelected([...tempSelected, index]);
    }
  };
  const handleReset = () => () => {
    setTempSelected([])
    setSelectedArray([])
    setArray(generateArray(elements))
  }
  useEffect(() => {
    if (tempSelected.length === 2) {
      const firstNumber = array[tempSelected[0]];
      const secondNumber = array[tempSelected[1]];
      if (firstNumber === secondNumber) {
        setTimeout(() => {
          setSelectedArray([...selectedArray, ...tempSelected]);
          setTempSelected([]);
        }, 200);
      } else
        setTimeout(() => {
          setTempSelected([]);
        }, 200);

    }
  }, [tempSelected]);
  useEffect(() => {
    if (selectedArray.length === elements) {
      Alert.alert('Win the game', 'Congratulation! You won this game. Press a button to start a new game or go back to the home screen.', [
        {
          text: 'New Game',
          onPress: () => setSelectedArray([]),
        },
        {
          text: 'Go back',
          onPress: () => props.onGameOver(1)
        },
      ]);
    }
  }, [selectedArray]);
  return (
    <StyledComponent
      component={View}
      tw="flex-1 container items-center justify-center">
      <StyledComponent component={Text} tw="text-2xl text-white uppercase text-center mb-2">
        playing game
      </StyledComponent>
      <StyledComponent component={View} tw={`flex flex-row flex-wrap justify-center m-1 ${widthClassCards}`}>
        {array.map((item, index) => (
          <StyledComponent
            key={index}
            component={View}
            tw="w-24 h-24 place-content-center justify-center">
            {selectedArray.includes(index) ? (
              <StyledComponent component={View} tw="flex-1 m-1 bg-[#14362d] rounded-md border-2 justify-center items-center content-center">
                <StyledComponent component={View} tw="w-3/5 h-3/5 rounded border-[7px] border-yellow-700 text-center">
                  <StyledComponent component={Text} tw="text-yellow-700 font-bold text-xl bg-slate-700 text-center flex-1 pt-1">
                    X
                  </StyledComponent>
                </StyledComponent>
              </StyledComponent>
            ) : (
              <StyledComponent component={Ripple} tw="flex-1 m-1 bg-[#49be9f] rounded-md border-2 justify-center" onPress={handlePress(index)}>
                {tempSelected.includes(index) ? (
                  <StyledComponent component={Text} tw="text-white text-center text-5xl mt-1">
                    {item}
                  </StyledComponent>
                ) : (
                  <StyledComponent component={View} tw="w-3/5 h-3/5 mx-auto justify-center rounded border-[5px] border-yellow-400">
                    <StyledComponent component={Text} tw="text-yellow-400 text-center text-4xl">
                      ?
                    </StyledComponent>
                  </StyledComponent>
                )}
              </StyledComponent>
            )}
          </StyledComponent>
        ))}
      </StyledComponent>
      <StyledComponent component={View} tw="flex flex-row justify-center mt-2">
        <StyledComponent component={Ripple} rippleContainerBorderRadius={50} tw="px-3 py-2 m-1 bg-rose-950 rounded-2xl" onPress={handleReset()}>
          <StyledComponent component={Text} tw="text-white text-center text-lg">
            Reset
          </StyledComponent>
        </StyledComponent>
        <StyledComponent component={Ripple} rippleContainerBorderRadius={50} tw="px-3 py-2 m-1 bg-rose-950 rounded-2xl" onPress={() => props.onGameOver()}>
          <StyledComponent component={Text} tw="text-white text-center text-lg">
            Back to home
          </StyledComponent>
        </StyledComponent>
      </StyledComponent>
    </StyledComponent>
  );
}
