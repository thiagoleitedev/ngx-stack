import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { CardConfig } from '@ngx-plus/ngx-ui'

import { ProjectsService, Project } from '../projects.service'

@Component({
  selector: 'ngx-project-detail',
  template: `
    <ngx-card *ngIf="item"
              [config]="cardConfig">
      <router-outlet></router-outlet>
    </ngx-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailComponent implements OnInit {
  public cardConfig: CardConfig
  public item: Project

  constructor(public service: ProjectsService, private route: ActivatedRoute) {}

  ngOnInit() {
    const project = this.route.snapshot.data.project[0]
    this.item = new Project(project)
    this.service.setSelected(this.item)
    this.cardConfig = {
      cardTitle: this.item.name,
      icon: 'fa fa-fw fa-tag',
      nav: {
        title: 'Project Detail',
        items: [{ icon: 'fa fa-fw fa-pencil-square-o', name: 'Edit', link: 'edit' }],
      },
      subTitle: this.item.description,
    }
  }
}
