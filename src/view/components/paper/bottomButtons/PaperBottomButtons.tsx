import MainButton from '../../buttons/MainButton'
import StrongMainButton from '../../buttons/StrongMainButton'
import styles from '../paper.module.scss'

const PaperBottomButtons = () => {
  return (
    <div className={styles.buttonWrapper}>
          <MainButton
            width="6.11rem"
            height="2.41rem"
            value="Cancel"
            backgroundcolor="var(--inactive-btn)"
            padding="8px 24px 8px 24px"
            fontSize="1rem"
            color="var(--icon-blue)"
          />
          <StrongMainButton
            width="9.47rem"
            height="2.41rem"
            value="Save Changes"
            backgroundcolor="var(--active-btn)"
            padding="8px 24px 8px 24px"
            fontSize="1rem"
            color="#fff"
          />
        </div>
  )
}

export default PaperBottomButtons