import { useEffect, useState } from "react";
import { postData, updateData } from "../api/PostApi";

export const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({ title: "", body: "" });

  let isEmpty = Object.keys(updateDataApi).length === 0;

  useEffect(() => {
    updateDataApi &&
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
    //works same as above code
    // if (updateDataApi) {
    //   setAddData({
    //     title: updateDataApi.title || "",
    //     body: updateDataApi.body || "",
    //   });
    // }
  }, [updateDataApi]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addPostData = async () => {
    const res = await postData(addData);
    console.log(res);

    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({ title: "", body: "" });
    }
  };

  const updatePostData = async () => {
    try {
      const res = await updateData(updateDataApi.id, addData);
      setData((prev) => {
        return prev.map((curElem) => {
          return curElem.id === res.data.id ? res.data : curElem;
        });
      });

      setAddData({ title: "", body: "" });
      setUpdateDataApi({});
    } catch (error) {
      return error;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData(addData);
    } else if (action === "Update") {
      updatePostData();
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="title"></label>
          <input
            type="text"
            name="title"
            autoComplete="off"
            id="title"
            placeholder="Add title"
            value={addData.title}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="body"></label>
          <input
            type="text"
            name="body"
            autoComplete="off"
            id="body"
            placeholder="Add Body"
            value={addData.body}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" value={isEmpty ? "Add" : "Update"}>
          {" "}
          {isEmpty ? "Add" : "Update"}
        </button>
      </form>
    </>
  );
};
