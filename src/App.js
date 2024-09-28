import { useEffect, useState } from "react";
import ProductCard from "./Components/ProductCard";
import useFetch from "./Components/useFetch";

function App() {
  const [products, loading, error] = useFetch();
  const [favourite, setFavourite] = useState([]);

  //loading fav when App comp is created
  useEffect(() => {
    const storedFavourites = JSON.parse(localStorage.getItem("favourites"));
    setFavourite(storedFavourites);
  }, []);

  //handling adding and removing fav

  const handleFavourite = (
    id,
    title,
    image,
    description,
    price,
    isFavourite
  ) => {
    let updatedFavourites;

    if (isFavourite) {
      //adding to fav
      const newFavourite = { id, title, image, description, price }; //new object
      updatedFavourites = [...favourite, newFavourite];
    } else {
      //removing from fav
      updatedFavourites = favourite.filter((fav) => fav.title !== title);
    }

    setFavourite(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  return (
    <div className="App">
      {loading && <p>loading.....</p>}
      {error && <p>Error occured while fetching products.</p>}
      {/* <span>{JSON.stringify(products)}</span> */}
      {/* {console.log(products)} */}

      <h2>All Products</h2>
      {products.map((product) => {
        return (
          <ProductCard
            key={product.id}
            title={product.title}
            image={product.image}
            description={product.description}
            price={product.price}
            isFavourite={favourite.some((fav) => fav.title === product.title)}
            onHandleFavourite={handleFavourite}
          />
        );
      })}

      <h2>My favourites</h2>
      <div>
        {favourite.length > 0 ? (
          favourite.map((favourite) => (
            <ProductCard
              key={favourite.id}
              title={favourite.title}
              image={favourite.image}
              description={favourite.description}
              price={favourite.price}
              isFavourite={true}
              onHandleFavourite={handleFavourite}
            />
          ))
        ) : (
          <p>No current favourites</p>
        )}
      </div>
    </div>
  );
}

export default App;

// id:1,
// title:'...',
// price:'...',
// category:'...',
// description:'...',
// image:'...'
