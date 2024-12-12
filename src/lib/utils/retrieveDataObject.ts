import { RxDocument } from "rxdb";

export default function retrieveDataObject<T>(dataArr: RxDocument<T>[]): T[] {
  return dataArr.map((item) => item._data);
}
