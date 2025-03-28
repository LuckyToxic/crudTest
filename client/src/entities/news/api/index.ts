import { createAsyncThunk } from "@reduxjs/toolkit";
import { News, NewsWithoutId } from "../model";

enum NEWS_THUNK_TYPES {
    GET_NEWS  = 'news/getAll',
    ADD_NEWS = 'news/add',
    UPDATE_NEWS = 'news/update',
    DELETE_NEWS = 'news/delete',
}

const loadFromLocalStorage = (): News[] => {
    const data = localStorage.getItem("news");
    return data ? JSON.parse(data) : []; 
}


const saveToLocalStorage = (news:News[])=> {
    localStorage.setItem('news',JSON.stringify(news))
}

export const getAllNewsThunk = createAsyncThunk<News[],void,{rejectValue: string}>(NEWS_THUNK_TYPES.GET_NEWS,async(_,{rejectWithValue})=>{
    try {
      return loadFromLocalStorage()
    } catch {
        return rejectWithValue('Failed to load news')
    }
})

export const addNewsThunk = createAsyncThunk<News,NewsWithoutId,{rejectValue:string}>(NEWS_THUNK_TYPES.ADD_NEWS,async(newsItem,{rejectWithValue})=>{
    try {
        const news = loadFromLocalStorage()
        const newItem = {...newsItem,id:Date.now().toString(),date: new Date().toISOString()}
        const updateNews = [...news,newItem]
        saveToLocalStorage(updateNews)
        return newItem
    } catch {
        return rejectWithValue('Failed to add news')
    }
})

export const updateNewsThunk = createAsyncThunk<News,News,{rejectValue:string}>(NEWS_THUNK_TYPES.UPDATE_NEWS,async(updateItem,{rejectWithValue})=>{
    try {
        const news = loadFromLocalStorage()
        const updatedNews = news.map((item) =>
          item.id === updateItem.id ? updateItem : item
        );
        saveToLocalStorage(updatedNews);
        return updateItem
    } catch {
        return rejectWithValue("Failed to update news");
    }
})

export const deleteNewsThunk = createAsyncThunk<string,string,{rejectValue:{id:string,error:string}}>(NEWS_THUNK_TYPES.DELETE_NEWS,async(id,{rejectWithValue})=>{
    try {
        const news = loadFromLocalStorage()
        const updatedNews = news.filter(item => item.id !== id)
        saveToLocalStorage(updatedNews)
        return id
    } catch {
      return rejectWithValue({ id, error: "Failed to delete news" });
    }
})