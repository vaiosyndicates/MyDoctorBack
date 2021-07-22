export const parseArray = listObj => {
  const data = [];
  Object.keys(listObj).map(key => {
    data.push({
      id: key,
      data: listObj[key],
    });
  });
  return data;
}