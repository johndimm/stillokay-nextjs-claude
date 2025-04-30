import Link from 'next/link';
import { useState } from 'react';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', { username, password });
  };

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Still Okay<sup>TM</sup> makes sure that someone finds out if you're not okay.</h1>
          <p>
            Once you subscribe to our service, you'll check in every day at a time that's convenient for you.
            If you just forgot your daily check in, you'll easily be able to prevent further action.
            If you're not able to check in for some reason, we start notifying your contacts that there might be something wrong.
          </p>
          <p>
            Our service was created for those who live alone or have an irregular schedule (like college students).
            You can purchase a subscription for yourself or as a gift for someone you care about.
          </p>
        </div>
        <div className={styles.heroActions}>
          <div className={styles.loginCard}>
            <h2>Daily Check-in</h2>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
              <div className={styles.formGroup}>
                <input 
                  type="text" 
                  id="username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.formControl}
                  placeholder="Username"
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <input 
                  type="password" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.formControl}
                  placeholder="Password"
                  required 
                />
              </div>
              <button type="submit" className={styles.button}>Log In</button>
            </form>
          </div>
          <div className={styles.ctaButtons}>
            <Link href="/create-account" className={styles.cta}>
              Create Account
            </Link>
            <Link href="/manage-account" className={styles.cta}>
              Manage Account
            </Link>
          </div>
          <div className={styles.promoTag}>
            30 Day Free Trial!
          </div>
        </div>
      </section>
    </div>
  );
}
