import { useState } from "react";
import { IResults } from "../api";
import ResultBox from "./ResultBox";

interface ISearchResultsProps {
  searchData: IResults;
  setIsOpen: (isOpen: boolean) => void;
}

const SearchResults = ({ searchData, setIsOpen }: ISearchResultsProps) => {
  const [id, setId] = useState<number | null>(null);

  const onClick = (id: number) => {
    setId(id);
    setIsOpen(true);
  };
  return (
    <>
      {searchData &&
        searchData.results.map((d) => (
          <ResultBox key={d.id} data={d} onBoxClicked={() => onClick(d.id)} />
        ))}
    </>
  );
};
export default SearchResults;
