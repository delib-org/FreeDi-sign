import MainButton from "../buttons/MainButton";
import StrongMainButton from "../buttons/StrongMainButton";
import Checkbox from "../checkbox/Checkbox";
import Comment from "../icons/Comment";
import EditText from "../icons/EditTextIcon";
import Info from "../icons/InfoIcon";
import Trash from "../icons/TrashIcon";

import styles from "./policyContainer.module.scss";

interface Props {}

function PolicyContainer({}: Props) {
  return (
    <div className={styles.policyWrapper}>
      <div className={styles.policyWrapper__mainContentWrapper}>
        <h1 className={styles.policyWrapper__mainContentWrapper__title}>
          Validation of Software and Spreadsheets
        </h1>
        <div
          className={
            styles.policyWrapper__mainContentWrapper__policyHeaderWrapper
          }
        >
          <h2
            className={
              styles.policyWrapper__mainContentWrapper__policyHeaderWrapper__title
            }
          >
            Policy content
          </h2>
          <div
            className={
              styles.policyWrapper__mainContentWrapper__policyHeaderWrapper__buttonWrapper
            }
          >
            <Info />
            <Checkbox />
          </div>
        </div>
        <div
          className={
            styles.policyWrapper__mainContentWrapper__policyMainContainer
          }
        >
          <div
            className={
              styles.policyWrapper__mainContentWrapper__policyMainContainer__titleWrapper
            }
          >
            <h3
              className={
                styles.policyWrapper__mainContentWrapper__policyMainContainer__titleWrapper__title
              }
            >
              Validation Policy
            </h3>
            <div
              className={
                styles.policyWrapper__mainContentWrapper__policyMainContainer__titleWrapper__buttonWrapper
              }
            >
              <Comment />
              <EditText />
              <Trash />
            </div>
          </div>
          <p
            className={
              styles.policyWrapper__mainContentWrapper__policyMainContainer__description
            }
          >
            Lorem ipsum dolor sit amet consectetur. Volutpat varius eget nunc
            sodales fames et cursus libero. Proin vehicula accumsan et sem
            pellentesque. Dictumst lorem fermentum viverra mi leo augue
            tristique risus mauris. Gravida pretium lobortis fames ut est.
            Tempus a feugiat tincidunt non malesuada molestie quam. Viverra
            lorem tempus quam faucibus lacinia. Senectus id curabitur blandit
            consectetur integer. Amet nulla scelerisque morbi porta. Leo enim id
            luctus ultrices. Elementum fermentum pulvinar massa risus. Cursus
            quisque porttitor at nibh purus volutpat.
          </p>
          {/* <PolicyComment/> */}
          {/* <PolicyCommentVotes/> */}
        </div>
      </div>
      <div className={styles.policyWrapper__policyFooter}>
        <div
          className={
            styles.policyWrapper__policyFooter__signatureWrapper
          }
        >
          <p
            className={
              styles.policyWrapper__policyFooter__signatureWrapper__text
            }
          >
            Agree to all
          </p>
          <Checkbox />
        </div>
        <div className={styles.policyWrapper__policyFooter__buttonWrapper}>
          <StrongMainButton padding="8px 52px" backgroundColor="var(--inactive-btn)" color="var(--icon-blue)" value="Decline" width="9.47rem" height="2.41rem" fontSize="1.05rem"/>
          <MainButton padding="8px 52px" backgroundColor="var(--active-btn)" color="#fff" value="Accept" height="2.41rem" fontSize="1.05rem"/>
        </div>
      </div>
    </div>
  );
}

export default PolicyContainer;
