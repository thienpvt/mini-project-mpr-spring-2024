import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { StyledComponent } from "nativewind";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";

export default function App() {
  const [gameOver, setGameOver] = useState(false);
  const [rowNumber, setRowNumber] = useState<number>();
  const [columnNumber, setColumnNumber] = useState<number>();
  const pickedNumberHandler = (chosenRow: any, chosenColumn: any) => {
    setRowNumber(chosenRow);
    setColumnNumber(chosenColumn);
  };

  const gameOverHandler = (numOfRounds: number) => {
    setColumnNumber(undefined);
    setRowNumber(undefined);
  };

  let screen = <StartGameScreen onStartGame={pickedNumberHandler} />;

  if (rowNumber && columnNumber) {
    screen = (
      <GameScreen
        rowNumber={rowNumber}
        columnNumber={columnNumber}
        onGameOver={gameOverHandler}
      />
    );
  }

  return (
    <StyledComponent className="flex-1 container bg-[#395164]" component={SafeAreaView}>
      {screen}
    </StyledComponent>
  );
}
