import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  loginType: 'email' | 'userid' | 'phone' = 'email';
  isOtpSent = false;
  isForgotPassword = false;
  segmentCtrl: FormControl<'email' | 'userid' | 'phone'> = new FormControl('email', { nonNullable: true });

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.initializeForm();

    // React to segment changes
    this.segmentCtrl.valueChanges.subscribe((val) => {
      if (val) {
        this.switchLoginType(val);
      }
    });
  }

  private initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', []],
      userid: ['', []],
      phone: ['', []],
      password: ['', []],
      otp: ['', []]
    });

    // Update validators based on initial login type
    this.updateValidators();
  }

  private updateValidators() {
    // Reset all validators first
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.clearValidators();
      this.loginForm.get(key)?.updateValueAndValidity();
    });

    // Apply validators based on login type
    switch (this.loginType) {
      case 'email':
        this.loginForm.get('email')?.setValidators([Validators.required, Validators.email]);
        this.loginForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
        break;
      case 'userid':
        this.loginForm.get('userid')?.setValidators([Validators.required, Validators.minLength(4)]);
        this.loginForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
        break;
      case 'phone':
        this.loginForm.get('phone')?.setValidators([Validators.required, Validators.pattern('^[0-9]{10}$')]);
        if (this.isOtpSent) {
          this.loginForm.get('otp')?.setValidators([Validators.required, Validators.pattern('^[0-9]{6}$')]);
        }
        break;
    }

    // Update validity
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.updateValueAndValidity();
    });
  }

  ngOnInit() {}

  switchLoginType(type: 'email' | 'userid' | 'phone') {
    this.loginType = type;
    this.isOtpSent = false;
    this.loginForm.reset();
    this.updateValidators();
    this.cdr.detectChanges();
  }

  async sendOtp() {
    if (this.loginForm.get('phone')?.valid) {
      // TODO: Implement actual OTP sending logic here
      console.log('Sending OTP to:', this.loginForm.get('phone')?.value);
      this.isOtpSent = true;
      this.loginForm.get('otp')?.setValue('');
      this.updateValidators(); // Update validators to include OTP field
    }
  }

  verifyOtp() {
    const otpCtrl = this.loginForm.get('otp');
    if (otpCtrl?.valid) {
      // TODO: Implement actual OTP verification here
      console.log('Verifying OTP:', otpCtrl.value);
      // Navigate or mark user as logged in after successful verification
    } else {
      console.warn('Invalid OTP');
    }
  }

  forgotPassword() {
    this.isForgotPassword = true;
  }

  resetPassword() {
    // Implement password reset logic here
    console.log('Reset password for:', this.loginForm.value);
  }

  async login() {
    if (this.loginForm.valid) {
      const loginData = {
        type: this.loginType,
        ...this.loginForm.value
      };
      console.log('Login attempt with:', loginData);
      // TODO: Implement actual login logic here
    }
  }

  submitEnquiry(type: 'enquiry' | 'contact' | 'callback') {
    // Implement enquiry submission logic
    console.log('Submit', type);
  }

  cancelForgotPassword() {
    this.isForgotPassword = false;
    this.loginForm.reset();
  }

  onSegmentChanged(ev: any) {
    const value = ev?.detail?.value as 'email' | 'userid' | 'phone';
    if (value) {
      this.switchLoginType(value);
    }
  }
}
