import { Segmentation, SegmentationType } from "delib-npm";
import { FC } from "react";

interface Props {
  segmentation: Segmentation;
}



const InputFields: FC<Props> = ({ segmentation }) => {


    const fieldMandatoryName = segmentation.fieldMandatoryName? segmentation.fieldMandatoryName : segmentation.title;

  if (segmentation.type === SegmentationType.array) {
    return (
      <div className="input-element">
        <label>{segmentation.title}</label>
        <select defaultValue="opening" name={fieldMandatoryName}>
          <option value="opening" defaultChecked disabled>
            בחר/י
          </option>
          {segmentation.array?.map((option: string, i:number) => (
            <option key={`option-${i}`} value={option}>{option}</option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="input-element">
      <label>{segmentation.title}</label>
      <input
        type="text"
        name={fieldMandatoryName}
        placeholder="Full name"
        autoFocus={segmentation.order === 0}
        required={true}
      />
    </div>
  );
};

export default InputFields;
