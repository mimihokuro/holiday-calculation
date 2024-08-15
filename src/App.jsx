import { useState } from "react";
import "./App.css";
import SelectDate from "./components/SelectDate";

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

  const handleCalculate = () => {
    const formatChangeStartDay = new Date(
      `${startDate.year}/${startDate.month}/${startDate.date}`
    );

    const formatChangeEndDay = new Date(
      `${endDate.year}/${endDate.month}/${endDate.date}`
    );

    setCountHolyday(
      Math.floor(
        (formatChangeEndDay - formatChangeStartDay) / (1000 * 60 * 60 * 24)
      )
    );
  };

  return (
    <>
      <div>
        <span>期間開始日：</span>
        <SelectDate dateData={startDate} setDateDate={setStartDate} />
      </div>
      <div>
        <span>期間終了日：</span>
        <SelectDate dateData={endDate} setDateDate={setEndDate} />
      </div>
      <button onClick={handleCalculate}>計算する</button>
      <p>
        {countHolyday < 0 ? "期間を正しく選んでください" : `${countHolyday}日`}
      </p>
    </>
  );
}

export default App;
