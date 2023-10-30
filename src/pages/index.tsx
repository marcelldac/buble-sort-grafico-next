import { useEffect, useRef, useState } from "react";
import { Flex, Button, Input, Box, Space } from "@mantine/core";

type ArrayState = number[];
type SortHistoryState = number[][];

export default function Home() {
  const [input, setInput] = useState<ArrayState>([]);
  const [sortHistory, setSortHistory] = useState<SortHistoryState>([[]]);
  const [playing, setPlaying] = useState<Boolean>(false);
  const [looping, setLooping] = useState<number>(0);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);

  const size: number = input.length;

  useEffect(() => {
    setInput(sortHistory[looping]);
  }, [looping, sortHistory]);

  useEffect(() => {
    if (looping < sortHistory.length - 1 && playing) {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
      timeOutRef.current = setTimeout(() => {
        setLooping(looping + 1);
      }, 500);
    } else {
      setPlaying(false);
    }
  }, [looping, playing, sortHistory.length]);

  const play = () => {
    setPlaying(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let value = e.target.value;
    setInput(value.split(",").map((i) => Number(i)));
  };

  const bubbleSort = (): void => {
    let historyArray: number[][] = [[...input]];
    for (let i = 0; i < size - 1; i++) {
      for (let j = 0; j < size - i - 1; j++) {
        if (input[j] > input[j + 1]) {
          let swap = input[j];
          input[j] = input[j + 1];
          input[j + 1] = swap;
          historyArray.push([...input]);
        }
      }
      setSortHistory(historyArray);
      play();
    }
  };

  return (
    <Flex direction="column" justify="center" align="center" h="100vh">
      <Box>
        <Input.Wrapper label="Type an array following the example. Separate with comma.">
          <Input type="text" onChange={handleChange} placeholder="Ex.: 3,2,1" />
        </Input.Wrapper>
        <Space h="md" />
        <Button fullWidth onClick={bubbleSort}>
          Bubble Sort!
        </Button>
      </Box>
      <Flex direction="row">
        {input.map((element, key) => (
          <>
            <Box key={key} size="xl" component="h3">
              {element}
            </Box>
            <Space w="md" />
          </>
        ))}
      </Flex>
    </Flex>
  );
}
