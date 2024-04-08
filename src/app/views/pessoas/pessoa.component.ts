import { Component, ViewChild , LOCALE_ID, AfterViewInit} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatTable } from "@angular/material/table";
import { Pessoa } from 'src/app/core/services/models/pessoa.model';
import { PessoasService } from 'src/app/core/services/pessoas.service';


@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }]
})


export class PessoaComponent implements AfterViewInit {
  pessoaAtual: Pessoa | null = null;
  formattedDate: string | null = null;
  formPessoa: FormGroup;
  pessoas: Pessoa[] = [];

  @ViewChild('table')
  table!: MatTable<any>;

  ngAfterViewInit() {
    console.log(this.table); 
  }



  constructor(private fb: FormBuilder,
    private pessoasService: PessoasService){
    this.formPessoa = fb.group({
      nome: [''],
      dataNascimento: [new Date()],
      identificacao: [''],
      identificador: [''],
      documento: [''],
      corFavorita: [''],
    })


    pessoasService.retornarTodos().subscribe(data=>{
      this.pessoas = data
    })
  }

  

  public onIncluirPessoas() {
    let pessoa: Pessoa = new Pessoa();

    pessoa.nome = this.formPessoa.get("nome")?.value;
    pessoa.dataNascimento = this.formPessoa.get("dataNascimento")?.value.toDateString('DD/MM/yyyy');
    pessoa.identificacao = this.formPessoa.get("identificacao")?.value;
    pessoa.identificador = this.formPessoa.get("identificador")?.value;
    pessoa.documento = this.formPessoa.get("documento")?.value;
    pessoa.corFavorita = this.formPessoa.get("corFavorita")?.value;
    pessoa.id = this.pessoas.length + 1;
    
    this.pessoasService.post(pessoa).subscribe()
    this.pessoas.push(pessoa)
    this.table.renderRows();

    this.formPessoa.setValue({
      nome: '',
      dataNascimento: null,
      identificacao: '',
      identificador: '',
      documento: '',
      corFavorita: ''
    });
    
  }



  public onEditarPessoas(pessoa: Pessoa) {
    
    this.formPessoa.get("nome")?.setValue(pessoa.nome);
    this.formPessoa.get("dataNascimento")?.setValue(new Date(pessoa.dataNascimento));
    this.formPessoa.get("identificacao")?.setValue(pessoa.identificacao);
    this.formPessoa.get("identificador")?.setValue(pessoa.identificador);
    this.formPessoa.get("documento")?.setValue(pessoa.documento);
    this.formPessoa.get("corFavorita")?.setValue(pessoa.corFavorita);
    this.pessoaAtual = pessoa;

  }


   
  public onAtualizarPessoas() {
    if (this.pessoaAtual) {
      this.pessoaAtual.nome = this.formPessoa.get("nome")?.value;
      this.pessoaAtual.dataNascimento = this.formPessoa.get("dataNascimento")?.value.toDateString('DD/MM/yyyy');
      this.pessoaAtual.identificacao = this.formPessoa.get("identificacao")?.value;
      this.pessoaAtual.identificador = this.formPessoa.get("identificador")?.value;
      this.pessoaAtual.documento = this.formPessoa.get("documento")?.value;
      this.pessoaAtual.corFavorita = this.formPessoa.get("corFavorita")?.value;
      
  
      let index = this.pessoas.findIndex(p => p.id === this.pessoaAtual?.id);
      if (index !== -1 && this.pessoaAtual !== null) {
        this.pessoasService.put(this.pessoaAtual).subscribe(updatedPessoa => {
          this.pessoas[index] = updatedPessoa;     
        });
      }
      
      this.pessoaAtual = null;
      this.formPessoa.setValue({
        nome: '',
        dataNascimento: null,
        identificacao: '',
        identificador: '',
        documento: '',
        corFavorita: '',
      });
    }
    this.table.renderRows();
  }
  
  public onExcluirPessoa(pessoa: Pessoa) {
  const index = this.pessoas.findIndex(p => p.id === pessoa.id);
  if (index !== -1) {
    this.pessoas.splice(index, 1);
    this.table.renderRows();
  }
 }
}
