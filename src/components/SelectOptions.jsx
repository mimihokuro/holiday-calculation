const SelectOptions = ({ options, handleOption }) => {
  const handleChangeFrag = (id) => {
    handleOption(id);
  };

  return (
    <div>
      {options.map((option) => {
        return (
          <label key={option.id}>
            <input
              type="radio"
              name="holydayOptions"
              onClick={() => handleChangeFrag(option.id)}
            />
            {option.content}
          </label>
        );
      })}
    </div>
  );
};

export default SelectOptions;
