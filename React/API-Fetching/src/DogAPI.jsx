import { useEffect, useState } from 'react'
import axios from 'axios'

const DogAPI = () => {
    const [breeds, setBreeds] = useState([]);
    const [images, setImages] = useState({});
    const [search, setSearch] = useState("");

    useEffect(() => {
        breeds.map((breed) => {
            return getImages(breed.id, breed.reference_image_id);
        });
    }, [breeds]);

    const fetchData = async () => {
        const response = await axios.get('https://api.thedogapi.com/v1/breeds?limit=100&page=0');
        console.log(response.data);
        setBreeds(response.data);
    }

    const searchByBreed = async () => {
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${search}`);
        console.log(response.data);
        setBreeds(response.data);
    }

    const getImages = async (breedId, imageId) => {
        const response = await axios.get(`https://api.thedogapi.com/v1/images/${imageId}`);
        console.log(response.data);
        const url = response.data.url;
        setImages((prev) => {
            return { ...prev, [breedId]: url };
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        searchByBreed();
        setSearch("");
    }

    return (
        <div>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button onClick={(e) => handleSubmit(e)}>Search</button>
            <button onClick={() => fetchData()}>Get Data</button>
            {breeds && breeds.map((breed) => {
                return <div key={breed.id}>
                    <h1>{breed.name}</h1>
                    <img
                        src={images[breed.id]}
                        style={{
                            display: 'block',
                            marginTop: '10px',
                            borderRadius: '12px',
                            width: '250px',
                            height: 'auto',
                        }}
                    />
                    <p>{breed.breed_for}</p>
                    <p>{breed.breed_group}</p>
                    <p>{breed.life_span}</p>
                    <p>{breed.origin}</p>
                    <p>{breed.temperament}</p>
                    <p>{breed.height.metric}</p>
                    <p>{breed.weight.metric}</p>
                </div>
            })}
        </div>
    )
}

export default DogAPI