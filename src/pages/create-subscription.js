import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/styles/CreateSubscription.module.css';

export default function CreateSubscription() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    username: '',
    password: '',
    address: '',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    checkInStartTime: '09:00',
    checkInEndTime: '13:00',
    excludedDays: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    const startTime = name === 'checkInStartTime' ? value : formData.checkInStartTime;
    
    // Calculate end time (4 hours later)
    if (name === 'checkInStartTime') {
      const [hours, minutes] = value.split(':').map(Number);
      const endHours = (hours + 4) % 24;
      const endTime = `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      
      setFormData(prev => ({
        ...prev,
        [name]: value,
        checkInEndTime: endTime
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Submit the form data to the API
      console.log('Form data submitted:', formData);
      router.push('/subscription-success');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Render the appropriate step form
  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <>
            <h2>Create Subscription</h2>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={styles.formControl}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={styles.formControl}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={styles.formControl}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.formControl}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={styles.formControl}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.formControl}
                minLength="8"
                required
              />
            </div>
            <div className={styles.formFooter}>
              <Link href="/" className={styles.secondaryButton}>
                Cancel
              </Link>
              <button type="submit" className={styles.button}>Continue</button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2>Choose Your Check-in Time</h2>
            <div className={styles.formGroup}>
              <label>
                Is This Your Check-in Time Zone?
                <div className={styles.timeZoneBox}>
                  {formData.timeZone}
                </div>
              </label>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="checkInStartTime">Choose Your Four-Hour Check-in Time Window</label>
              <div className={styles.timeSelectionContainer}>
                <div>
                  <label htmlFor="checkInStartTime">Start Check-in Time Window</label>
                  <input
                    type="time"
                    id="checkInStartTime"
                    name="checkInStartTime"
                    value={formData.checkInStartTime}
                    onChange={handleTimeChange}
                    className={styles.formControl}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="checkInEndTime">End Check-in Time Window</label>
                  <input
                    type="time"
                    id="checkInEndTime"
                    name="checkInEndTime"
                    value={formData.checkInEndTime}
                    onChange={handleChange}
                    className={styles.formControl}
                    readOnly
                  />
                </div>
              </div>
              <div className={styles.tooltip}>
                <span>What Is This?</span>
                <div className={styles.tooltipText}>
                  Your check-in time window is the four-hour time period when you check in each day
                </div>
              </div>
              <p className={styles.note}>End calculated automatically +4 hours from start time</p>
            </div>
            <div className={styles.formFooter}>
              <button type="button" onClick={handleBack} className={styles.secondaryButton}>
                Back
              </button>
              <button type="submit" className={styles.button}>Continue</button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2>Excluded Days</h2>
            <div className={styles.formGroup}>
              <label>Specify the days (if any) you do NOT want to check in.</label>
              <p className={styles.note}>Note: You can specify these later.</p>
              <div className={styles.daysSelection}>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <label key={day} className={styles.dayCheckbox}>
                    <input 
                      type="checkbox" 
                      name={day}
                      onChange={(e) => {
                        const newExcludedDays = e.target.checked 
                          ? [...formData.excludedDays, day]
                          : formData.excludedDays.filter(d => d !== day);
                        setFormData(prev => ({ ...prev, excludedDays: newExcludedDays }));
                      }}
                      checked={formData.excludedDays.includes(day)}
                    />
                    {day}
                  </label>
                ))}
              </div>
            </div>
            <div className={styles.formFooter}>
              <button type="button" onClick={handleBack} className={styles.secondaryButton}>
                Back
              </button>
              <button type="submit" className={styles.button}>Continue</button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.createSubscription}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.stepIndicator}>
            <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>1</div>
            <div className={styles.stepLine}></div>
            <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>2</div>
            <div className={styles.stepLine}></div>
            <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>3</div>
            <div className={styles.stepLine}></div>
            <div className={`${styles.step} ${step >= 4 ? styles.active : ''}`}>4</div>
            <div className={styles.stepLine}></div>
            <div className={`${styles.step} ${step >= 5 ? styles.active : ''}`}>5</div>
          </div>
          {renderStep()}
        </form>
      </div>
    </div>
  );
} 