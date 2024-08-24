import styles from './index.module.css';

interface HeaderProps {
  children?: React.ReactNode;
}

const Header = (props: HeaderProps): JSX.Element => {
  const { children } = props;

  return (
    <div className={styles.root}>
      {children}
    </div>
  );
}

export default Header;