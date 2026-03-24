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
      fontSize: '24px',
      fontWeight: 'bold',
      fontFamily: 'monospace',
      minWidth: '120px',
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
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      padding: '16px',
      backgroundColor: '#f5f5f5',
      borderBottom: '1px solid #ddd',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      zIndex: 1000
    }}>

      {/* Max Time Input */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '30px', marginLeft: '20px' }}>
        <button 
          onClick={decreaseMaxTime}
          style={{ 
            padding: '4px 8px', 
            cursor: 'pointer',
            backgroundColor: '#e40f0f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '16px',
            minWidth: '30px'
          }}
        >
          -
        </button>
        <input
          type="number"
          value={maxTime}
          onChange={(e) => handleMaxTimeChange(e.target.value)}
          style={{
            width: '60px',
            padding: '4px 8px',
            textAlign: 'center',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
          min="10"
          step="10"
        />
        <button 
          onClick={increaseMaxTime}
          style={{ 
            padding: '4px 8px', 
            cursor: 'pointer',
            backgroundColor: '#324ff5',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '16px',
            minWidth: '30px'
          }}
        >
          +
        </button>
      </div>

      <div style={getTimerStyle()}>
        {formatTime(seconds)}
      </div>
      

      <button onClick={handleStart} style={{ 
        padding: '8px 16px', 
        cursor: 'pointer',
        backgroundColor: '#324ff5',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontWeight: 'bold'
      }}>
        Start
      </button>
      <button onClick={handleStop} style={{ 
        padding: '8px 16px', 
        cursor: 'pointer',
        backgroundColor: '#e40f0f',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontWeight: 'bold'
      }}>
        Stop
      </button>
      <button onClick={handleReset} style={{ 
        padding: '8px 16px', 
        cursor: 'pointer',
        backgroundColor: '#818585',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontWeight: 'bold'
      }}>
        Reset
      </button>
    </div>
  );
}
