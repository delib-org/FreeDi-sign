import styles from './checkbox.module.scss';

type Props = {}

const Checkbox = (props: Props) => {
  return (
    <label className={styles.customCheckboxContainer}>
      <input type="checkbox" className={styles.customCheckboxInput}/>
      <span className={styles.customCheckbox}></span>
    </label>
  )
}

export default Checkbox