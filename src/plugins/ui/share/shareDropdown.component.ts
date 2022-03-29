import gql from 'graphql-tag'
import { Component, OnInit, } from '@angular/core';
import { FormControl, } from '@angular/forms';
import { RelationCustomFieldConfig } from '@vendure/common/lib/generated-types';
import { DataService, FormInputComponent } from '@vendure/admin-ui/core';

@Component({
  template: `

  <select *ngIf="sharesList.length" appendTo="body" class="FormControl" [formControl]="FormControl" (change)='onSelectType($event.target.value)'>
  <option [ngValue]="null">Select a share...</option>
    <option *ngFor="let item of sharesList" [ngValue]="item.id" >
      {{ item.name }}
    </option>
  </select>
  `,
})


export class ShareDropDownControl implements OnInit, FormInputComponent<RelationCustomFieldConfig> {
  readonly: boolean;
  formControl: FormControl;
  config: RelationCustomFieldConfig;  
  sharesList: [];
  selected$: number
  reviews$: any
  reviews1$: any

  constructor(private dataService: DataService) {

  }
  ngOnInit() {

    this.dataService
      .query(
        gql`
            query getAll {
              shares {
                    items {
                        id
                        name
                    }
                }
            }
        `
      ).mapStream((data: any) => { 
         this.sharesList = data.shares?.items || [];         
         
      })
      .subscribe((data: any) => { data });
  }

  onSelectType(e: string) {    
    let arr = e.split(':')
    let id = Number(arr[0]);

    this.formControl.setValue({ id: id });
    this.formControl.markAsDirty();
  }
}


