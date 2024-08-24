import Header from '@/components/header';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = (props: LayoutProps): JSX.Element => {
  const { children } = props;

  return (
    <div>
      <Header>
        <h1>Fluid Simulation</h1>
      </Header>
      <main className='layout-grid'>
        {children}
      </main>
    </div>
  );
};