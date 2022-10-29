import axios from 'axios'

const mealApi = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1/'
})

const getMealCategories = async (setMealCategories) => {
  const response = await mealApi.get('/list.php?c=list');
  let tempDb = [];
  response.data.meals.map(item => {
    tempDb.push(item)
  })
  setMealCategories(tempDb);
}

const getMealItem = async (selectedCategory, setMealItem) => {
  const response = await mealApi.get('filter.php?c=' + selectedCategory);
  let tempDb = [];
  response.data.meals.map(item => {
    tempDb.push(item);
  })

  const offset = 1;
  const limit = 5;

  const db = getPaginatedData(tempDb, offset, limit);
  setMealItem(db);
}

const getMealDetails = async (mealId, setMealDetails) => {
  const response = await mealApi.get('lookup.php?i=' + mealId);
  let tempDb = [];
  response.data.meals.map(item => {
    tempDb.push(item);
  })

  setMealDetails(tempDb);
}

const getPaginatedData = (array, offset, limit) => {
  if(limit < 0) return array.slice(offset);
  return array.slice(offset, offset + limit);
}

export { getMealCategories, getMealItem, getMealDetails } 