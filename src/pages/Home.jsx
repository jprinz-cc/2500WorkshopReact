import '../App.css';
import Card from '../components/Card';

function Home() {

    return (
        <>
        <h1>Hello React</h1>
        <div className='container'>
          <Card title="Product 1" description="This is cool" />
          <Card title="Product 2" description="This is better" />
          <Card title="Product 3" description="This is the Best!" />
        </div>
        </>
    );

}

export default Home;