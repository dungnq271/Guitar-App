import { Link } from "react-router";
import type { Route } from "./+types/index";
import { fetchGuitars } from "../utils/apis";
import "./index.css";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const guitars = await fetchGuitars();
  return { guitars, userId: params.userId };
}

export default function Guitars({ loaderData }: Route.ComponentProps) {
  const { guitars } = loaderData;

  return (
    <div id="index-page">
      <main>
        <h1 id="title">Featured Guitars</h1>
        <div id="content-container">
          {guitars.map((guitar) => (
            <div key={guitar.id} id="content-item">
              <Link to={`/guitars/${guitar.id.toString()}`}>
                <div id="panel">
                  <div id="img-grid">
                    <img
                      src={guitar.image}
                      alt={guitar.name}
                      className="guitar-image"
                    />
                    <div id="lining"></div>
                  </div>
                  <div id="action">View Details</div>
                </div>
                <div id="details">
                  <h2 id="name">{guitar.name}</h2>
                  <p id="short-description">{guitar.shortDescription}</p>
                  <div id="price">${guitar.price}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
