import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// store
import { Store } from '@ngrx/store';
import { State } from '../../../utility/store/reducers';
import { getDefaultAccountId } from '../../../utility/store/selectors/account.selector';
import { getRoles } from '../../../utility/store/selectors/roles.selector';

import { SnackBarService } from '../../../utility/services/snack-bar.service';
import { UserRoleService } from '../shared/services/user-role.service';

import { fadeAnimation } from '../../../animations';
import { SETTINGS_LN } from '../../shared/settings.lang';
import { ROUTE_CONFIGS } from '../../../utility/configs/routerConfig';
import { Irole } from '../shared/interfaces/role.model';
import { ValidationConstants } from '../../../utility/configs/app.constants';


@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
  animations: [fadeAnimation]
})
export class AddRoleComponent implements OnInit, OnDestroy {

  defaultRoles!: {
    name: string;
    roletypeid: string;
  }[];
  rights: any[] = [];
  rightsData: any[] = [];

  roleForm!: FormGroup;
  accountId!: string;

  selectedRoleInfo!: { roletypeid: number, rolename: string, accountroleid?: string, isCustom?: boolean, name: string } | null;
  isEdit: boolean = false;
  isRoleView: boolean = false;
  isLoading = false;
  panelOpenState = false;

  ln = SETTINGS_LN;
  route_conf = ROUTE_CONFIGS;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store<State>,
    private userRoleService: UserRoleService,
    private snackbarService: SnackBarService,) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadStoreData();
    const { id: accountroleid } = this.route.snapshot.params;
    if (accountroleid) this.getRoleDeatils(accountroleid);

    if (this.router.url.includes('edit')) {
      this.isEdit = true;
      this.isRoleView = false;
    } else if (this.router.url.includes('view')) {
      this.isEdit = false;
      this.isRoleView = true;
      this.roleForm.disable();
    }

    this.roleForm.get('roleType')?.valueChanges.subscribe((roletypeid) => {
      if (roletypeid) {
        this.clearRightsForm();
        this.userRoleService.getPermissions(this.accountId, roletypeid)
          .subscribe((res: any) => {
            if (!res.error) this.buildRights(res?.data?.roles?.rights);
          });
      }
    });
  }

  ngOnDestroy() {
    this.userRoleService.resetSelectedRole();
  }

  loadStoreData() {
    this.store.select(getRoles).subscribe(roles => {
      // remove owner, because for one account there is only one owner.
      if (roles && roles.length) this.defaultRoles = roles.slice(1, roles.length);
    });
    this.store.select(getDefaultAccountId).subscribe(accountid => this.accountId = accountid);
  }

  getRoleDeatils(accountroleid: number) {
    this.userRoleService.getRole(accountroleid).subscribe((res: any) => {
      if (!res?.error) this.loadRole(res?.data);
    },
    (err: any) =>{
      this.router.navigate([ROUTE_CONFIGS.ROLES]);
    });
  }

  loadRole(data: Irole) {
    this.selectedRoleInfo = { ...data, isCustom: data.isdefaultrole === 0 };
    if (this.accountId) {
      // update form
      if (this.isEdit) this.updateForm();

      // remove extra api call bcz we already update form
      // on form value chage it will get call
      if (!this.isEdit) {
        this.userRoleService.getPermissions(this.accountId, `${data.roletypeid}`)
          .subscribe((res: any) => {
            if (!res.error) {
              this.buildRights(res?.data?.roles?.rights);
              this.rightsArray.disable();
            }
          });
      }
    }
  }

  initForm() {
    this.roleForm = this.fb.group({
      roleType: ['', [Validators.required]],
      roleName: [
        '', 
        [
          Validators.required,
          Validators.minLength(ValidationConstants.newRoleNameStrategy.ROLE_MIN_LENGTH),
          Validators.maxLength(ValidationConstants.newRoleNameStrategy.ROLE_MAX_LENGTH)
        ],
      ],
      rights: this.fb.array([]),
    });
  }

  enableEdit() {
    if (this.selectedRoleInfo?.isCustom) {
      this.router.navigate([ROUTE_CONFIGS.EDIT_ROLE, this.selectedRoleInfo?.accountroleid]);
    }
  }

  updateForm() {
    // update form
    this.roleForm.patchValue({
      roleType: this.selectedRoleInfo?.roletypeid,
      roleName: this.selectedRoleInfo?.name
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
    if (this.roleForm.disabled) return;

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
    if (this.roleForm.disabled) return;

    const isLvl3StatusOn: boolean = this.getLvl3Array(rightIndex, lvl2Index).controls[lvl3Index].get('isOn')?.value;

    if (!isLvl3StatusOn) {
      this.rightsArray.controls[rightIndex].get('isOn')?.setValue(true);
      this.getLvl2Array(rightIndex).controls[lvl2Index].get('isOn')?.setValue(true);
    }
  }

  onToggleLvl2(rightIndex: number, lvl2Index: number) {
    if (this.roleForm.disabled) return;

    const isLvl2StatusOn: boolean = this.getLvl2Array(rightIndex).controls[lvl2Index].get('isOn')?.value;

    if (!isLvl2StatusOn) {
      this.rightsArray.controls[rightIndex].get('isOn')?.setValue(true);
    }
  }

  toggleLvl3(rightIndex: number, lvl2Index: number, status: boolean) {
    if (this.roleForm.disabled) return;

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

    // role create
    const payload: any = {
      roletypeid: value.roleType,
      rolename: value.roleName
    }

    // permisssion update 
    const payload2 = {
      roletypeid: value.roleType,
      rights
    }

    // for update add accountroleid
    if (this.isEdit) payload['accountroleid'] = this.selectedRoleInfo?.accountroleid;

    this.isLoading = true;

    // new role create
    if (!this.isEdit) {
      this.userRoleService.saveRole(payload, this.accountId).subscribe((res: any) => {
        if (!res?.error)
          this.updatePermission(payload2);

        this.snackbarService.open(res?.message, this.ln.TXT_OK);
        this.isLoading = false;
      }, (err) => this.isLoading = false);
    } else {
      // update role
      this.userRoleService.updateRole(payload).subscribe((res: any) => {
        if (!res?.error)
          this.updatePermission(payload2);

        this.snackbarService.open(res?.message, this.ln.TXT_OK);
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
}
