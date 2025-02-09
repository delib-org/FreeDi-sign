import { FC } from 'react';
import styles from './Modal.module.scss';

//icons
import CloseIcon from '../../../assets/icons/close.svg?react';

interface Props {
  children?: React.ReactNode
  scale?: number;
  background?: string;
  show: boolean
  setShow?: (show: boolean) => void
}

const Modal: FC<Props> = ({ children, scale = 1, background, show, setShow }) => {



  const modalId = `modal-${Math.random()}`

  //@ts-ignore
  function handleClose(e) {
   
    if (e.key === 'Escape' && setShow) {
     
      setShow(false);
      return;
    }
    if (e) {
      e.stopPropagation();
      if (e.target === e.currentTarget && setShow) {
        setShow(false);
      }
    } 
  }

  if (!show) return null;



  return (
    <div
      className={styles.modal}
      style={{ background: background }}
      onClick={handleClose}
      onKeyDown={(e) => { if (e.key === 'Escape') handleClose(e); }}
      role="button"
      tabIndex={0}
      id={modalId}
    >
      <div className={styles.box} style={{ transform: `scale(${scale})` }}>
        {setShow && (<button className={styles.close} onClick={handleClose} >
          <CloseIcon className='closeIcon' onClick={handleClose} />
        </button>)}
        {children}
      </div>
    </div>
  )
}

export default Modal