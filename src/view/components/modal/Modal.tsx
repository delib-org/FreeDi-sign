import { FC } from 'react';
import styles from './Modal.module.scss';

//icons
import CloseIcon from '../../../assets/icons/close.svg?react';

interface Props {
  children?: React.ReactNode
  onClick?: (event: any) => void
  close?: () => void
  scale?: number;
  background?: string;
}

const Modal: FC<Props> = ({ children, onClick, close, scale=1, background}) => {

  const modalId = `modal-${Math.random()}`
  function handleOnClick(event: any) {
    if(close) close();

    event.stopPropagation()
    if (event.target.id === modalId)
      onClick && onClick(event)
  }



  return (
    <div className={styles.modal} onClick={handleOnClick} id={modalId} style={{background: background}}>
      <div className={styles.box} style={{transform: `scale(${scale})`}}>
        <button className={styles.close}>
          <CloseIcon onClick={handleOnClick} className='closeIcon' />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal