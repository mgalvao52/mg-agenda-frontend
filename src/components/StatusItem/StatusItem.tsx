import styles from './StatusItem.module.css';
import { PropsStatus } from '../../types/PropsTypes';
export const StatusItem =(status:PropsStatus)=>{
    return(
        <div className={styles.container}>
            <label className={styles.title}>{status.status}</label>
            <label className={`${styles.value} ${styles[status.status]}`}>{`${status.total}`}</label>
        </div>
    )
}