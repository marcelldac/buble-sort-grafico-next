import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

type ArrayState = number[];
type SortHistoryState = number[][];

export default function Home() {
  const [input, setInput] = useState<ArrayState>([]);
  const [sortHistory, setSortHistory] = useState<SortHistoryState>([[]]);
  const [playing, setPlaying] = useState<Boolean>(false);
  const [isHover, setIsHover] = useState<Boolean>(false);
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
    <main className="min-h-screen bg-gray-200 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <span className="text-center mb-4">
          Type an array following the example. Separate with comma. Ex.: 3,2,1
        </span>
        <input
          type="text"
          className="w-full h-12 p-2 rounded-lg mb-4"
          onChange={handleChange}
        />
        <button
          className={`w-full h-16 rounded-lg bg-${isHover ? "gray" : "white"}`}
          onClick={bubbleSort}
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
        >
          Bubble Sort!
        </button>
      </div>
      <div className="mt-8 text-white">
        {input.map((element, key) => (
          <div key={key}>{element}</div>
        ))}
      </div>
    </main>
  );
}
