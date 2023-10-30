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
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="flex justify-center flex-col items-center mt-250">
        <span className="flex justify-center bg-slate-50 font-mono text-center mb-10 p-25 w-250 h-100 rounded-3xl text-sm">
          Type an array following the example. Separate with comma. Ex.: 3,2,1
        </span>
        <input
          type="text"
          className="text-center border-none w-250 h-60 rounded-3xl mb-10"
          onChange={handleChange}
        />
        <button
          className="text-center border-none cursor-pointer w-250 h-70 rounded-3xl mb-10 @if($isHover) bg-gray @endif"
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
      <div className="flex text-center mt-100">
        {input.map((element, key) => (
          <div key={key} className="text-slate-50 mx-5">
            {element}
          </div>
        ))}
      </div>
    </main>
  );
}
