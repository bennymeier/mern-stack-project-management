import React, { useState } from "react";
import { Search } from "semantic-ui-react";

export interface ProjectSearchProps {}
const ProjectSearch: React.FC<ProjectSearchProps> = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");

  const handleResultSelect = (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: any
  ) => {
    console.log(data);
    setValue(data.result.title);
  };
  const handleSearchChange = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    data: any
  ) => {
    console.log(data);
    setLoading(true);
    setValue(value);

    if (value.length < 1) {
      setResults([]);
      setLoading(false);
    }
  };

  return (
    <Search
      loading={isLoading}
      onResultSelect={handleResultSelect}
      onSearchChange={handleSearchChange}
      results={results}
      value={value}
    />
  );
};

export default ProjectSearch;
