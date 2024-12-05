import axios from 'axios';


type FormValues = {
    name: string,
    description: string,
    price: number,
}

export const getBooks = () => axios.get('https://supabase-puce.vercel.app/books')
    .then((response) => {
        return response?.data?.data
    })
    .catch((error) => {
        return error

    })

