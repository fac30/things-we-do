import { RxDocument } from "rxdb";
import { Insight } from "@/app/insights/components/InsightsDisplay";

export default function retrieveDataObject<T>(dataArr: RxDocument<T>[]): T[] {
  return dataArr.map((item) => item._data);
}
