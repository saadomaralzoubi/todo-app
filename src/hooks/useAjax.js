import axios from "axios";

const useAjax = (url) => {
  const _RESTItems = async (method, url, item) => {
    const result = await axios({
      method: method,
      url: url,
      mode: "cors",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      data: item,
    });
    return result.data;
  };

  const _postItem = async (item) => {
    await _RESTItems("post", url, item);
  };

  const _deleteItem = async (item) => {
    let extendedUrl = `${url}/${item._id}`;
    await _RESTItems("delete", extendedUrl, item);
  };

  const _putItem = async (item) => {
    item.complete = !item.complete;
    let extendedUrl = `${url}/${item._id}`;
    await _RESTItems("put", extendedUrl, item);
  };

  const _getItems = async () => {
    return _RESTItems("get", url);
  };

  return [_postItem, _deleteItem, _putItem, _getItems];
};

export default useAjax;
