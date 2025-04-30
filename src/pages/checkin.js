import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/CheckIn.module.css';

export default function CheckIn() {
  const router = useRouter();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [comment, setComment] = useState('');
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleCheckIn = async () => {
    try {
      // In a real application, make an API call to record the check-in
      console.log('Check-in recorded with comment:', comment);
      
      // Simulate successful check-in
      setIsCheckedIn(true);
      
      // Reset comment field
      setComment('');
      
      // In a real app, redirect to a dashboard or show a success message
    } catch (error) {
      console.error('Error recording check-in:', error);
    }
  };

  return (
    <div className={styles.checkInPage}>
      <div className={styles.checkInContainer}>
        <h1 className={styles.title}>Check In - {formattedDate}</h1>
        
        {!isCheckedIn ? (
          <div className={styles.checkInForm}>
            <p className={styles.instructions}>
              Let us know you're okay by clicking the button below. 
              You can also leave an optional comment.
            </p>
            
            <div className={styles.formGroup}>
              <label htmlFor="comment">Daily WordPress Blog Entry</label>
              <textarea
                id="comment"
                className={styles.commentArea}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was your day? (Optional)"
                rows={4}
              />
            </div>
            
            <button 
              className={styles.checkInButton}
              onClick={handleCheckIn}
            >
              Still Okay
            </button>
          </div>
        ) : (
          <div className={styles.successMessage}>
            <div className={styles.checkmark}>✓</div>
            <h2>You've successfully checked in for today!</h2>
            <p>Your contacts won't be notified. Come back tomorrow for your next check-in.</p>
            
            <div className={styles.actions}>
              <button 
                className={styles.manageButton}
                onClick={() => router.push('/manage-account')}
              >
                Manage Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 