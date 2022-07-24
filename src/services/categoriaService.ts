import Categoria from '../types/Categoria';
import api from './index';

export default class categoriaService{
    getAll(token:string){
        return api.get<Array<Categoria>>('/categoria',{headers:{'Authorization':`Bearer ${token}`}});
    }
    getByDescricao(descricao:string,token:string){
        return api.get<Categoria>('/categoria',{headers:{'Authorization':`Bearer ${token}`}});
    }
}