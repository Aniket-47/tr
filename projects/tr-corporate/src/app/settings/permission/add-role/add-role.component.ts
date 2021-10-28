import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {

  panelOpenState = false;

  images = [
    {img: 'https://images.wallpaperscraft.com/image/single/beautiful_scenery_mountains_lake_nature_93318_800x600.jpg'},
    {img: 'https://images.wallpaperscraft.com/image/single/nature_river_light_trees_84788_800x600.jpg'},
    {img: 'https://lh3.googleusercontent.com/proxy/bMYEEUJLgpifVLe9DTswT9M7gkVffZGhIyIj7BI48t3LHGK4nZXUhm_veew7YMDYTfQdkrTqXnLexxzlr-zVRyOwQuNwIlRbN89fAt0lLvnQ1t26-tZw_bqVEWCpENaJ0QUCuOo'},
    {img: 'https://i.pinimg.com/originals/4f/34/a3/4f34a31ed3944be5c68133c112aba04d.jpg'},
    {img: 'https://lh3.googleusercontent.com/proxy/8AarUn-W0bNvdPJtzCQg9uc-JPAGrC_-G1GK1PcWtk7wN9MtNKYeCrUtNyrwHf8FdzgLT0UJjgdJsxBdpXPONY6NcyNxzPKY3zvdJRXMueM70cbp982GGECC-1YTfliSng'},
    {img: 'https://www.teahub.io/photos/full/23-231391_full-hd-nature-wallpapers-free-download-for-laptop.jpg'},
    {img: 'https://cdn.wallpapersafari.com/12/94/FGvPI3.jpg'},
    {img: 'https://lh3.googleusercontent.com/proxy/QooZmCXmZ3jUXWl7_CvPM8plYCP0sA-z2tXSD0GtZFZ6bgAidWYDC59fHa6SZbkLP4Q3v9nT4Hpfi0fNtj7hGps4P81BeMgKlEOOmRtx9_Uoz0HdZrLdYlq31rJak9c'},
    {img: 'http://wallpoper.com/images/00/38/87/78/nature-artwork_00388778.jpg'},
    {img: 'https://images.wallpaperscraft.com/image/single/3d_photoshop_nature_landscape_14993_800x600.jpg'},
    {img: 'https://cdn.wallpapersafari.com/7/30/URhlHu.jpg'},
    {img: 'https://www.desktopbackground.org/p/2015/09/17/1012427_nature-beautiful-live-wallpaper-for-mobile-800x600-jpg_800x600_h.jpg'},
    {img: 'https://lh3.googleusercontent.com/proxy/0gsHrZvE1ZNgYV6hsojLqJbMeCMpiwQnBRIto4rXTq_0IlfArEp6zevZeeOPCJmGbwoBvswUYtlnzi1Kq7Bt206gHeH6yiFPxVv6QMqVN1pQixoEUT1gwgL4tqQQwkXV9Sbc5EZJjH28VerMvLObjAbBLw8tfzGf-w'},
    {img: 'https://lh3.googleusercontent.com/proxy/JCHvA9HJBMNqeFxQo8dVTo6hB1tTl5nwxjFYwqxfABX9gXhb5Epa-09Q2IhTTY6RDajLbGSOeyOfv-Rx6CvFHVT9FT0TOLSYM722ofYarQ5Id5NgiwGnXE-vWcmiDrSjCRfxvDvwBG569XMQS_ztV6a_Q78'},
    {img: 'https://a-static.besthdwallpaper.com/real-nature-scenery-landspace-wallpaper-800x600-20155_17.jpg'},
    {img: 'https://data.1freewallpapers.com/download/lake-mountains-forest-landscape-nature-800x600.jpg'},
  ]

  constructor() { }

  ngOnInit(): void {
  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  onEvent(event: any) {
    event.stopPropagation();
 }


}
