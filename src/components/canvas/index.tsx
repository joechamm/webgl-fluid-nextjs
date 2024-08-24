import React from 'react';
import styles from './index.module.scss';

const Canvas: React.FC = () => {
  return (
    <div className={styles.canvas}>
      <canvas width="512" height="512" />
    </div>
  );
}

export default Canvas;