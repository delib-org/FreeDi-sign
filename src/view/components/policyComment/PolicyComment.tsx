import styles from "./policyComment.module.scss";

interface Props {}

const PolicyComment = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__profileWrapper}>
        <img
          alt="img"
          className={styles.wrapper__profileWrapper__profileImage}
        />
        <img
          alt="lock"
          className={styles.wrapper__profileWrapper__lockImage}
        />
        <h4 className={styles.wrapper__profileWrapper__name}>
          name
        </h4>
      </div>
      <p className={styles.wrapper__description}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo
        quisquam debitis nesciunt perferendis suscipit optio culpa eum, qui
        voluptatum unde? Nemo nulla recusandae nam provident id aliquid sit ea
        doloribus!
      </p>
      <button className={styles.wrapper__button}>
        Save comment
      </button>
    </div>
  );
};

export default PolicyComment;
