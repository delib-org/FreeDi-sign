import { Segmentation, SegmentationType } from "delib-npm";
import { FC } from "react";

interface Props {
  segmentation: Segmentation;
}



const InputFields: FC<Props> = ({ segmentation }) => {


    const fieldMandatoryName = segmentation.fieldMandatoryName? segmentation.fieldMandatoryName : segmentation.title;
  const label = `${segmentation.title}${segmentation.isRequired === true ? " *" : ""}`


  if (segmentation.type === SegmentationType.array) {
    return (
      <div className="input-element">
        <label>{label}</label>
        <select defaultValue="" name={fieldMandatoryName}>
          <option value="" defaultChecked disabled>
            בחר/י
          </option>
          {segmentation.array?.map((option: string, i:number) => (
            <option key={`option-${i}`} value={option}>{option}</option>
          ))}
        </select>
      </div>
    );
  }
  console.log(segmentation.filedType)
  return (
    <div className="input-element">
      <label>{label}</label>
      <input
        type={segmentation.filedType}
        name={fieldMandatoryName}
        placeholder={segmentation.title}
        autoFocus={segmentation.order === 0}
        required={segmentation.isRequired}
      />
    </div>
  );
};

export default InputFields;
