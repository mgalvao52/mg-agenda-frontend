import { Itens } from "../../types/PropsTypes"
import { StatusItem } from "../StatusItem/StatusItem"
import styles from './Item.module.css'

export default function Item(itens:Itens){
  return(
        <div className={styles.container}>
            <label className={styles.descricao}>{itens.descricao}</label>
            <div className={styles.itens}>
                {itens.list.map((item,index)=>{
                    return(
                        <StatusItem key={index} status={item.status} total={item.total}/>
                    )
                })}
            </div>
        </div>
  )  
}