import type { AppProps } from 'next/app';
import { SITE_CONFIG } from '../config/constants';
import { FolderStructure } from '../types/folder';
import '../styles/globals.css';

interface CustomAppProps extends AppProps {
  pageProps: {
    folderStructure?: FolderStructure[];
  } & AppProps['pageProps'];
}

export default function App({ Component, pageProps }: CustomAppProps) {
  return (
    <div className="main">
      <Component {...pageProps} />
      <footer className="footer">
        © {new Date().getFullYear()} {SITE_CONFIG.author}.{' '}
        Todos os direitos reservados.
      </footer>
    </div>
  );
}
