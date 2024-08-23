import React from 'react';
import styles from './index.module.css';

interface ButtonProps {
  disabled?: boolean;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  clickHandler?: () => any;
}

const Button = (props: ButtonProps): JSX.Element => {
  const { disabled, children, variant, clickHandler } = props;

  const renderContent = (chilren: React.ReactNode) => {
    if(disabled) {
      return (
        <span className={styles.span}>
          {children}
        </span>
      );
    } else {
      return (
        <span className={styles.span} onClick={clickHandler}>
          {children}
        </span>
      );
    }
  };

  return (
    <div 
      className={[
        styles.root,
        disabled ? styles.disabled : "",
        styles[variant || 'default']
      ].join(' ')}
    >
      {renderContent(children)}
    </div>
  );
}

export default Button;