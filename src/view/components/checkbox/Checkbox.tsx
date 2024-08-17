import styles from './checkbox.module.scss';



// waiting with the function to approve on database

const Checkbox = () => {
  return (
    <label className={styles.customCheckboxContainer}>
      <input type="checkbox" className={styles.customCheckboxInput}/>
      <span className={styles.customCheckbox}></span>
    </label>
  )
}

export default Checkbox