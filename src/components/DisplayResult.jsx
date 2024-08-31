const DisplayResult = ({ result }) => {
  const { between, days, startDate, endDate } = result;
  return (
    <div className="font-bold mt-8 text-center">
      {startDate <= endDate ? (
        <table className="mx-auto">
          <thead>
            <tr>
              <th className="px-2 border-black border">期間日数</th>
              <th className="px-2 border-black border">休日数</th>
              <th className="px-2 border-black border">期間日数 - 休日数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border-black border">{between}日</td>
              <td className="p-2 border-black border">{days} 日</td>
              <td className="p-2 border-black border">{between - days} 日</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="text-red-600 text-lg">正しい期間を選択してください</p>
      )}
    </div>
  );
};

export default DisplayResult;
