import { useState } from "react";
import "./App.css";

function App() {
  const [countHolyday, setCountHolyday] = useState(0);
  const today = new Date();

  const [startYear, setStartYear] = useState(today.getFullYear());
  const [startMonth, setStartMonth] = useState(today.getMonth() + 1);
  const [startDate, setStartDate] = useState(today.getDate());

  const [endYear, setEndYear] = useState(today.getFullYear());
  const [endMonth, setEndMonth] = useState(today.getMonth() + 1);
  const [endDate, setEndDate] = useState(today.getDate());

  const handleCalculate = () => {
    const formatChangeStartDay = new Date(
      `${startYear}/${startMonth}/${startDate}`
    );

    const formatChangeEndDay = new Date(`${endYear}/${endMonth}/${endDate}`);

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
        <input
          type="number"
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
        />
        <span>年</span>
        <select
          value={startMonth}
          onChange={(e) => setStartMonth(e.target.value)}
        >
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <span>月</span>
        <select
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        >
          {[...Array(31)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <span>日</span>
      </div>
      <div>
        <span>期間終了日：</span>
        <input
          type="number"
          value={endYear}
          onChange={(e) => setEndYear(e.target.value)}
        />
        <span>年</span>
        <select value={endMonth} onChange={(e) => setEndMonth(e.target.value)}>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <span>月</span>
        <select value={endDate} onChange={(e) => setEndDate(e.target.value)}>
          {[...Array(31)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <span>日</span>
      </div>

      <button onClick={handleCalculate}>計算する</button>
      <p>
        {countHolyday < 0 ? "期間を正しく選んでください" : `${countHolyday}日`}
      </p>
    </>
  );
}

export default App;
