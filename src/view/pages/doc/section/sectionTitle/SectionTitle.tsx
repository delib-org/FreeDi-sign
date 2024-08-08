import { FC, useState } from "react";
import { isEditSelector } from "../../../../../controllers/slices/editSlice";
import { useSelector } from "react-redux";
import { adjustTextAreaHeight } from "../../../../../controllers/general.ts/general";
import { updateSectionTextToDB } from "../../../../../controllers/db/sections/setSections";
import { DocumentObject } from "../../../../../controllers/general.ts/statement_helpers";
import EditInput from "../../../../components/editInput/EditInput";
import { sectionHeader } from "../Section";
interface Props {
  order: number | string;
  document: DocumentObject;
}

const SectionTitle:FC<Props> = ({order,document}) => {
    const isEdit = useSelector(isEditSelector);
    const [_isEdit, _setIsEdit] = useState(false);
  return (
    <>
      {isEdit && _isEdit ? (
        <EditInput
          placeHolder={document.title ? document.title : "add title"}
          onChange={handleChange}
          onBlur={handleUpdate}
          onKeyUp={handleUpdate}
        />
      ) : (
        <div
          onClick={() => {
            if (isEdit) _setIsEdit(true);
          }}
        >
          {sectionHeader(`${order}) ${document.title}`, document.level)}
        </div>
      )}
    </>
  );

  function handleChange(e: any) {
    const textarea = e.target as HTMLTextAreaElement;
    adjustTextAreaHeight(textarea);
    updateSectionTextToDB({ document, newText: textarea.value });
  }

  function handleUpdate(e: any) {
    if (e.key === "Enter" || e.type === "blur") {
      const textarea = e.target as HTMLTextAreaElement;
      const value = textarea.value;
      if (value === "") return;

      updateSectionTextToDB({ document, newText: value });

      _setIsEdit(false);
    }
  }
};

export default SectionTitle;
