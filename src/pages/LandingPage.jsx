import React from 'react'
import styles from './LandingPage.module.css'
import { Link } from 'react-router-dom'
import FormBotLogo from '../assets/SVG.png'

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_content}>
            <div className={styles.logo}>
                <Link to={"/"}>{ <img src={FormBotLogo} alt="FormBot" /> }FormBot</Link>
            </div>
            <nav>
                <Link to="/signin">Sign in</Link>
                <Link to="/signin">Create a FormBot</Link>
            </nav>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section_1}></div>
        <div className={styles.section_2}></div>
      </div>
      <div className={styles.footer}></div>
    </div>
  )
}
