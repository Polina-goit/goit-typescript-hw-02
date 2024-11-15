import axios from "axios";

axios.defaults.baseURL = `https://api.unsplash.com/`;
const ACCESS_KEY = `1j16Qjo5CtBlfheaBKbM_Z47872PP1E4JxFfF2UMXgo`;

export const getImages = async (searchImg, pageNumber) => {
    const params = {
        query: searchImg,
        page: pageNumber,
        per_page: 10,
        client_id: ACCESS_KEY,
    }
    
        const respons = await axios.get(`search/photos/?${new URLSearchParams(params).toString()}`);
        return respons.data;
    
   
}