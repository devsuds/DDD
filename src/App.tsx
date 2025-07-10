import { Tldraw } from 'tldraw';
import { MainBoard } from './mainBoard';
import 'tldraw/tldraw.css';
import './App.css';

export default function App() {
  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw autoFocus={false}>
        <MainBoard />
      </Tldraw>
    </div>
  );
}