import { FormEvent } from 'react';
import Button from "../buttons/button/Button";
import { ButtonType } from "../../../model/enumsModel";
import styles from './SignupForm.module.scss';
import { useDispatch } from "react-redux";
import { setUserDataToDB } from "../../../controllers/db/user/setUserData";
import { setUserData } from "../../../controllers/slices/userSlice";
import { UserData } from 'delib-npm';

const SigninForm = () => {
    const dispatch = useDispatch(); 


    async function handleSetUserData(ev: FormEvent<HTMLFormElement>): Promise<void> {
        try {
            ev.preventDefault();
            const formData = new FormData(ev.target as HTMLFormElement);
            const displayName = String(formData.get("displayName"));
            if (!displayName) throw new Error("Full name is required");
            const city = String(formData.get("city"));
            if (!city) throw new Error("City is required");

            const _userData: UserData|undefined = await setUserDataToDB({ displayName, city, userId: "" });
            dispatch(setUserData(_userData));
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <div className={styles.sign}>
        <h1>טופס הרשמה</h1>
      <form onSubmit={handleSetUserData}>
        <div className="input-element">
          <label>שם מלא</label>
          <input type="text" name="displayName" placeholder="Full name" autoFocus={true} required={true}/>
        </div>
        <div className="input-element">
          <label>ישוב</label>
          <input type="text" name="city" placeholder="ישוב" required={true} />
        </div>
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
