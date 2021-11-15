import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AbstractControl, Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { fadeAnimation } from '../../../animations';
import { Observable } from 'rxjs';
import { SnackBarService } from '../../../utility/services/snack-bar.service';
import { Irole } from '../../../utility/store/interfaces/role';
import { State } from '../../../utility/store/reducers';
import { getDefaultAccountId } from '../../../utility/store/selectors/account.selector';
import { getRoles } from '../../../utility/store/selectors/roles.selector';
import { UserRoleService } from '../services/user-role.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
  animations: [fadeAnimation]
})
export class AddRoleComponent implements OnInit, OnChanges {

  panelOpenState = false;

  // images = [
  //   { img: 'https://images.wallpaperscraft.com/image/single/beautiful_scenery_mountains_lake_nature_93318_800x600.jpg' },
  //   { img: 'https://images.wallpaperscraft.com/image/single/nature_river_light_trees_84788_800x600.jpg' },
  //   { img: 'https://lh3.googleusercontent.com/proxy/bMYEEUJLgpifVLe9DTswT9M7gkVffZGhIyIj7BI48t3LHGK4nZXUhm_veew7YMDYTfQdkrTqXnLexxzlr-zVRyOwQuNwIlRbN89fAt0lLvnQ1t26-tZw_bqVEWCpENaJ0QUCuOo' },
  //   { img: 'https://i.pinimg.com/originals/4f/34/a3/4f34a31ed3944be5c68133c112aba04d.jpg' },
  //   { img: 'https://lh3.googleusercontent.com/proxy/8AarUn-W0bNvdPJtzCQg9uc-JPAGrC_-G1GK1PcWtk7wN9MtNKYeCrUtNyrwHf8FdzgLT0UJjgdJsxBdpXPONY6NcyNxzPKY3zvdJRXMueM70cbp982GGECC-1YTfliSng' },
  //   { img: 'https://www.teahub.io/photos/full/23-231391_full-hd-nature-wallpapers-free-download-for-laptop.jpg' },
  //   { img: 'https://cdn.wallpapersafari.com/12/94/FGvPI3.jpg' },
  //   { img: 'https://lh3.googleusercontent.com/proxy/QooZmCXmZ3jUXWl7_CvPM8plYCP0sA-z2tXSD0GtZFZ6bgAidWYDC59fHa6SZbkLP4Q3v9nT4Hpfi0fNtj7hGps4P81BeMgKlEOOmRtx9_Uoz0HdZrLdYlq31rJak9c' },
  //   { img: 'http://wallpoper.com/images/00/38/87/78/nature-artwork_00388778.jpg' },
  //   { img: 'https://images.wallpaperscraft.com/image/single/3d_photoshop_nature_landscape_14993_800x600.jpg' },
  //   { img: 'https://cdn.wallpapersafari.com/7/30/URhlHu.jpg' },
  //   { img: 'https://www.desktopbackground.org/p/2015/09/17/1012427_nature-beautiful-live-wallpaper-for-mobile-800x600-jpg_800x600_h.jpg' },
  //   { img: 'https://lh3.googleusercontent.com/proxy/0gsHrZvE1ZNgYV6hsojLqJbMeCMpiwQnBRIto4rXTq_0IlfArEp6zevZeeOPCJmGbwoBvswUYtlnzi1Kq7Bt206gHeH6yiFPxVv6QMqVN1pQixoEUT1gwgL4tqQQwkXV9Sbc5EZJjH28VerMvLObjAbBLw8tfzGf-w' },
  //   { img: 'https://lh3.googleusercontent.com/proxy/JCHvA9HJBMNqeFxQo8dVTo6hB1tTl5nwxjFYwqxfABX9gXhb5Epa-09Q2IhTTY6RDajLbGSOeyOfv-Rx6CvFHVT9FT0TOLSYM722ofYarQ5Id5NgiwGnXE-vWcmiDrSjCRfxvDvwBG569XMQS_ztV6a_Q78' },
  //   { img: 'https://a-static.besthdwallpaper.com/real-nature-scenery-landspace-wallpaper-800x600-20155_17.jpg' },
  //   { img: 'https://data.1freewallpapers.com/download/lake-mountains-forest-landscape-nature-800x600.jpg' },
  // ]

  defaultRoles!: Irole[];
  selectedRole!: Irole;
  rights: any[] = [];
  roleForm: FormGroup;
  accountId!: string;
  isLoading = false;
  isRoleView = false;

  @Input() selectedRoleInfo?: { roletypeid: number, rolename: string } | null;
  @Output() onRoleSubmit = new EventEmitter<boolean>();

