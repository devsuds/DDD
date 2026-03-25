import { Tldraw } from 'tldraw';
import { MainBoard } from './mainBoard';
import { Timer } from './components/Timer';
import 'tldraw/tldraw.css';
import './App.css';

export default function App() {
  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column' }}>
      <Timer />
      <div style={{ flex: 1, width: '100%', height: '100%' }}>
        <Tldraw autoFocus={false}>
          <MainBoard />
        </Tldraw>
      </div>
    </div>
  );
}