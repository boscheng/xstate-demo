import { Link } from "react-router-dom";
const Home = () => {
  return (
    <section className="max-w-lg mx-auto my-8">
      <h1 className="text-4xl">Home</h1>
      <nav className="text-xl text-blue-600">
        <Link to="/todos">Todos</Link>
        <br />
        <Link to="/base">base</Link>
      </nav>
    </section>
  );
};

export default Home;
