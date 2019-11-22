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