  constructor(
    private userRoleService: UserRoleService,
    private store: Store<State>,
    private snackbarService: SnackBarService,
    private fb: FormBuilder) {
    this.roleForm = this.fb.group({
      roleType: ['', [Validators.required]],
      roleName: ['', [Validators.required]],
      rights: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.store.select(getRoles).subscribe(roles => {
      // remove owner, because for one account there is only one owner.
      if (roles && roles.length) this.defaultRoles = roles.slice(1, roles.length);
    })
    this.store.select(getDefaultAccountId).subscribe(accountid => this.accountId = accountid);

    this.roleForm.get('roleType')?.valueChanges.subscribe((roletypeid) => {
      if (this.rightsArray.controls.length) this.clearRightsForm();
      if (roletypeid) {
        this.userRoleService.getPermissions(this.accountId, roletypeid)
          .subscribe((res: any) => {
            if (!res.error) this.buildRights(res?.data?.roles?.rights);
          });
      }
    });


  }



  ngOnChanges() {
    this.store.select(getDefaultAccountId).subscribe(accountid => this.accountId = accountid);
    if (this.selectedRoleInfo?.roletypeid && this.accountId) {
      this.isRoleView = true;

      if (this.rightsArray.controls.length) this.clearRightsForm();
      this.userRoleService.getPermissions(this.accountId, `${this.selectedRoleInfo.roletypeid}`)
        .subscribe((res: any) => {
          if (!res.error) {
            this.buildRights(res?.data?.roles?.rights);
            // this.rightsArray.disable();
          }
        });
    } else {
      this.roleForm.reset();
      this.clearRightsForm();
      this.isRoleView = false;
    }
  }

  get roleType(): AbstractControl {
    return this.roleForm.get('roleType') as FormControl;
  }

  get roleName(): AbstractControl {
    return this.roleForm.get('roleName') as FormControl;
  }

  get rightsArray(): FormArray {
    return this.roleForm.get('rights') as FormArray;
  }

  getLvl2Array(index: number) {
    return this.rightsArray.controls[index].get('level2') as FormArray;
  }

  getLvl3Array(rightIndex: number, index: number) {
    return this.getLvl2Array(rightIndex)?.controls[index].get('level3') as FormArray;
  }

  buildRights(rights: any[]) {
    this.rights = rights.map((e: any) => {
      let rightData: any = {
        id: e.id, name: e.name, isOn: +e.on === 1
      }

      if (e?.level2 && Array.isArray(e.level2)) {
        const level2 = e.level2.map((l2: any) => {
          let level2Data: any = { id: l2.id, name: l2.name, isOn: +l2.on === 1 }

          if (l2?.level3 && Array.isArray(l2.level3)) {
            const level3Data = l2.level3.map((l3: any) => ({
              id: l3.id, name: l3.name, isOn: +l3.on === 1
            }));

            level2Data['level3'] = level3Data;
          }

          return level2Data;
        });

        rightData['level2'] = level2;
      }

      return rightData;
    });

    // add levels and rights
    if (this.rights.length) {
      this.rights.forEach((r, ri) => {
        this.addRights(r);

        if (r?.level2 && Array.isArray(r?.level2)) {
          this.addLevel('level2', r.level2, ri);
        }
      });
    }
  }

  // form
  addRights(data: any) {
    const formData = { ...data };
    if (data?.level2) formData.level2 = this.fb.array([]);
    this.rightsArray.push(this.fb.group(formData));
  }

  addLevel(levelName: string, data: any[], rightIndex: number) {
    let level: any = { ...this.rights[rightIndex] };
    level[levelName] = this.fb.array([]);

    data.map((l) => {
      const lvlData = { ...l };
      if (l?.level3) {
        lvlData.level3 = this.fb.array([]);
        if (Array.isArray(l?.level3)) {
          l.level3.map((e: any) => lvlData.level3.push(this.fb.group(e)))
        }
      }
      const innerLevel: FormGroup = this.fb.group(lvlData);
      level[levelName].push(innerLevel);
    });

    const levelForm = this.fb.group(level);
    this.rightsArray.setControl(rightIndex, levelForm);
  }

  clearRightsForm() {
    this.rightsArray.clear();
  }

  toggleAllLvl(rightIndex: number) {
    const currentRightStatus = !!this.rightsArray.controls[rightIndex].get('isOn')?.value;
    const isThereLevel2 = !!this.rightsArray.controls[rightIndex].get('level2')?.value;
    if (isThereLevel2) {
      // level 2 toggle
      const lvl2Arr = this.getLvl2Array(rightIndex);
      lvl2Arr.controls.forEach((e, index) => {
        e.get('isOn')?.setValue(!currentRightStatus);

        // level 3 toggle
        const isThereLevel3 = e.get('level3')?.value;
        if (isThereLevel3) this.toggleLvl3(rightIndex, index, currentRightStatus);
      });
    }
  }

  toggleLvl3(rightIndex: number, lvl2Index: number, status: boolean) {
    const lvl3Arr = this.getLvl3Array(rightIndex, lvl2Index);
    lvl3Arr.controls.forEach(e => {
      e.get('isOn')?.setValue(!status);
    });
  }

  submitHandler() {
    const { value, invalid } = this.roleForm;
    if (invalid) {
      this.roleForm.get('roleType')?.markAllAsTouched();
      this.roleForm.get('roleName')?.markAllAsTouched();
      return;
    }

    let rights: { id: number | string, on: number }[] = [];
    this.roleForm.get('rights')?.value.forEach((r: any) => {
      rights.push({
        id: r.id,
        on: r.isOn === true ? 1 : 0
      });

      if (r?.level2 && Array.isArray(r?.level2)) {
        r.level2.forEach((l2: any) => {
          rights.push({
            id: l2.id,
            on: l2.isOn === true ? 1 : 0
          });

          if (l2?.level3 && Array.isArray(l2?.level3)) {
            l2.level3.forEach((l3: any) => {
              rights.push({
                id: l3.id,
                on: l3.isOn === true ? 1 : 0
              });
            });
          }
        });
      }
    });
    const payload = {
      role: {
        roletypeid: value.roleType,
        rolename: value.roleName
      }
    }

    const payload2 = {
      roletypeid: value.roleType,
      rights
    }


    this.isLoading = true;
    this.userRoleService.saveRole(payload, this.accountId).subscribe((res: any) => {
      if (!res?.error) {
        this.updatePermission(payload2);
        this.snackbarService.open(res?.message, 'Ok');
      }
      this.isLoading = false;
    }, (err) => this.isLoading = false);
  }

  updatePermission(payload: any) {
    this.userRoleService.updatePersmissions(payload, this.accountId).subscribe((res: any) => {
      if (!res?.error) {
        this.snackbarService.open(res?.message, 'Ok');
        this.roleForm.reset();
        this.rightsArray.clear();
        this.onRoleSubmit.emit(true);
      }
    });
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
