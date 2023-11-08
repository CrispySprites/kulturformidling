import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CRUDService } from '../services/crud.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Type } from '../models/type';
import { ArtDto } from '../models/Art';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { UserNameDto } from '../models/userDto';

class listItem {
  typeId: number = 0;
  artList: ArtDto[] = [];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  displayedColumns: string[] = ['artName', 'description', 'artist', 'from', 'to', 'author'];

  artists: UserNameDto[] = [];
  types: Type[] = []
  sortedArtList: any[] = []

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private api: CRUDService,
    public dialog: MatDialog,


    private _snackBar: MatSnackBar
  ){

  }

  ngOnInit(): void {
    this.updateTable()
    this.api.getArtists().subscribe(r => {
      this.artists = r;
      console.log(this.artists)
    });
    if (this.isAdmin()) {
      this.displayedColumns = ['artName', 'description', 'artist', 'from', 'to', 'author', 'edit', 'delete'];
    }
  }

  updateTable(){
    this.sortedArtList = []
    this.api.getTypes().subscribe(r => {
      this.types = r;
      this.types.forEach(item => {
        const listItem = {
          'typeId': item.id,
        }
        this.api.getArtByType(item).subscribe(result => {
          this.sortedArtList[item.id] = result;
          console.log(this.sortedArtList)
        })
      })
    })
  }

  getArt(typeId: number) {
    return this.sortedArtList[typeId]
  }

  openArtDialog(art: ArtDto): void {
    console.log(art)
    const dialogRef = this.dialog.open(EditArtDialog, {
      data: art,
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result !== undefined) {
        if(result.artId === 0){
          this.api.addArt(result).subscribe(result => {
            this._snackBar.open("Ny kunnst oppreta", "", {
              duration: 3000
            });
          });
        }else {
          this.api.editArt(result).subscribe(result => {
            this._snackBar.open("redigert kunnst", "", {
              duration: 3000
            });
          });
        }
        this.updateTable()
      }
    });
  }

  openTypeDialog(type: Type): void {
    console.log(type)
    const dialogRef = this.dialog.open(EditTypeDialog, {
      data: type,
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result !== undefined) {
        this.api.addType(result).subscribe(result => {
          this._snackBar.open("Ny Kategori oppreta", "", {
            duration: 3000
          });
          this.updateTable()
        })
      }
    });
  }

  deleteArt(art: ArtDto) {
    this.api.deleteArt(art).subscribe(result => {
      this._snackBar.open("slett kunns", "", {
        duration: 3000
      });
      this.updateTable()
    })
  }

  createNewArt(){
    return new ArtDto;
  }

  createNewType(){
    return new Type;
  }


  public isAdmin() {
    const role : string | null = localStorage.getItem('user-role');
    if(role === 'Admin')
    {
      return true;
    } else {
      return false;
    }
  }

}

@Component({
  selector: 'edit-art-dialog',
  templateUrl: 'edit-art-dialog.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule, NgIf, NgFor, MatNativeDateModule, MatDatepickerModule],
  providers: [
    MatDatepickerModule,
  ]
})
export class EditArtDialog {
  constructor(
    public dialogRef: MatDialogRef<EditArtDialog>,
    private api: CRUDService,
    @Inject(MAT_DIALOG_DATA) public data: ArtDto,
  ) {}

  types: Type[] = [];
  artists: UserNameDto[] = [];


  ngOnInit(): void {
    this.api.getTypes().subscribe(r => {
      this.types = r;
    });

    this.api.getArtists().subscribe(r => {
      this.artists = r;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'edit-type-dialog',
  templateUrl: 'edit-type-dialog.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule, NgIf],
})
export class EditTypeDialog {
  constructor(
    public dialogRef: MatDialogRef<EditTypeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Type,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
