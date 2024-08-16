import { useState } from "react";
import "./App.css";
import SelectDate from "./components/SelectDate";
import SelectOptions from "./components/SelectOptions";

const OPTIONS = [
  {
    id: 1,
    content: "日曜のみ",
  },
  {
    id: 2,
    content: "土日",
  },
  {
    id: 3,
    content: "日曜祝日",
  },
  {
    id: 4,
    content: "土日祝日",
  },
  {
    id: 5,
    content: "祝日のみ",
  },
];

function App() {
  const [countHolyday, setCountHolyday] = useState(0);
  const today = new Date();

  const [startDate, setStartDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
  });

  const [endDate, setEndDate] = useState({
    year: today.getFullYear(),
    month: 12,
    date: 31,
  });

  // 選択されたオプションのIDを取得
  let selectedOption;

  const handleOption = (id) => {
    selectedOption = id;
    console.log(selectedOption);
  };

  const handleCalculate = () => {
    setCountHolyday(0);
    const formatChangeStartDay = new Date(
      `${startDate.year}/${startDate.month}/${startDate.date}`
    );

    const formatChangeEndDay = new Date(
      `${endDate.year}/${endDate.month}/${endDate.date}`
    );

    while (formatChangeStartDay <= formatChangeEndDay) {
      const dayOfWeek = formatChangeStartDay.getDay();
      switch (selectedOption) {
        case 1:
          if (dayOfWeek === 0) {
            setCountHolyday((prev) => prev + 1);
          }
          break;

        case 2:
          if (dayOfWeek === 0 || dayOfWeek === 6) {
            setCountHolyday((prev) => prev + 1);
          }
          break;

        case 3:
          break;

        case 4:
          break;

        case 5:
          break;

        default:
          break;
      }
      formatChangeStartDay.setDate(formatChangeStartDay.getDate() + 1);
    }
  };

  return (
    <>
      <div>
        <span>期間開始日：</span>
        <SelectDate dateData={startDate} setDateData={setStartDate} />
      </div>
      <div>
        <span>期間終了日：</span>
        <SelectDate dateData={endDate} setDateData={setEndDate} />
      </div>
      <SelectOptions options={OPTIONS} handleOption={handleOption} />
      <button onClick={handleCalculate}>計算する</button>
      <p>
        {countHolyday < 0 ? "期間を正しく選んでください" : `${countHolyday}日`}
      </p>
    </>
  );
}

export default App;
