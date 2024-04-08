import React, { useState } from "react";
import { Box, Button, Grid, Heading, Text } from "@chakra-ui/react";
import { FaCircle, FaTimes } from "react-icons/fa";

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [isAIPlaying, setIsAIPlaying] = useState(false);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setPlayer(player === "X" ? "O" : "X");
      if (isAIPlaying && player === "O") {
        setTimeout(makeAIMove, 500);
      }
    }
  };

  const makeAIMove = () => {
    const availableMoves = board.reduce((moves, cell, index) => (cell === null ? [...moves, index] : moves), []);
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    handleClick(randomMove);
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
    setWinner(null);
  };

  return (
    <Box maxWidth="400px" mx="auto" mt={8}>
      <Heading as="h1" size="xl" textAlign="center" mb={4}>
        Tic Tac Toe
      </Heading>
      <Button colorScheme={isAIPlaying ? "red" : "green"} mb={4} onClick={() => setIsAIPlaying(!isAIPlaying)}>
        {isAIPlaying ? "Play with a Friend" : "Play with AI"}
      </Button>
      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
        {board.map((cell, index) => (
          <Button key={index} onClick={() => handleClick(index)} variant="outline" height="100px" fontSize="4xl">
            {cell === "X" ? <FaTimes /> : cell === "O" ? <FaCircle /> : null}
          </Button>
        ))}
      </Grid>
      {winner && (
        <Text textAlign="center" mt={4} fontSize="2xl">
          {winner === "X" ? "You won!" : "AI won!"}
        </Text>
      )}
      {!winner && board.every((cell) => cell !== null) && (
        <Text textAlign="center" mt={4} fontSize="2xl">
          It's a draw!
        </Text>
      )}
      <Button colorScheme="blue" mt={4} onClick={resetGame}>
        Reset Game
      </Button>
    </Box>
  );
};

export default Index;
