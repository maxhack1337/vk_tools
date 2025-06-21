/*
 * Если будешь постить обновления в группу ВК - пиши мне, я буду менять
 */

const getUpdateUrl = async () => {
  try {
    const response = await fetch("https://vkenhancer.ru/api/latest_wall.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.wall;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export default getUpdateUrl;
