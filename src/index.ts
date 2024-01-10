
import { styled } from './styled';

const App = styled('div')({
  color: 'blue',
  fontSize: '18px',
  padding: '20px',
  border: '1px solid #ccc',
});

const Heading = styled('h1')({
  color: 'green',
  fontSize: '24px',
  margin: '0',
});

const Button = styled('button')({
  backgroundColor: 'orange',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  cursor: 'pointer',
});
const DynamicButton = styled('button')((props: { primary?: boolean }) => ({
  backgroundColor: props.primary ? 'blue' : 'orange',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  cursor: 'pointer',
}));

const root = document.getElementById('root');

if (root) {
  const heading = Heading({style: {}}, ['Styled Components Heading']);
  const button = Button(
    {
      style: {
      },
      onClick: () => {
        heading.style.color = getRandomColor();
      }
    },
    ['Click me']
  )
  const dynamicButton = DynamicButton(
    {
      style: {
      },
      onClick: () => {
        heading.style.color = getRandomColor();
      },
      primary: true
    },
    ['Click me']
    
  )
  const appElement = App({ className: 'app' }, [heading, button, dynamicButton
  ]);

  root.appendChild(appElement);
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i=0; i<6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
