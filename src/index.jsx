import { createRoot } from 'react-dom/client';

const MyFlixApplication = () => {
  return (
    <div className='my-flix'>
      <div>Good morning</div>
    </div>
  );
};

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<MyFlixApplication />);