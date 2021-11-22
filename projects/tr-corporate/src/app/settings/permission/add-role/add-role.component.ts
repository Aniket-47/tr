import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { fadeAnimation } from '../../../animations';
import { ROUTE_CONFIGS } from '../../../utility/configs/routerConfig';
import { SnackBarService } from '../../../utility/services/snack-bar.service';
import { Irole } from '../../../utility/store/interfaces/role';
import { State } from '../../../utility/store/reducers';
import { getDefaultAccountId } from '../../../utility/store/selectors/account.selector';
import { getRoles } from '../../../utility/store/selectors/roles.selector';
import { SETTINGS_LN } from '../../shared/settings.lang';
import { UserRoleService } from '../shared/services/user-role.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
  animations: [fadeAnimation]
})
export class AddRoleComponent implements OnInit, OnDestroy {

  panelOpenState = false;

  defaultRoles!: Irole[];
  rights: any[] = [];
  roleForm!: FormGroup;
  accountId!: string;
  isLoading = false;

  selectedRoleInfo?: { roletypeid: number, rolename: string, accountroleid?: string } | null;
  isEdit: boolean = false;
  isRoleView: boolean = false;
  rightsData: any[] = [];

  ln = SETTINGS_LN;

  constructor(
    private userRoleService: UserRoleService,
    private store: Store<State>,
    private snackbarService: SnackBarService,
    private router: Router,
    private fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit(): void {
    this.store.select(getRoles).subscribe(roles => {
      // remove owner, because for one account there is only one owner.
      if (roles && roles.length) this.defaultRoles = roles.slice(1, roles.length);
    })
    this.store.select(getDefaultAccountId).subscribe(accountid => this.accountId = accountid);

    this.roleForm.get('roleType')?.valueChanges.subscribe((roletypeid) => {
      if (roletypeid) {
        this.userRoleService.getPermissions(this.accountId, roletypeid)
          .subscribe((res: any) => {
            if (!res.error) this.buildRights(res?.data?.roles?.rights);
          });
      }
    });

    this.getUserSelectedRole();
  }

  ngOnDestroy() {
    this.userRoleService.resetSelectedRole()
  }

  getUserSelectedRole() {
    this.userRoleService.currentRoleData.subscribe(data => {
      if (data) {
        console.log(data)
        this.isRoleView = data.isView;
        this.isEdit = data.isEdit;
        this.selectedRoleInfo = data.selectedRole;
        if (this.selectedRoleInfo?.roletypeid && this.accountId) {

          if (this.isEdit) {
            // update form 
            this.roleForm.patchValue({
              roleType: this.selectedRoleInfo.roletypeid,
              roleName: this.selectedRoleInfo.rolename
            });
          }

          // remove extra api call bcz we already update form
          // on form value chage it will get call
          if (!this.isEdit) {
            this.userRoleService.getPermissions(this.accountId, `${this.selectedRoleInfo.roletypeid}`)
              .subscribe((res: any) => {
                if (!res.error) {
                  this.buildRights(res?.data?.roles?.rights);
                  this.rightsArray.disable();
                }
              });
          }
        }
      }
    });
  }

  initForm() {
    this.roleForm = this.fb.group({
      roleType: ['', [Validators.required]],
      roleName: ['', [Validators.required]],
      rights: this.fb.array([]),
    });
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
    this.rightsData = rights;
    if (this.rightsArray.controls.length) this.clearRightsForm();

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

  onLvl1Toggle(rightIndex: number) {
    const currentRightStatus = !!this.rightsArray.controls[rightIndex].get('isOn')?.value;
    const isThereLevel2 = !!this.rightsArray.controls[rightIndex].get('level2')?.value;
    console.log({ currentRightStatus })

    if (isThereLevel2 && currentRightStatus) {
      // level 2 toggle
      const lvl2Arr = this.getLvl2Array(rightIndex);
      lvl2Arr.controls.forEach((e, index) => {
        e.get('isOn')?.setValue(false);

        // level 3 toggle
        const isThereLevel3 = e.get('level3')?.value;
        if (isThereLevel3) this.toggleLvl3(rightIndex, index, false);
      });
    }
  }

  resetToDefault() {
    if (this.rightsData) {
      this.clearRightsForm();
      this.buildRights(this.rightsData);
    }
  }


  toggleAllLvl(rightIndex: number, lvl2Index: number, lvl3Index: number) {
    const isLvl3StatusOn: boolean = this.getLvl3Array(rightIndex, lvl2Index).controls[lvl3Index].get('isOn')?.value;

    if (!isLvl3StatusOn) {
      this.rightsArray.controls[rightIndex].get('isOn')?.setValue(true);
      this.getLvl2Array(rightIndex).controls[lvl2Index].get('isOn')?.setValue(true);
    }
  }

  onToggleLvl2(rightIndex: number, lvl2Index: number) {
    const isLvl2StatusOn: boolean = this.getLvl2Array(rightIndex).controls[lvl2Index].get('isOn')?.value;

    if (!isLvl2StatusOn) {
      this.rightsArray.controls[rightIndex].get('isOn')?.setValue(true);
    }
  }

  toggleLvl3(rightIndex: number, lvl2Index: number, status: boolean) {
    const lvl3Arr = this.getLvl3Array(rightIndex, lvl2Index);
    lvl3Arr.controls.forEach(e => {
      e.get('isOn')?.setValue(status);
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
    const payload: any = {
      roletypeid: value.roleType,
      rolename: value.roleName
    }

    const payload2 = {
      roletypeid: value.roleType,
      rights
    }

    // for update add accountroleid
    if (this.isEdit) payload['accountroleid'] = this.selectedRoleInfo?.accountroleid;

    this.isLoading = true;

    if (!this.isEdit) {
      this.userRoleService.saveRole(payload, this.accountId).subscribe((res: any) => {
        if (!res?.error) {
          this.updatePermission(payload2);
          this.snackbarService.open(res?.message, this.ln.TXT_OK);
        }
        this.isLoading = false;
      }, (err) => this.isLoading = false);
    } else {
      this.userRoleService.updateRole(payload).subscribe((res: any) => {
        if (!res?.error) {
          this.updatePermission(payload2);
          this.snackbarService.open(res?.message, this.ln.TXT_OK);
        }
        this.isLoading = false;
      }, (err) => this.isLoading = false);
    }
  }

  updatePermission(payload: any) {
    this.userRoleService.updatePersmissions(payload, this.accountId).subscribe((res: any) => {
      if (!res?.error) {
        this.snackbarService.open(res?.message, this.ln.TXT_OK);
        this.roleForm.reset();
        this.rightsArray.clear();
        this.router.navigate([ROUTE_CONFIGS.ROLES]);
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
