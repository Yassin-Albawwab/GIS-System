export function reduce_listOfObj_to_simpleList(listOfObj, keyName = "id") {
  return listOfObj.reduce((acc, cur) => {
    acc.push(cur[keyName]);
    return acc;
  }, []);
}
