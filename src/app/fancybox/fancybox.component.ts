import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fancybox',
  templateUrl: './fancybox.component.html',
  styleUrls: ['./fancybox.component.css'],
})
export class FancyboxComponent implements OnInit {
  @Input() galleryImages: any = [];
  @Input() imgKey: any = null;
  @Input() imgHeight: any;
  @Input() imgWidth: any;
  @Input() interval: any = 5000;

  public isPlaying: any = false;
  public animateImg: any = false;
  public isOpenImageOverlay: any = false;
  public currentImgIndx: any = null;
  public playImg: any = false;

  public openImageOverlay(imgIndx: any) {
    this.isOpenImageOverlay = true;
    if (imgIndx) this.currentImgIndx = imgIndx;
  }

  public closeImageOverlay() {
    this.isOpenImageOverlay = false;
    this.pausePlayImages();
  }

  public nextImage(indx: any) {
    this.animateImg = false;
    if (this.galleryImages.length > this.currentImgIndx) {
      this.currentImgIndx++;
      this.animateImg = true;
    }
  }

  public prevImage(indx: any) {
    this.animateImg = false;
    if (this.currentImgIndx >= 1) {
      this.currentImgIndx--;
      this.animateImg = true;
    }
  }
  public onPlayImages() {
    this.isPlaying = true;
    this.playImg = setInterval(
      () => {
        if (this.galleryImages.length > this.currentImgIndx) {
          this.currentImgIndx++;
        } else {
          this.currentImgIndx = 1;
        }
      },
      this.interval ? this.interval : 4000
    );
    return () => clearTimeout(this.playImg);
  }
  public pausePlayImages() {
    this.isPlaying = false;
    clearInterval(this.playImg);
  }

  public playImages = () =>
    this.isPlaying ? this.pausePlayImages() : this.onPlayImages();

  constructor() {}

  ngOnInit(): void {}
}
