import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SnackBarService } from '../../utility/services/snack-bar.service';
import { State } from '../../utility/store/reducers';
import { getDefaultAccountId } from '../../utility/store/selectors/account.selector';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'tr-organisation-profile',
  templateUrl: './organisation-profile.component.html',
  styleUrls: ['./organisation-profile.component.scss']
})
export class OrganisationProfileComponent implements OnInit, OnChanges {

  accountId!: string;
  orgProfileForm!: FormGroup;
  shortNameValidation = new Subject();
  resMessage: string = "";
  currentShortName!: string;

  // List
  countries: { name: string, iso2: string }[] = [];
  states: { name: string, stateCode: string }[] = [];
  cities: { id: number, name: string }[] = [];
  industries: { code: number, name: string }[] = [];

  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private accoutService: AccountService,
    private snackbarServ: SnackBarService,
    private store: Store<State>,
    private cd: ChangeDetectorRef) {
    this.store.select(getDefaultAccountId).subscribe(data => {
      this.accountId = data[0]?.accountid;
      if (this.accountId) {
        this.getAccount();
        this.getCountries();
        this.getIndustryList();
      }
    });
  }

  shortnameValidation!: string;

  ngOnInit(): void {
    this.initForm();
    this.countryid.valueChanges.subscribe(c => { if (c) this.getStates(c) });
    this.stateid.valueChanges.subscribe(s => { if (s) this.getCities(s) });

    this.shortNameValidation
      .pipe(
        debounceTime(300),
        distinctUntilChanged())
      .subscribe(val => {
        // this.resMessage = val.message;
        // console.log(val);
        this.checkShortNameAvailability(val)
        // this.shortname.setErrors({ 'customError': true });
      })
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === "customError" && changes[propName].currentValue) {
        this.shortname.setErrors({ "customError": true });
      }
    }
  }

  initForm() {
    this.orgProfileForm = this.fb.group({
      name: ['', [Validators.required]],
      shortname: ['', [
        Validators.minLength(5),
        Validators.maxLength(15)
      ]],
      domain: [''],
      countryid: ['', [Validators.required]],
      stateid: ['', [Validators.required]],
      cityid: ['', [Validators.required]],
      industryid: ['', [Validators.required]],
      accounttype: ['', [Validators.required]]
    });
  }

  get name(): AbstractControl {
    return this.orgProfileForm.get('name') as FormControl;
  }

  get shortname(): AbstractControl {
    return this.orgProfileForm.get('shortname') as FormControl;
  }

  get domain(): AbstractControl {
    return this.orgProfileForm.get('domain') as FormControl;
  }

  get countryid(): AbstractControl {
    return this.orgProfileForm.get('countryid') as FormControl;
  }

  get stateid(): AbstractControl {
    return this.orgProfileForm.get('stateid') as FormControl;
  }

  get cityid(): AbstractControl {
    return this.orgProfileForm.get('cityid') as FormControl;
  }

  get industryid(): AbstractControl {
    return this.orgProfileForm.get('industryid') as FormControl;
  }

  getAccount() {
    this.accoutService.getAccount(this.accountId).subscribe((res: any) => {

      // shortName Validation
      this.currentShortName = res.data.shortname || "";

      if (res && res?.data) {
        const data = res?.data;
        this.orgProfileForm.patchValue({
          name: data?.name,
          shortname: data?.shortname,
          domain: data?.domain,
          countryid: data?.countryid,
          stateid: data?.stateid,
          cityid: +data?.cityid,
          industryid: data?.industryid,
          accounttype: data?.accounttype
        })
        this.cd.markForCheck()
      }
    });
  }

  getCountries() {
    this.accoutService.getCountryList().subscribe((res: any) => {
      if (res && res?.data) this.countries = res.data;
    });
  }

  getStates(isoCode: string) {
    this.accoutService.getStateList(isoCode).subscribe((res: any) => {
      if (res && res?.data) this.states = res.data?.states;
    });
  }

  getCities(stateCode: string) {
    const isoCode = this.countryid.value;
    this.accoutService.getCityList(isoCode, stateCode).subscribe((res: any) => {
      if (res && res?.data) this.cities = res.data?.cities;
    });
  }

  getIndustryList() {
    this.accoutService.getIndustryList().subscribe((res: any) => {
      if (res && res?.statusCode === 200) {
        this.industries = res.data;
      }
    });
  }


  saveOrgProfile() {
    const { value, invalid } = this.orgProfileForm;
    if (invalid) {
      for (const key in this.orgProfileForm.controls) {
        this.orgProfileForm.get(key)?.markAsTouched();
      }
    }
    const cityname = this.cities.find(c => c.id === value.cityid)?.name;
    const statename = this.states.find(s => s.stateCode === value.stateid)?.name;
    const countryname = this.countries.find(c => c.iso2 === value.countryid)?.name;
    const industryname = this.industries.find(i => i.code === value.industryid)?.name;

    const payload = {
      ...value,
      cityid: `${value.cityid}`,
      cityname,
      stateid: `${value.stateid}`,
      statename,
      countryname,
      industryname
    }

    // if (payload.shortname) delete payload.shortname;
    this.isLoading = true;
    this.accoutService.updateAccount(payload, this.accountId).subscribe((res: any) => {
      if (res?.error) {
        this.snackbarServ.open(res?.message, "Ok");
      } else this.snackbarServ.open('Successfully updated', "Ok");
      this.isLoading = false;
    }, (err) => this.isLoading = false)
  }

  // ShortName Validation
  checkValidity() {
    if (this.shortname.value.length > 4) {
      this.shortNameValidation.next(this.shortname.value);
    }
  }

  checkShortNameAvailability(sName: any) {
    this.isLoading = true;
    this.accoutService.getShortName(sName)
      .subscribe(res => {
        this.isLoading = false;
        if (res.error && sName != this.currentShortName) {
          this.shortname.markAllAsTouched();
          this.resMessage = res.message;
          this.shortname.setErrors({ 'customError': true });
        }

      })
  }

}
