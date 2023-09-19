import axios from 'axios';
const URI = "url"
export async function addPost(data){
    try{
        console.log("In axios"+data);
        const res = await axios.post(`${URI}add`,data);
        console.log("OUt of axios"+data);
        return res.data;

    }catch(err){
        
        console.log("error from get addPost " + err)
        console.log(`${URI}add`);
        return [];

    }
}