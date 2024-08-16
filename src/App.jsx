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
  const [holidays, setHolidays] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
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

  const handleCalculate = () => {
    setHolidays(0);
    const formatChangeStartDay = new Date(
      `${startDate.year}/${startDate.month}/${startDate.date}`
    );

    const formatChangeEndDay = new Date(
      `${endDate.year}/${endDate.month}/${endDate.date}`
    );

    let countHoliday = 0;

    while (formatChangeStartDay <= formatChangeEndDay) {
      const dayOfWeek = formatChangeStartDay.getDay();
      if (
        (selectedOption === 1 && dayOfWeek === 0) ||
        (selectedOption === 2 && (dayOfWeek === 0 || dayOfWeek === 6))
      ) {
        countHoliday++;
      }
      formatChangeStartDay.setDate(formatChangeStartDay.getDate() + 1);
    }
    setHolidays(countHoliday);
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
      <SelectOptions options={OPTIONS} handleOption={setSelectedOption} />
      <button onClick={handleCalculate}>計算する</button>
      <p>{holidays < 0 ? "期間を正しく選んでください" : `${holidays}日`}</p>
    </>
  );
}

export default App;
