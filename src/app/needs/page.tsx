import { Header } from "@/ui/shared/Header";
import Display, { Base } from "./components/Display";
import { RxDocumentData } from "rxdb";

export default function NeedsPage() {
  return (
    <>
      <Header
        title="Needs"
        description="address unmet needs and assess next actions."
        hasInfoButton={true}
      />
      <h2 className="text-2xl w-11/12 mb-6 mt-4 m-auto">
        What do you need right now?
      </h2>
      <p className="w-11/12 m-auto mb-5">
        Select what you need from the list below
      </p>
      <Display
        mainKey="id"
        relatedKey={"category" as keyof RxDocumentData<Base>}
        mainTable="needs_categories"
        relatedTable="needs"
        filterKey={"selectedExpiry" as keyof RxDocumentData<Base>}
        highlight={true}
      />
    </>
  );
}
