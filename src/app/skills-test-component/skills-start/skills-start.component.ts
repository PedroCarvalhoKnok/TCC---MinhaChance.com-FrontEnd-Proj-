import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-skills-start',
  templateUrl: './skills-start.component.html',
  styleUrls: ['./skills-start.component.scss']
})
export class SkillsStartComponent implements OnInit {

  userId: number;

  constructor(private router: Router, private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.userId = this.activeRouter.snapshot.params?.['userId'];

  }

  confirmStartTest(){
    Swal.fire({
      title: 'Tem certeza que deseja iniciar o teste de aptidões?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Não!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.startTest();
      }
    })
  }

  startTest(){
    this.router.navigate([`/candidato/${this.userId}/teste`]);
  }

}
