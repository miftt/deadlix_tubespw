import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface AdTimerProps {
  timeLeft: number;
  duration: number;
}

export default function AdTimer({ timeLeft, duration }: AdTimerProps) {
  const percentage = (timeLeft / duration) * 100;

  return (
    <div className="w-12 h-12">
      <CircularProgressbar
        value={percentage}
        text={`${timeLeft}`}
        styles={buildStyles({
          pathColor: '#dc2626',
          textColor: '#ffffff',
          trailColor: 'rgba(255,255,255,0.2)',
          textSize: '32px',
        })}

      />
    </div>
  );
}