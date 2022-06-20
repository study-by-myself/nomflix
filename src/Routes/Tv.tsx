import { useQuery } from "react-query";
import { getTvs, IGetTVResult } from "../api";

function Tv() {
  const { data: TvData } = useQuery<IGetTVResult>(["Tvs", "onAir"], getTvs);
  console.log(TvData);
  return (
    <ul>
      {TvData?.results.map((data) => (
        <li key={data.id}>{data.name}</li>
      ))}
    </ul>
  );
}
export default Tv;
