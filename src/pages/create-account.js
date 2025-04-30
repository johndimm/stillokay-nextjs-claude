import Link from 'next/link';
import styles from '@/styles/CreateAccount.module.css';

export default function CreateAccount() {
  return (
    <div className={styles.createAccount}>
      <h1 className={styles.title}>Create Account</h1>
      
      <div className={styles.optionsContainer}>
        <div className={styles.option}>
          <h2>Create an account and begin your own subscription today!</h2>
          <p>Get 30 days of free check-in service.</p>
          <Link href="/create-subscription" className={styles.button}>
            Set Up Your Subscription Now
          </Link>
        </div>
        
        <div className={styles.divider}>
          <span>-or-</span>
        </div>
        
        <div className={styles.option}>
          <h2>Create an account and purchase a subscription for someone else!</h2>
          <p>Get 30 days free on the gift subscription.</p>
          <Link href="/create-subscription?type=gift" className={styles.button}>
            Enter Your Subscriber's Information Now
          </Link>
        </div>
      </div>
    </div>
  );
} 