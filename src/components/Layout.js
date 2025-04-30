import Link from 'next/link';
import Head from 'next/head';

export default function Layout({ children, title = 'Still Okay' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Still Okay - If We Don't Hear From You, We Worry" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="site-wrapper">
        <nav className="nav">
          <div className="nav-brand">
            <Link href="/" className="logo">
              Still<br />Okay
            </Link>
            <div className="slogan">If We Don't Hear From You, We Worry</div>
          </div>
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/how-it-works">How It Works</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/about">About Us</Link>
          </div>
        </nav>
        <main className="container">
          {children}
        </main>
        <footer className="footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} Still Okay. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
} 