import {FC} from 'react'
import styles from './UserDetails.module.scss'
import { UserData } from 'delib-npm'
import { useLanguage } from '../../../../../../controllers/hooks/useLanguage'

interface Props {
    creatorData: UserData|undefined
}

const UserDetails:FC<Props> = ({creatorData}) => {
    const {t} = useLanguage();

    console.log(creatorData)

    if(!creatorData) return null
    const {displayName} = creatorData
  return (
      <div className={styles.modal}>
          <div className={styles.modal__title}>{t("User Details")}</div>
          <div className={styles.modal__content}>
              <div className={styles.modal__content__item}>
                  <div className={styles.modal__content__item__title}>
                      {t("Name")}
                  </div>
                  <div className={styles.modal__content__item__value}>
                      {displayName}
                  </div>
              </div>
              <div className={styles.modal__content__item}>
                  <div className={styles.modal__content__item__title}>
                      {t("Phone Number")}
                  </div>
                  <div className={styles.modal__content__item__value}>
                        {(creatorData as any)['phoneNumber']}
                  </div>
              </div>
              <div className={styles.modal__content__item}>
                  <div className={styles.modal__content__item__title}>
                      {t("City")}
                  </div>
                  <div className={styles.modal__content__item__value}>
                      {(creatorData as any)['ישוב']}
                  </div>
              </div>
          </div>
      </div>
  )
}

export default UserDetails