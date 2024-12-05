import { RxDocument } from "rxdb";
import { Insight } from "@/app/insights/components/InsightsDisplay";

export default function retrieveDataObject(dataArr: RxDocument<Insight>[]) {
  return dataArr.map((item) => item._data);
}
