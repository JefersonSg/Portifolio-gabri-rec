import React from 'react';
import { motion } from 'framer-motion';
import styles from './PlayerVideo.module.css';

type PlayerVideoProps = {
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  videoSrc: string;
  videoTitle: string;
  videoDescription: string;
};

const PlayerVideo = ({
  setPlay,
  videoSrc,
  videoTitle,
  videoDescription
}: PlayerVideoProps) => {
  return (
    <motion.div
      className={styles.videoOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      <motion.div
        className={styles.videoModal}
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 18 }}
        transition={{
          duration: 0.38,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <motion.button
          className={styles.closeButton}
          onClick={() => setPlay(false)}
          type="button"
          aria-label="Fechar vídeo"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.08, duration: 0.2 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          ✕
        </motion.button>

        <motion.div
          className={styles.videoContainer}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <video
            className={styles.videoPlayer}
            controls
            autoPlay
            muted
            playsInline
            src={'/videos/video.mp4'}
          >
            <source src={videoSrc} type="video/mp4" />
            Seu navegador não suporta vídeo.
          </video>
        </motion.div>

        <motion.div
          className={styles.videoInfo}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ delay: 0.16, duration: 0.3 }}
        >
          <motion.span
            className={styles.videoTag}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ delay: 0.22, duration: 0.22 }}
          >
            {videoTitle}
          </motion.span>

          <motion.h3
            className={styles.videoTitle}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ delay: 0.26, duration: 0.24 }}
          >
            Cobertura cinematográfica
          </motion.h3>

          <motion.p
            className={styles.videoText}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ delay: 0.3, duration: 0.24 }}
          >
            {videoDescription}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PlayerVideo;
