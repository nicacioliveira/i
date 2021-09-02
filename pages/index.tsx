import type { NextPage } from 'next'
import Head from 'next/head'
import { SocialIcon } from 'react-social-icons'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>NO</title>
        <meta name="description" content="Nicácio Oliveira. Software Engineer Personal Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://nicacio.dev">Nicácio Oliveira</a>
        </h1>

        <p className={styles.description}>
          <h2>Software engineer</h2>
          <h3>Bachelor in Computer Science for <a href="https://portal.ufcg.edu.br/" target="_blank" rel="noopener noreferrer">UFCG</a></h3>
          I am currently a software engineer at <a href="https://vtex.com/" target="_blank" rel="noopener noreferrer">Vtex</a>, more precisely Mentor of the <a href="https://lab.vtex.com/home/" target="_blank" rel="noopener noreferrer">VtexLab project</a>
        </p>


        <div title="nicacio oliveira social network" role="contentinfo">
          <SocialIcon
            url="https://www.linkedin.com/in/nicacioliveira/"
          />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://nicacio.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Nicácio O.
        </a>
        <br />
        <address>
          <a
            href="mailto:nicacio.sousa@vtex.com.br"
          >
            Vtex pro. mail
          </a>
          <a
            href="mailto:nnicacio@gmail.com"
          >
            Personal mail
          </a>
        </address>
      </footer>
    </div>
  )
}

export default Home
