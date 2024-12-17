import { useEffect, useState } from "react";
import { Product } from "../pages/Products";
import { useNavigate, useParams } from "react-router";

export default function Card(){
    const [product, setProduct]=useState<Product>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer]=useState<string>();
    let { id } = useParams();
    const navigate = useNavigate();

    const fetchProduct=(id:number)=>{
        setLoading(true);
        setError(null);

        fetch(`http://localhost:3000/products/${id}`)
        .then((response) => {
            if (response.status === 404) {
                setErrorServer('A kért erőforrás nem található (404)!');
            }
            if (!response.ok) {
                setErrorServer(`Server responded with status ${response.status}`);
            }
            return response.json()
        })
        .then((data)=>{
            setProduct(data)
            setLoading(false);
        })
        .catch((error)=>{
            setError(error.message);
        })
    }

    useEffect(() => {
        if (id) fetchProduct(parseInt(id));
    }, [id]);

    const handleExit=()=>{
        navigate('/products');
    }

    if (errorServer) {
        return <p>{errorServer}</p>
    }
    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Hiba történt: {error}.</p>
    }

    return<>
        <main className="container p-1 bg-warning text-dark rounded">
            <div className="card shadow-lg border-0">
                <button 
                    className="btn-close position-absolute top-0 end-0 m-2" 
                    onClick={handleExit}>
                </button>
                <div className="card-body">
                    <h1 className="card-title text-center mb-4">{product?.name}</h1>
                    <hr />
                    <p className="fw-bold">Termék ára:</p>
                    <p className="fs-5"><strong>{product?.price}</strong></p>
                    <hr />
                    <p className="fw-bold">Raktáron:</p>
                    <p className="fs-5"><strong>{product?.onStock ? 'Jelenleg raktáron' : 'Jelenleg nincs raktáron.'}</strong></p>
                    <hr />
                    <p className="fw-bold">Kategória</p>
                    <p className="fs-5"><strong>{product?.category}</strong></p>
                    <hr />
                    </div>
                </div>
            </main>
        </>
}