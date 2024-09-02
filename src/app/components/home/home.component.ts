import { Component, inject, OnInit } from '@angular/core';
import { FlowbiteServiceService } from '../../core/services/flowbite-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoteService } from '../../core/services/note.service';
declare var $:any;
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  private readonly _FlowbiteServiceService=inject(FlowbiteServiceService);
  private readonly _FormBuilder=inject(FormBuilder);
  private readonly _NoteService=inject(NoteService);

  ngOnInit(): void {
    this.getUsernotes();
    this._FlowbiteServiceService.loadFlowbite(()=>{
      
    })
  }

  addNoteForm:FormGroup=this._FormBuilder.group({
    title:[null,[Validators.required]],
    content:[null,[Validators.required]],
  })
  updateNoteForm:FormGroup=this._FormBuilder.group({
    _id:[null],
    title:[null,[Validators.required]],
    content:[null,[Validators.required]],
  })

  noteList:any=[];

  addnotes():void{
    this.isLoding=true;
    this._NoteService.addNote(this.addNoteForm.value).subscribe({
      next:(res)=>{
        this.isLoding=false;
        this.addNoteForm.reset();
        this.getUsernotes()
        
      },
      error:(err)=>{
        console.log(err);
        this.isLoding=false;
        
      }
    })
  }
  getUsernotes():void{
    this._NoteService.getUserNote().subscribe({
      next:(res)=>{
        console.log(res);
        this.noteList=res.notes
        this.addNoteForm.reset();
        
      },
      error:(err)=>{
        console.log(err);
        if(err.error.msg == 'not notes found'){
          this.noteList=[]
        }
        
      }
    })
  }
  isLoding:boolean=false;
  deletenotes(id:string):void{
    this.isLoding=true
    this._NoteService.deleteNote(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.getUsernotes();
        
        this.isLoding=false;
        
      },
      error:(err)=>{
        console.log(err);
        this.isLoding=false;
      }
    })
  }
  sow_hidden:string='hidden'
  updatenotes(note:any):void{
    this.sow_hidden='block'
    this.updateNoteForm.patchValue(note)

  }
  sendUpdate():void{

    const {_id,title,content}=this.updateNoteForm.value;
    
    this.isLoding=true;
    this._NoteService.updateNote(_id,{title,content}).subscribe({
      next:(res)=>{
        console.log(res);
        this.getUsernotes();
        this.sow_hidden='hidden';
        this.isLoding=false;
        
      },
      error:(err)=>{
        console.log(err);
        this.isLoding=false;
      }
    })
    
  }
  sow():void{
    this.sow_hidden='hidden';
  }



}
