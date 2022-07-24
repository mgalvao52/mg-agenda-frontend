import { ListaItens } from "../../types/PropsTypes"
import Item from "../Item/Item"
import styles from './ListItem.module.css'

export default function ListItem(itens:ListaItens){
    return(
        <div className={styles.container}>
            {
                itens.lista.map((item,index)=>{
                return <Item descricao={item.descricao} list={item.list} key={index}/>
            })}
        </div>
    )
}