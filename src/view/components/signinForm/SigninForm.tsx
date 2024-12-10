import { FormEvent, useEffect, useState } from "react";
import Button from "../buttons/button/Button";
import { ButtonType } from "../../../model/enumsModel";
import styles from "./SignupForm.module.scss";
import { useDispatch } from "react-redux";
import { setUserDataToDB } from "../../../controllers/db/user/setUserData";
import { setUserData } from "../../../controllers/slices/userSlice";
import { Segmentation, UserData } from "delib-npm";
import { useParams } from "react-router-dom";
import { getSegments } from "../../../controllers/db/segmentation/getSegmentation";
import InputFields from "./inputFields/InputFields";

const SigninForm = () => {
  const { statementId } = useParams<{ statementId: string }>();
  const dispatch = useDispatch();

  const [segments, setSegments] = useState<Segmentation[]>([]);

  useEffect(() => {
    if (statementId) {
      getSegments(statementId)
        .then((segments) => setSegments(segments))
        .catch((e) => console.error(e));
    }
  }, [statementId]);

  async function handleSetUserData(
    ev: FormEvent<HTMLFormElement>
  ): Promise<void> {
    try {
      ev.preventDefault();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const values:any = {};
    
      for (const segment of segments) {
        const fieldMandatoryName = segment.fieldMandatoryName? segment.fieldMandatoryName : segment.title;
     
        const form = ev.target as HTMLFormElement;
        const value = form[fieldMandatoryName].value;
        if (!value) {
          throw new Error("אנא מלא/י את כל השדות");
        }
        values[fieldMandatoryName] = value;
      }

      const _userData: UserData | undefined = await setUserDataToDB(values, statementId);
      dispatch(setUserData(_userData));
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className={styles.sign}>
      <h1 className={styles.h1}>טופס הרשמה</h1>
      <form onSubmit={handleSetUserData}>
        {segments.map((segmentation, i:number) => (
          <InputFields segmentation={segmentation} key={`field-${i}`}/>
        ))}
        <div className="btns">
          <Button
            text="הרשמה"
            type="submit"
            buttonType={ButtonType.primary}
            isSelected={true}
          />
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
