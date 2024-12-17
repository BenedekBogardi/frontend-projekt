import { useState, useEffect } from 'react';

export interface Product {
    product_id: number;
    category: string;
    name: string;
    price: number;
    onStock: boolean;
}

const Protected = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [productsPerPage, setProductsPerPage] = useState(5);
    const [isOnStockChecked, setIsOnStockChecked] = useState(false);


    const fetchProducts = (page: number) => {
        setLoading(true);
        setError(null);

        fetch(`http://localhost:3000/products?page=${page}&limit=${productsPerPage}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data.data);
                setCurrentPage(data.currentPage);
                setTotalPages(data.totalPages);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        const isOnStockChecked = event.target.type === 'checkbox' ? event.target.checked : null;//nem tudtam működésbe hozni, így ez alapján nem lehet keresni.

        if (isOnStockChecked !== null) {
            const filtered = products.filter((product) => product.onStock === isOnStockChecked);
            setProducts(filtered);
        } else if (term) {
            const filtered = products.filter((product) => {
                const priceStr = product.price ? product.price.toString() : '';
                return (
                    product.category.toLowerCase().includes(term) ||
                    product.name.toLowerCase().includes(term) ||
                    priceStr.includes(term)
                );
            });
            setProducts(filtered);
        } else {
            fetchProducts(currentPage);
        }
    };


    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleProductsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLimit = parseInt(event.target.value);
        setProductsPerPage(newLimit);
        fetchProducts(1);
    };

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage, productsPerPage]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container mt-5">
            <a href="/logout">Kijelentkezés</a>&nbsp;&nbsp;
            <a href="/products">Vissza a főoldalra</a>&nbsp;&nbsp;
            <a href="/profil">Saját profil</a>
            <h1 className="text-center mb-4">Terméklista</h1>
            <form className="mb-4">
                <label>
                    Keresés:<br />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="form-control"
                        placeholder="Kategória, név vagy ár alapján..   ."
                    /><br /><br />
                </label>
            </form>
            <select
                value={productsPerPage}
                onChange={handleProductsPerPageChange}
                className="form-select mb-4"
            >
                <option value={5}>5 termék oldalanként</option>
                <option value={10}>10 termék oldalanként</option>
                <option value={15}>15 termék oldalanként</option>
                <option value={20}>20 termék oldalanként</option>
            </select>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {products.map((product) => (
                    <div key={product.product_id} className="col">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">Kategória: {product.category}</p>
                                <p className="card-text">Ár: {product.price} Ft</p>
                                <p className="card-text">Raktáron: {product.onStock ? 'Igen' : 'Nem'}</p>
                                {product.onStock? <button>Vásárlás</button> : 'Sajnos a termék jelenleg nem áll rendelkezésre.'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="d-flex justify-content-between mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn btn-secondary"
                >
                    Előző
                </button>
                <span>
                    Oldal {currentPage} / {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn btn-secondary"
                >
                    Következő
                </button>
            </div>
        </div>

    );
};

export default Protected;
