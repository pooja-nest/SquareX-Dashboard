import React from 'react';
import styles from './InfoCard.module.css';

const InfoCard = ({
  title = 'Title',
  body = 'Body',
  date = '',
  showIcon = false,
  showDateAndTime = true,
  state = 'default',
  className = '',
  ...props
}) => {
  const containerClassNames = [
    styles.infoCard,
    styles[`state_${state}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClassNames} {...props}>
      <div className={styles.content}>
        <div className={styles.titleAndIcon}>
          <p className={styles.title}>{title}</p>
          {showIcon && (
            <div className={styles.icon}>
              <div className={styles.iconInner}>
                <img
                  src="/icons/Icon.svg"
                  alt="Info"
                  className={styles.iconImg}
                />
              </div>
            </div>
          )}
        </div>
        <p className={styles.body}>{body}</p>
      </div>
      {showDateAndTime && date && (
        <p className={styles.date}>{date}</p>
      )}
    </div>
  );
};

export default InfoCard;

