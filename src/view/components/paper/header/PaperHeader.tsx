import {FC} from 'react'
import MainEditButton from '../../buttons/MainEditButton';
import styles from '../paper.module.scss';
import InfoButton from '../../buttons/InfoButton';
import Checkbox from '../../checkbox/Checkbox';

interface Props{
title?:string;
}

const PaperHeader:FC<Props> = ({title}) => {
  return (
    <div className={styles.headerWrapper}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.buttons}>
          <MainEditButton title="Edit"/> 
          <InfoButton/>
          <Checkbox />
        </div>
      </div>
  )
}

export default PaperHeader