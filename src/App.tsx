import { Tldraw } from 'tldraw';
import { MainBoard } from './mainBoard';
import { Timer } from './components/Timer';
import 'tldraw/tldraw.css';
import './App.css';

export default function App() {
  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Timer />
      <div style={{ position: 'absolute', top: '80px', left: 0, right: 0, bottom: 0 }}>
        <Tldraw autoFocus={false}>
          <MainBoard />
        </Tldraw>
      </div>
    </div>
  );
}