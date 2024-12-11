import { Header } from "@/ui/shared/Header";
import Display, { Base } from "../components/Display";
import { RxDocumentData } from "rxdb";

export default function NextActionsPage() {
  return (
    <>
      <Header title="Next Actions" isInfoPage={true} />
      <p className="w-11/12 m-auto mb-5">
        Add your own next actions to meet the needs that you selected:
      </p>
      <Display
        mainKey="id"
        relatedKey={"need" as keyof RxDocumentData<Base>}
        mainTable="needs"
        relatedTable="next_actions"
      />
    </>
  );
}
