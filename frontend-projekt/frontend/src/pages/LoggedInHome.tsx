import { useState, useEffect } from 'react';

export interface Product {
    product_id: number;
    category: string;
    name: string;
    price: number;
    onStock: boolean;
}

const LoggedInHome = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCheapestProducts = () => {
        setLoading(true);
        setError(null);

        fetch(`http://localhost:3000/products?limit=6&sort=price_asc`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCheapestProducts();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container mt-5 bg-light p-4">
            <div className="d-flex justify-content-center my-3">
                <a href="/protected" className="btn btn-secondary me-2">
                    Termékek
                </a>
                <a href="/register" className="btn btn-success">
                    Kijelentkezés
                </a>
            </div>
    
            <h1 className="text-center mb-4">Üdvözöllek a webshopban!</h1>
    
            <div className="mb-4">
                <p className="text-justify">
                    Az alábbi szöveg a ChatGPT segítségével került legenerálásra. 
                    Ebbe a kettő paragrafusba lehetne beilleszteni akciókat, 
                    információkat a webshopról, a mögötte álló vállalatról.
                </p>
                <p className="text-justify">
                    Webshopunk mögött egy lelkes, kis csapat áll, 
                    akik számára az a legfontosabb, hogy vásárlóink 
                    elégedettek legyenek. Szeretjük az egyszerűséget 
                    és a megbízhatóságot, ezért minden termékünket gondosan 
                    válogatjuk össze, hogy a legjobb minőséget kínálhassuk elérhető 
                    áron. Hiszünk abban, hogy a vásárlásnak könnyűnek és élvezetesnek 
                    kell lennie, és azon dolgozunk, hogy mindenki megtalálja nálunk azt, 
                    amire szüksége van. Célunk, hogy egy olyan webshopot hozzunk létre, 
                    ahová mindig szívesen térsz vissza!
                </p>
            </div>
    
            <h2 className="text-center mb-4">Íme néhány termék szuper áron!</h2>
    
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {products.map((product) => (
                    <div key={product.product_id} className="col">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">Kategória: {product.category}</p>
                                <p className="card-text">Ár: {product.price} Ft</p>
                                <p className="card-text">Raktáron: {product.onStock ? 'Jelenleg elérhető' : 'Jelenleg nem érhető el.'}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    
            <footer className="text-center mt-4">
                <small>&#169;2024, Bogárdi Benedek, minden jog fenntartva.</small>
            </footer>
        </div>
    );
    
};

export default LoggedInHome;
