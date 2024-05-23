import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {
  uploadForm: FormGroup;
  uploadProgress: number = 0;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.uploadForm = this.fb.group({
      file: [null]
    });
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('file')?.setValue(file);
      console.log(file);
      
    }
  }



  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file')?.value);
    // post request to an api

    this.http.post('', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(100 * (event.loaded / (event.total ?? 1)));
      } else if (event.type === HttpEventType.Response) {
        console.log('Upload complete');
      }
    });
  }

}


