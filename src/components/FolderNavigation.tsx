import Link from 'next/link';
import { useRouter } from 'next/router';

interface FolderNavigationProps {
  folders: string[];
}

export default function FolderNavigation({ folders }: FolderNavigationProps) {
  const router = useRouter();
  const currentFolder = router.query.folder as string;

  return (
    <nav className="folder-nav">
      <Link 
        href="/" 
        className={!currentFolder ? 'active' : ''}
      >
        Todos
      </Link>
      {folders.map(folder => (
        <Link
          key={folder}
          href={`/folder/${folder}`}
          className={currentFolder === folder ? 'active' : ''}
        >
          {folder.split('/').join(' > ')}
        </Link>
      ))}
    </nav>
  );
}
