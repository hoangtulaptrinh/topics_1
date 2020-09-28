const SEVER_URL = "http://localhost:5000";

export const fetchTopics = async (id) => {
  const response = await fetch(
    `${SEVER_URL}/topics/show_all_threads_on_topic/${id}`
  );
  const data = await response.json();

  if (response.status >= 400) {
    if (response.status === 404) throw new Error("không tìm thấy");
    throw new Error("đã xảy ra lỗi");
  }
  return data;
};
