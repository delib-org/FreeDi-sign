import { FC } from 'react';
import styles from './Modal.module.scss';

//icons
import CloseIcon from '../../../assets/icons/close.svg?react';

interface Props {
  children?: React.ReactNode
  onClick?: (event: any) => void
}

const Modal: FC<Props> = ({ children, onClick }) => {

  const modalId = `modal-${Math.random()}`
  function handleOnClick(event: any) {
    event.stopPropagation()
    if (event.target.id === modalId)
      onClick && onClick(event)
  }


  return (
    <div className={styles.modal} onClick={handleOnClick} id={modalId}>
      <div className={styles.box}>
        <button className={styles.close}>
          <CloseIcon onClick={onClick} className='closeIcon' />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal