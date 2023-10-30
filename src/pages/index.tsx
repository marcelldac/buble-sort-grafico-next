import { useEffect, useRef, useState } from "react";
import { Flex, Button, Input, Box, Space, ActionIcon } from "@mantine/core";
import { AiFillGithub } from "react-icons/ai";
import Link from "next/link";

type ArrayState = number[];
type SortHistoryState = number[][];

export default function Home() {
  const [input, setInput] = useState<ArrayState>([]);
  const [sortHistory, setSortHistory] = useState<SortHistoryState>([[]]);
  const [playing, setPlaying] = useState<Boolean>(false);
  const [isNumber, setIsNumber] = useState<Boolean>(true);
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
    setInput(
      value.split(",").map((i) => {
        const number = Number(i);
        setIsNumber(!isNaN(number));
        return number;
      })
    );
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

  const InputMap = () => {
    return (
      <>
        {input.map((element, key) => (
          <>
            <Box key={key} size="xl" component="h3">
              {element}
            </Box>
            <Space w="md" />
          </>
        ))}
      </>
    );
  };

  return (
    <Flex direction="column" justify="center" align="center" h="100vh">
      <Box>
        <Input.Wrapper label="Type an array following the example. Separate with comma.">
          <Input
            required
            type="text"
            onChange={handleChange}
            placeholder="Ex.: 3,2,1"
          />
        </Input.Wrapper>
        <Space h="md" />
        <Button fullWidth onClick={bubbleSort}>
          Bubble Sort!
        </Button>
      </Box>
      <Flex direction="row">
        {isNumber && <InputMap />}
        <Space h="md" />
      </Flex>
      <ActionIcon
        variant="filled"
        aria-label="Github"
        bg="black"
        component={Link}
        href="https://github.com/marcelldac?tab=repositories"
        target="_blank"
      >
        <AiFillGithub />
      </ActionIcon>
    </Flex>
  );
}
