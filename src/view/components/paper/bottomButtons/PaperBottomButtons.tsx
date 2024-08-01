import MainButton from '../../buttons/MainButton'
import StrongMainButton from '../../buttons/StrongMainButton'
import styles from '../paper.module.scss'

const PaperBottomButtons = () => {
  return (
    <div className={styles.buttonWrapper}>
          <MainButton      
            value="Cancel"
            backgroundColor="var(--inactive-btn)"
            color="var(--icon-blue)"
          />
          <StrongMainButton
            value="Save Changes"
          />
        </div>
  )
}

export default PaperBottomButtons