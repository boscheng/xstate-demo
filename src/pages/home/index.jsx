import { Link } from "react-router-dom";
const Home = () => {
  return (
    <section className="max-w-lg mx-auto my-8">
      <h1 className="text-4xl">Home</h1>
      <nav className="text-xl text-blue-600">
        <br />
        <Link to="/todos">Todos</Link>
        <br />
        <Link to="/base">base</Link>
        <br />
        <Link to="/count">redux demo</Link>
        <br />
        <Link to="/tkcount">toolkit demo</Link>
      </nav>
    </section>
  );
};

export default Home;
