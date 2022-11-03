import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss']
})
export class HomeComponentComponent implements OnInit {


  images = [
  'https://st.depositphotos.com/2461781/3126/v/600/depositphotos_31260521-stock-illustration-hand-shaking.jpg',
  'https://static.vecteezy.com/ti/vetor-gratis/p1/5318194-recrutamento-conceito-ilustracao-ideia-para-pagina-de-destino-modelo-membro-selecao-contratacao-profissional-com-habilidades-especificas-para-trabalho-planejamento-de-negocios-estilos-planos-desenhados-a-mao-vetor.jpg',
  'https://img.freepik.com/vetores-premium/feedback-ou-conceito-de-ilustracao-de-avaliacao-com-personagens-pessoas-felizes-segurando-cinco-estrelas-sobre-suas-cabecas_269730-104.jpg',
  'https://congresse.me/wp-content/uploads/2022/05/Curso-online.png',
  'https://thumbs.dreamstime.com/b/desenvolvimento-profissional-de-professores-%E2%80%94-ilustra%C3%A7%C3%A3o-do-vetor-conceito-abstrato-forma%C3%A7%C3%A3o-por-iniciativa-das-autoridades-189702706.jpg',
  'https://st2.depositphotos.com/7523024/43987/v/450/depositphotos_439871530-stock-illustration-certificate-vector-icon-modern-simple.jpg',
  'https://classic.exame.com/wp-content/uploads/2021/06/GettyImages-1041190304.jpg?quality=70&strip=info&w=1024',].map((n) => `${n}`);

  imagesActors = [
    'https://thumbs.dreamstime.com/b/carta-de-identifica%C3%A7%C3%A3o-licen%C3%A7a-como-conceito-estrutura-t%C3%B3picos-documento-identidade-v%C3%A1lido-condu%C3%A7%C3%A3o-ou-permiss%C3%A3o-viagem-201788862.jpg',
    'https://thumbs.dreamstime.com/b/grupo-criativo-linha-moderna-ilustra%C3%A7%C3%A3o-do-estilo-projeto-133672888.jpg',
    ].map((n) => `${n}`);

    imagesObjetives = [
      'https://t3.ftcdn.net/jpg/04/69/59/56/360_F_469595667_TQVf3OscbMTjnllYhqfQ8hs9PuqsSABh.webp',
      'https://cdn-icons-png.flaticon.com/512/3588/3588296.png',
      'https://cdn-icons-png.flaticon.com/512/2689/2689212.png',
      'https://cdn-icons-png.flaticon.com/512/1239/1239719.png',
      'https://cdn-icons-png.flaticon.com/512/4341/4341966.png'
      ].map((n) => `${n}`);

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToMyProfile(){

    let userLogged = JSON.parse(sessionStorage.getItem('user')!);
    console.log(userLogged);

    if(!userLogged){

      Swal.fire(
        `Atenção!`,
        'Autentique seu usuário para acessar o perfil',
        'warning'
      );

      return;

    }

    this.router.navigate([`/${userLogged.id}/perfil`]);

  }

}
