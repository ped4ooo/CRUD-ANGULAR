export class Pessoa {

        nome: string;
        corFavorita: string;
        documento: string;
        identificador: string;
        identificacao: string;
        dataNascimento: Date;
        id: number;

        
        constructor () {
        this.nome = "";
        this.corFavorita = "";
        this.documento = "";
        this.identificador = "";
        this.identificacao = "";
        this.dataNascimento = new Date();
        this.id = 0;
        }
}
