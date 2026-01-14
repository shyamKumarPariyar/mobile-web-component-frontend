const SearchBox = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    className="form-control mb-3 w-auto"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export default SearchBox;
