import { useEffect, useState } from "react";
import { deletePOST, getPOST } from "../api/PostApi";
import { Form } from "./Form";

export const PostData = () => {
  const [data, setData] = useState([]);
  const [updateDataApi, setUpdateDataApi] = useState({});

  const getPOSTData = async () => {
    const res = await getPOST();
    setData(res.data);
  };

  const handleDeleteButton = async (id) => {
    try {
      const res = await deletePOST(id);
      console.log(res);
      if (res.status === 200) {
        const updatedPost = data.filter((curData) => {
          return curData.id !== id;
        });
        setData(updatedPost);
      } else {
        console.log("Failed to delete " + res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePost = (curData) => setUpdateDataApi(curData);

  useEffect(() => {
    getPOSTData();
  }, []);

  return (
    <>
      <section className="section-form">
        <Form data={data} setData={setData} updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi}/>
      </section>
      <section className="section-post">
        <ol>
          {data.map((curData) => {
            const { id, body, title } = curData;
            return (
              <li key={id}>
                <p>Title: {title}</p>
                <p>Body: {body}</p>
                <button
                  onClick={() => {
                    handleUpdatePost(curData);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteButton(id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
};
