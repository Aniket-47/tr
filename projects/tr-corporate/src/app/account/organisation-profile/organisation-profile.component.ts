import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fadeAnimation } from '../../animations';
import { SnackBarService } from '../../utility/services/snack-bar.service';
import { setAccountDeatils } from '../../utility/store/actions/account.action';
import { State } from '../../utility/store/reducers';
import { getAccountDeatils, getDefaultAccountId } from '../../utility/store/selectors/account.selector';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'tr-organisation-profile',
  templateUrl: './organisation-profile.component.html',
  styleUrls: ['./organisation-profile.component.scss'],
  animations: [fadeAnimation]
})
export class OrganisationProfileComponent implements OnInit, OnChanges {

  accountId!: string;
  orgProfileForm!: FormGroup;
  shortNameValidation = new Subject();
  resShortMessage: string = "";
  currentShortName!: string;

  shortnameValidation!: string;

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
    private store: Store<State>) {
    this.initForm();
    this.store.select(getDefaultAccountId).subscribe(accountid => {
      this.accountId = accountid;
      if (this.accountId) {
        this.getCountries();
        this.getIndustryList();
      }
    });
  }

  ngOnInit(): void {
    this.countryid.valueChanges.subscribe(c => {
      console.log(c)
      if (c) this.getStates(c);
    });
    this.stateid.valueChanges.subscribe(s => {
      if (s) this.getCities(s);
    });

    this.shortNameValidation
      .pipe(
        debounceTime(300),
        distinctUntilChanged())
      .subscribe(val => {
        this.checkShortNameAvailability(val)
        // this.shortname.setErrors({ 'customError': true });
      });

    this.loadAccountDeatails();
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

  loadAccountDeatails() {
    this.store.select(getAccountDeatils).subscribe(account => {
      if (account) {
        // shortName Validation
        this.currentShortName = account.shortname || "";

        this.orgProfileForm.patchValue({
          name: account?.name,
          shortname: account?.shortname,
          domain: account?.domain,
          countryid: account?.countryid,
          stateid: account?.stateid,
          cityid: +account?.cityid,
          industryid: account?.industryid,
          accounttype: account?.accounttype
        });
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
      return;
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

    if (this.shortname.value === this.currentShortName)
      delete payload.shortname;

    // if (payload.shortname) delete payload.shortname;
    this.isLoading = true;
    this.accoutService.updateAccount(payload, this.accountId).subscribe((res: any) => {
      if (res?.error) {
        this.snackbarServ.open(res?.message, "Ok");
      } else {
        // update store
        this.store.dispatch(setAccountDeatils({ data: payload }));
        this.snackbarServ.open('Successfully updated', "Ok");
        // this.orgProfileForm.reset();
      }
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
    this.resShortMessage = '';
    this.accoutService.getShortName(sName)
      .subscribe(res => {
        this.isLoading = false;
        if (res.error && sName != this.currentShortName) {
          this.resShortMessage = res.message;
          this.shortname.markAllAsTouched();
          this.shortname.setErrors({ 'customError': true });
        }
        else {
          this.resShortMessage = "Shortname Available"
        }

      })
  }

  resetHandler() {
    // this.orgProfileForm.reset();
    this.loadAccountDeatails();
    this.resShortMessage = ''
  }

}
