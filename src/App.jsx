import React, { useState, useEffect } from 'react';

const app = ()=> {
  const [targetDate, setTargetDate] = useState('');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval;
    if (timerActive && targetDate) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        const countDownDate = new Date(targetDate).getTime();
        const distance = countDownDate - now;

        if (distance <= 0) {
          clearInterval(interval);
          setTimerActive(false);
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        } else {
          setTimeLeft({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [targetDate, timerActive]);

  const handleDateChange = (e) => {
    setTargetDate(e.target.value);
    setTimerActive(true);
  };

  const handleReset = () => {
    setTargetDate('');
    setTimerActive(false);
    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-6 text-white">
      <h1 className="text-4xl font-bold mb-6">Countdown Timer</h1>

      <input
        type="datetime-local"
        className="text-black p-2 rounded mb-4 shadow"
        onChange={handleDateChange}
        value={targetDate}
      />

      <div className="grid grid-cols-4 gap-4 text-center text-2xl font-semibold mb-6">
        <div>
          <p>{timeLeft.days}</p>
          <span className="text-sm">Days</span>
        </div>
        <div>
          <p>{timeLeft.hours}</p>
          <span className="text-sm">Hours</span>
        </div>
        <div>
          <p>{timeLeft.minutes}</p>
          <span className="text-sm">Minutes</span>
        </div>
        <div>
          <p>{timeLeft.seconds}</p>
          <span className="text-sm">Seconds</span>
        </div>
      </div>

      <button
        onClick={handleReset}
        className="bg-white text-indigo-600 font-bold py-2 px-4 rounded hover:bg-gray-200 transition"
      >
        Reset
      </button>
    </div>
  );
}

export default app
