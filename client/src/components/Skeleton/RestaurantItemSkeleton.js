import React from 'react';
import classNames from 'classnames';
import styles from './skeleton.module.scss';

const Skeleton = () => {
  return (
    // <Box sx={flexCenter}>
    //   <Card sx={card}>
    //     <Box sx={{ ...imageSkeleton, ...loading }} />
    //     <Box sx={{ ...chipsTitleRatingSkeleton, ...loading }} />
    //     <Box sx={{ ...chipsTitleRatingSkeleton, ...loading }} />
    //     <Box sx={{ ...chipsTitleRatingSkeleton, ...loading }} />
    //   </Card>
    // </Box>
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={classNames(styles.imageSkeleton, styles.loading)} />
        <div className={classNames(styles.chipsTitleRatingSkeleton, styles.loading)} />
        <div className={classNames(styles.chipsTitleRatingSkeleton, styles.loading)} />
        <div className={classNames(styles.chipsTitleRatingSkeleton, styles.loading)} />
      </div>
    </div>
  );
};

export default Skeleton;
