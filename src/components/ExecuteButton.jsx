const ExecuteButton = ({ buttonFunc }) => {
  const { calculateDays, resetCalculateDays } = buttonFunc;
  return (
    <div className="flex gap-4 justify-center mt-4">
      <button
        className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-gray-200 bg-green-600 shadow-sm hover:bg-green-500 active:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        onClick={calculateDays}
      >
        計算する
      </button>
      <button
        className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-gray-900 bg-gray-200 shadow-sm hover:bg-gray-100 active:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        onClick={resetCalculateDays}
      >
        リセット
      </button>
    </div>
  );
};

export default ExecuteButton;
