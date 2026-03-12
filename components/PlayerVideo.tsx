import React from 'react';
import styles from './PlayerVideo.module.css';

const PlayerVideo = ({
  setPlay
}: {
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className={styles.videoOverlay}>
      <div className={styles.videoModal}>
        <button
          className={styles.closeButton}
          onClick={() => setPlay(false)}
          type="button"
          aria-label="Fechar vídeo"
        >
          ✕
        </button>

        <div className={styles.videoContainer}>
          <video
            className={styles.videoPlayer}
            controls
            autoPlay
            muted
            playsInline
          >
            <source src="/videos/video.mp4" type="video/mp4" />
            Seu navegador não suporta vídeo.
          </video>
        </div>

        <div className={styles.videoInfo}>
          <span className={styles.videoTag}>Gabri Rec</span>
          <h3 className={styles.videoTitle}>Cobertura cinematográfica</h3>
          <p className={styles.videoText}>
            Reviva cada detalhe com uma apresentação visual elegante, imersiva e
            profissional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerVideo;
