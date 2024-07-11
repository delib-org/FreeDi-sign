import VIcon from "../icons/VIcon";
import XIcon from "../icons/XIcon";
import styles from "./policyCommentVotes.module.scss";

type Props = {};

const PolicyCommentVotes = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__headerWrapper}>
        <div className={styles.wrapper__headerWrapper__profileWrapper}>
          <img
            alt="img"
            className={styles.wrapper__headerWrapper__profileWrapper__profileImage}
          />
          <img
            alt="lock"
            className={styles.wrapper__headerWrapper__profileWrapper__lockImage}
          />
          <h4 className={styles.wrapper__headerWrapper__profileWrapper__name}>name</h4>
        </div>
        <div className={styles.wrapper__headerWrapper__votesWrapper}>
            <div className={styles.wrapper__headerWrapper__votesWrapper__vote}>
                <XIcon/>
                <p>149</p>
            </div>
            <div className={styles.wrapper__headerWrapper__votesWrapper__vote}>
            <VIcon/>
            <p>389</p>
            </div>
        </div>
      </div>
      <p className={styles.wrapper__description}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo
        quisquam debitis nesciunt perferendis suscipit optio culpa eum, qui
        voluptatum unde? Nemo nulla recusandae nam provident id aliquid sit ea
        doloribus!
      </p>
    </div>
  );
};

export default PolicyCommentVotes;
