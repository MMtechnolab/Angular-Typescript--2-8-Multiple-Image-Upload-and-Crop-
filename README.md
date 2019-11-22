# Angular(Typescript) 2-8 Multiple Image Upload and Crop 
 Multiple Image Upload And Crop them by selecting one by one Using Angular TypeScript(2-8)
 
 I Found all Image Uploader allow  only single file upload and crop,I made some modification to make upload multiple Images to upload and allow user to crop them one by one.
 Using ngx-image-cropper

<p align="center">
  <img src="https://raw.githubusercontent.com/MMtechnolab/Angular-Typescript--2-8-Multiple-Image-Upload-and-Crop-/master/src/assets/Image/UplaodedMultipleImages.png" width="350" title="Uploaded Image List ">

  <img src="https://raw.githubusercontent.com/MMtechnolab/Angular-Typescript--2-8-Multiple-Image-Upload-and-Crop-/master/src/assets/Image/ImageCropperModal.png" width="350" title="Selected Image Cropper Modal Popoup">
</p>


### Installation
`npm install ngx-image-cropper --save`

### Example usage:
Add the ImageCropperModule to the imports of the module which will be using the Image Cropper.
```
import { NgModule } from '@angular/core';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
    imports: [
        ...
        ImageCropperModule
    ],
    declarations: [
        ...
    ],
    exports: [
        ...
    ],
    providers: [
        ...
    ]
})
export class YourModule {
}
```

Add the element to your HTML:
```
// this will allow user select multiple Images
  <input type="file" multiple (change)="fileChangeEvent($event)" />
//Show uploaded  images by user latere here cropped images will be replaced with origional
    <div style="display:flex;max-width:600px;overflow: auto;">
      <div *ngFor="let item of ulpoadedFiles" style="margin:5px">
        <span (click)="cropImage(item.imgId)">
          <img [src]="item.imgBase64" style="max-width:300px;max-height:100px ;border:2px solid gray" />
        </span>
      </div>
    </div>
//modal to show selected Image in modal popup and on save it will replace with origional Image
   <!--popup modal-->
    <div class="backdrop" [ngStyle]="{'display':display}"></div>

    <div class="modal" tabindex="-1" role="dialog"  [ngStyle]="{'display':display}">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Image Cropper</h4>
            <button type="button" class="close" aria-label="Close" (click)="onCloseHandled()"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <image-cropper [imageChangedEvent]="imageChangedEvent"
                           [maintainAspectRatio]="true"
                           [aspectRatio]="4 / 3"
                           [resizeToWidth]="128"
                           format="png"
                           (imageCropped)="imageCropped($event)"
                           (imageLoaded)="imageLoaded()"
                           (cropperReady)="cropperReady()"
                           (loadImageFailed)="loadImageFailed()" style="max-height:500px"></image-cropper>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" (click)="SaveCropedImage()">Save</button>
            <button type="button" class="btn btn-default" (click)="onCloseHandled()">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
//style For modal backdrop  
  <style>
.backdrop {
  background-color: rgba(0,0,0,0.6);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}

  </style>
  
  ```
  
  And add this to your ts file:
  
  ```
  import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  display = 'none';
  ulpoadedFiles: any = [];
  imgId: any=0;
  target: any = {};
  files: any = {};
  event: any = {};
  developer: any = {};
  frontEndLanguages: any = [];
  backEndLanguages: any = [];
  selectedBackEndItems: any = [];
  selectedFrontEndItems: any = [];
  imageChangedEvent: any = '';
  croppedImage: any = '';
  currentProcessingImg: any = 0;

  finalImageList: any = [];
  constructor() { }

  ngOnInit() {
  }
  openModal() {
       this.display = 'block';
  }

  onCloseHandled() {
    this.imageChangedEvent = null;
    this.display = 'none';
  }

  
  fileChangeEvent(event: any): void {
    //Processing selected Images 
    for (var i = 0; i < event.target.files.length; i++) {
      this.imageProcess(event, event.target.files[i]);
    }
  }

  imageProcess(event: any, file: any) {
    //Setting images in our required format
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.imgId = this.imgId + 1;
      this.ulpoadedFiles.push({ imgId: this.imgId, imgBase64: reader.result, imgFile: file });
    };
  }

  //get a Image using Image Id to crop
  //cropping process done here 
  cropImage(imgId) {
    this.currentProcessingImg = imgId;
    var imgObj = this.ulpoadedFiles.find(x => x.imgId === imgId);
    //created dummy event Object and set as imageChangedEvent so it will set cropper on this image 
    var event = {
      target: {
        files: [imgObj.imgFile]
      }
    };
    this.imageChangedEvent = event;
    this.openModal();
  }

  //Save Cropped Image locally
  SaveCropedImage() {
    var imgObj = this.ulpoadedFiles.find(x => x.imgId === this.currentProcessingImg);
    imgObj.imgBase64 = this.croppedImage;
    this.onCloseHandled();
  }

  SaveAllImages() {
    this.finalImageList = null;
    this.ulpoadedFiles.forEach(imgObject => {

      this.finalImageList.push(imgObject.imgBase64);
    })
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

}

  
  ```


[Aslo compaare code and functionality with origional](https://stackblitz.com/edit/image-cropper)





