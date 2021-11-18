import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { fadeAnimation } from '../../../animations';
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
export class AddRoleComponent implements OnInit, OnChanges {

  panelOpenState = false;

  defaultRoles!: Irole[];
  selectedRole!: Irole;
  rights: any[] = [];
  roleForm: FormGroup;
  accountId!: string;
  isLoading = false;

  @Input() selectedRoleInfo?: { roletypeid: number, rolename: string, accountroleid?: string } | null;
  @Input() isEdit: boolean = false;
  @Input('isView') isRoleView: boolean = false;
  @Output() onRoleSubmit = new EventEmitter<boolean>();

  ln = SETTINGS_LN;

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
      if (roletypeid) {
        this.userRoleService.getPermissions(this.accountId, roletypeid)
          .subscribe((res: any) => {
            if (!res.error) this.buildRights(res?.data?.roles?.rights);
          });
      }
    });
  }



  ngOnChanges() {
    console.log('edit', this.isEdit, 'view', this.isRoleView)
    this.store.select(getDefaultAccountId).subscribe(accountid => this.accountId = accountid);
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
    } else {
      this.roleForm.reset();
      this.clearRightsForm();
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
    const payload: any = {
      roletypeid: value.roleType,
      rolename: value.roleName
    }

    const payload2 = {
      roletypeid: value.roleType,
      rights
    }

    // for update add accountroleid
    if (this.isEdit) payload.role['accountroleid'] = this.selectedRoleInfo?.accountroleid;

    this.isLoading = true;

    if (!this.isEdit) {
      this.userRoleService.saveRole(payload, this.accountId).subscribe((res: any) => {
        if (!res?.error) {
          this.updatePermission(payload2);
          this.snackbarService.open(res?.message, 'Ok');
        }
        this.isLoading = false;
      }, (err) => this.isLoading = false);
    } else {
      this.userRoleService.updateRole(payload.role).subscribe((res: any) => {
        if (!res?.error) {
          this.updatePermission(payload2);
          this.snackbarService.open(res?.message, 'Ok');
        }
        this.isLoading = false;
      }, (err) => this.isLoading = false);
    }
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
