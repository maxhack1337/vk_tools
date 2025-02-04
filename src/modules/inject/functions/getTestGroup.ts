const getTestGroup = async () => {
    const response = await fetch('https://vkenhancer.ru/api/testGroup.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.id;
}

export default getTestGroup;