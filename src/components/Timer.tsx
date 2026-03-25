import { useState, useEffect } from 'react';

const DEFAULT_MAX_TIME = 90; // Default maximum timer duration in seconds

export function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [maxTime, setMaxTime] = useState(DEFAULT_MAX_TIME);

  useEffect(() => {
    let interval: number;
    if (isRunning && seconds < maxTime) {
      interval = setInterval(() => {
        setSeconds(s => {
          const newSeconds = s + 1;
          return newSeconds >= maxTime ? maxTime : newSeconds;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds, maxTime]);

  // Handle blinking for last 10 seconds
  useEffect(() => {
    if (seconds >= maxTime - 10) { // Start blinking at maxTime - 10 seconds
      const blinkInterval = setInterval(() => {
        setIsBlinking(prev => !prev);
      }, 500); // Blink every 500ms
      return () => clearInterval(blinkInterval);
    } else {
      setIsBlinking(false);
    }
  }, [seconds, maxTime]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (seconds >= maxTime - 10) return 'red'; // Last 10 seconds: red and blinking
    if (seconds >= maxTime - 30) return 'orange'; // Last 30 seconds: orange
    // if (seconds >= maxTime - 60) return '#8B4513'; // Last 60 seconds: brown
    return 'green'; // Default: green
  };

  const getTimerStyle = () => {
    const baseStyle = {
      fontSize: 'clamp(18px, 5vw, 24px)',
      fontWeight: 'bold',
      fontFamily: 'monospace',
      minWidth: 'clamp(100px, 20vw, 120px)',
      color: getTimerColor(),
      transition: 'color 0.3s ease'
    };

    if (isBlinking && seconds >= maxTime - 10) {
      return {
        ...baseStyle,
        opacity: 0.3
      };
    }

    return baseStyle;
  };

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setIsBlinking(false);
  };

  const handleMaxTimeChange = (value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      setMaxTime(numValue);
      // Reset timer if current time exceeds new max
      if (seconds >= numValue) {
        setSeconds(0);
        setIsRunning(false);
        setIsBlinking(false);
      }
    }
  };

  const increaseMaxTime = () => {
    setMaxTime(prev => prev + 10);
  };

  const decreaseMaxTime = () => {
    if (maxTime > 10) {
      setMaxTime(prev => prev - 10);
    }
  };

  return (
    <div style={{
      width: '100%',
      padding: 'clamp(8px, 2vh, 16px)',
      backgroundColor: '#f5f5f5',
      borderBottom: '1px solid #ddd',
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(10px, 4vw, 20px)',
      justifyContent: 'space-between',
      flexWrap: 'wrap'
    }}>

      {/* Max Time Input */}
      <div style={{ marginRight: 'clamp(10px, 4vw, 30px)', display: 'flex', alignItems: 'center', gap: 'clamp(4px, 1vw, 8px)' }}>
        <button 
          onClick={decreaseMaxTime}
          style={{ 
            padding: 'clamp(4px, 1vh, 8px) clamp(6px, 2vw, 12px)', 
            cursor: 'pointer',
            backgroundColor: '#e40f0f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: 'clamp(14px, 3vw, 16px)',
            minWidth: 'clamp(25px, 5vw, 30px)'
          }}
        >
          -
        </button>
        <input
          type="number"
          value={maxTime}
          onChange={(e) => handleMaxTimeChange(e.target.value)}
          style={{
            width: 'clamp(50px, 10vw, 60px)',
            padding: 'clamp(4px, 1vh, 8px) clamp(6px, 2vw, 12px)',
            textAlign: 'center',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: 'clamp(12px, 3vw, 14px)',
            fontWeight: 'bold'
          }}
          min="10"
          step="10"
        />
        <button 
          onClick={increaseMaxTime}
          style={{ 
            padding: 'clamp(4px, 1vh, 8px) clamp(6px, 2vw, 12px)', 
            cursor: 'pointer',
            backgroundColor: '#324ff5',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: 'clamp(14px, 3vw, 16px)',
            minWidth: 'clamp(25px, 5vw, 30px)'
          }}
        >
          +
        </button>
      </div>
        <div style={getTimerStyle()}>
          {formatTime(seconds)}
        </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 12px)', flexShrink: 0 }}>
        <button onClick={handleStart} style={{ 
          padding: 'clamp(6px, 1.5vh, 8px) clamp(12px, 3vw, 16px)', 
          cursor: 'pointer',
          backgroundColor: '#324ff5',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
          fontSize: 'clamp(14px, 3vw, 16px)'
        }}>
          Start
        </button>
        <button onClick={handleStop} style={{ 
          padding: 'clamp(6px, 1.5vh, 8px) clamp(12px, 3vw, 16px)', 
          cursor: 'pointer',
          backgroundColor: '#e40f0f',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
          fontSize: 'clamp(14px, 3vw, 16px)'
        }}>
          Stop
        </button>
        <button onClick={handleReset} style={{ 
          padding: 'clamp(6px, 1.5vh, 8px) clamp(12px, 3vw, 16px)', 
          cursor: 'pointer',
          backgroundColor: '#818585',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
          fontSize: 'clamp(14px, 3vw, 16px)'
        }}>
          Reset
        </button>
      </div>
    </div>
  );
}
