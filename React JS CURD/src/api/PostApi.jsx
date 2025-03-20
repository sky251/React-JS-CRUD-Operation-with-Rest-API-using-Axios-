import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

//Get Method
export const getPOST = () => {
  return api.get("/posts");
};


// Delet Method 
export const deletePOST = (id)=>{
  return api.delete(`/posts/${id}`)
}

// Post Method
export const postData = (post)=>{
  return api.post("/posts",post)
}

// Put Method
export const updateData = (id,post)=>{
  return api.put(`/posts/${id}`,post)
}