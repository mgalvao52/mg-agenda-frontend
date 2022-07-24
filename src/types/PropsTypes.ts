export enum status {
  atrasada = "atrasada",
  aberta = "aberta",
  concluida = "concluida",
}
export interface PropsStatus {
  status: status;
  total: Number;
}
export interface Itens {
  descricao: string;
  list: PropsStatus[];
}

export interface ListaItens {
  lista: Itens[];
}

export interface CustomDate {
  date: Date;
  enabled: boolean;
}

export type darkTheme = {
  "background-color": "#3c3c3c";
};
