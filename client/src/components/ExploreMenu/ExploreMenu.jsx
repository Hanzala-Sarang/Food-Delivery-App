import { menu_list } from "../../assets/frontend_assets/assets";
import "./ExploreMenu.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ExploreMenu = ({ category, setCategory }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Explore our diverse menu featuring delicious dishes from local favorites
        to international cuisines, all crafted with the finest ingredients.
        Enjoy convenient, quick, and reliable delivery right to your door.
      </p>
      <div>
        <Carousel
          className="explore-menu-list"
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          customTransition="transform 2000ms ease-in-out"
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {menu_list.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt={item.menu_name}
              />
              <p>{item.menu_name}</p>
            </div>
          ))}
        </Carousel>
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
