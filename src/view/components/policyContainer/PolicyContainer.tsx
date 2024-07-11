import Checkbox from '../checkbox/Checkbox';
import Comment from '../icons/Comment';
import EditText from '../icons/EditText';
import Info from '../icons/Info';
import Trash from '../icons/Trash';
import PolicyComment from '../policyComment/PolicyComment';
import PolicyCommentVotes from '../policyCommentVotes/PolicyCommentVotes';
import styles from './policyContainer.module.scss'

interface Props {}

function PolicyContainer({}: Props) {
  return (
    <div className={styles.policyWrapper}>
      <h1 className={styles.policyWrapper__title}>Validation of Software and Spreadsheets</h1>
      <div className={styles.policyWrapper__policyHeaderWrapper}>
        <h2 className={styles.policyWrapper__policyHeaderWrapper__title}>Policy content</h2>
        <div className={styles.policyWrapper__policyHeaderWrapper__buttonWrapper}>
        <Info />
        <Checkbox/>
        </div>
      </div>
      <div className={styles.policyWrapper__policyMainContainer}>
        <div className={styles.policyWrapper__policyMainContainer__titleWrapper}>
          <h3 className={styles.policyWrapper__policyMainContainer__titleWrapper__title}>Validation Policy</h3>
          <div className={styles.policyWrapper__policyMainContainer__titleWrapper__buttonWrapper}>
          <Comment/>
          <EditText/>
          <Trash/>
          <Checkbox/>
          </div>
        </div>
        <p className={styles.policyWrapper__policyMainContainer__description}>Lorem ipsum dolor sit amet consectetur. Volutpat varius eget nunc sodales fames et cursus libero. Proin vehicula accumsan et sem pellentesque. Dictumst lorem fermentum viverra mi leo augue tristique risus mauris. Gravida pretium lobortis fames ut est. Tempus a feugiat tincidunt non malesuada molestie quam. Viverra lorem tempus quam faucibus lacinia. Senectus id curabitur blandit consectetur integer. Amet nulla scelerisque morbi porta. Leo enim id luctus ultrices. Elementum fermentum pulvinar massa risus. Cursus quisque porttitor at nibh purus volutpat.</p>
        {/* <PolicyComment/> */}
        {/* <PolicyCommentVotes/> */}
      </div>
      <div className={styles.policyWrapper__policyFooter}>
        <div className={styles.policyWrapper__policyFooter__signatureWrapper}>
          <p className={styles.policyWrapper__policyFooter__signatureWrapper__text}>Agree to all</p>
          <Checkbox/>
        </div>
        <div className={styles.policyWrapper__policyFooter__buttonWrapper}>
          <button className={styles.buttonDecline}>Decline</button>
          <button className={styles.buttonAccept}>Accept</button>
        </div>
      </div>
    </div>
  );
}

export default PolicyContainer;
