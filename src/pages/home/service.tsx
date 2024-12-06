export const handlePost = (values: any) => {
  const tempArr = JSON.parse(localStorage.getItem("users") as any) || [];
  const randomID = Math.round(Math.random() * 100000);
  tempArr.push({ ...values, id: randomID });
  localStorage.setItem("users", JSON.stringify(tempArr));

  // service: api/users
  // method: POST
  // payload: values
};

export const handleGetAllUser = () => {
  const tempArr = JSON.parse(localStorage.getItem("users") as any) || [];

  return tempArr;

  // service: api/users
  // method: GET
};

export const handleDelete = (ID: number) => {
  const tempArr = JSON.parse(localStorage.getItem("users") as any) || [];
  const userArr=tempArr.filter((obj: any, index: number) => obj.id !== ID);

  localStorage.setItem("users", JSON.stringify(userArr));

  // service: api/users/:id
  // method: DELETE
};

export const handleUpdate = (values: any) => {
  const tempArr = JSON.parse(localStorage.getItem("users") as any) || [];

  tempArr.map((obj: any, index: number) => {
    if (obj.id === values.id) {
      console.log(values);
      tempArr[index] = {
        ...values,
      };
    }
  });
  localStorage.setItem("users", JSON.stringify(tempArr));

  // service: api/users/:id
  // method: PUT
  // payload: values
};
