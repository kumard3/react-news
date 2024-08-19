import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className=" ">
      <div className="container mx-auto px-4 py-3 flex flex-col items-center justify-between">
        <Link to="/">
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="3" y1="15" x2="21" y2="15"></line>
              <line x1="9" y1="9" x2="9" y2="21"></line>
            </svg>
            <h1>News Aggregator</h1>
          </div>
        </Link>
        <Link to={"/search"}>Search</Link>
        {/* <nav>
          <ul className="flex space-x-4">
            <li>
              <Button variant="link" className="">
                Home
              </Button>
            </li>
            <li>
              <Button variant="link" className="">
                News
              </Button>
            </li>
            <li>
              <Button variant="link" className="">
                Sport
              </Button>
            </li>
            <li>
              <Button variant="link" className="">
                Reel
              </Button>
            </li>
            <li>
              <Button variant="link" className="">
                Worklife
              </Button>
            </li>
            <li>
              <Button variant="link" className="">
                Travel
              </Button>
            </li>
            <li>
              <Button variant="link" className="">
                Future
              </Button>
            </li>
          </ul>
        </nav> */}
      </div>
    </header>
  );
};

export default Header;
