import { useState } from 'react'
import axios from 'axios'

const DogAPI = () => {
    const [breeds, setbreeds] = useState([]);
    const [images, setImages] = useState({});

    const fetchData = async () => {
        const response = await axios.get('https://api.thedogapi.com/v1/breeds');
        console.log(response.data);
        setbreeds(response.data);
    }

    const getImage = async (breedId, imageUrl) => {
        const response = await axios.get(`https://api.thedogapi.com/v1/images/${imageUrl}`);
        console.log(response.data);
        const url = response.data.url;
        setImages((prev) => ({
            ...prev, [breedId]: url
        }));
    }

    const showImages = async () => {
        console.log(images);
    }

    return (
        <div>
            <button onClick={() => fetchData()}>Get Data</button>
            <button onClick={showImages}>Click</button>

            {breeds && breeds.map((breed) => {
                return <div key={breed.id}>
                    <h1>{breed.name}</h1>
                    <button onClick={() => getImage(breed.id, breed.reference_image_id)}>
                        Show Dog Image
                    </button>
                    {images[breed.id] && (
                        <img src={images[breed.id]} alt={breed.name} width="250"
                            style={{ display: 'block', marginTop: '10px', borderRadius: '6px' }}
                        />
                    )}
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