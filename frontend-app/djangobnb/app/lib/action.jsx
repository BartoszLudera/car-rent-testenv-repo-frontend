"use server";

import { cookies } from "next/headers";
import apiService from "../services/apiServices";

export async function getSessionToken() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("session_token");
  if(sessionToken){
    return sessionToken.value;
  }
  else{
    return ''
  }
}

export async function getUsernameToken() {
  const cookieStore = cookies();
  const usernameToken = cookieStore.get("session_userid");
  if(usernameToken){
    return usernameToken.value;
  }
  else{
    return ''
  }
}

export async function handleLogin(username, password) {
  const setCookies = (username, accessToken) => {
    cookies().set("session_userid", username, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24* 7, 
      path: "/",
    });

    cookies().set("session_token", accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60* 24* 7,
      path: "/",
    });
  };

  const formatData = {
    username: username,
    password: password,
  };

  try {
    const response = await apiService.postWithoutToken(
      "http://127.0.0.1:8000/account_api/login/",
      JSON.stringify(formatData)
    );

    if (response.status == 200) {
      setCookies(username, response.data.token);
      return true;
    } else {
      console.log("login faild");
      return false;
    }
  } catch (error) {
    console.error("Signup failed:", error);
  }
}

export async function login_check() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("session_token");

  if (sessionToken) {
    return true;
  } else {
    console.log("token not found");
    return false;
  }
}

export async function get_username() {
  const cookieStore = cookies();
  const session_userid = cookieStore.get("session_userid");
  if (session_userid) {
    return session_userid.value;
  } else {
    return '';
  }
}

export async function logout() {
  try {
    const response = await apiService.post(
      "http://127.0.0.1:8000/account_api/logout/",
      null
    );

    if (response.status === 200) {
      cookies().delete("session_token");
      cookies().delete("session_userid");
      console.log("Logout complete");
    }
  } catch (error) {
    console.error("An error occurred during logout." + error.message);
  }
}


export async function get_categories(){
  try {
    const response = await apiService.get(
      "http://127.0.0.1:8000/api/categories/"
    );

    if (response.status === 200) {
      const names = response.data.map(category => category.name);
      return names;
    }
  } catch (error) {
    console.error("An error occurred during fetching categories data." + error.message);
  }
}

export async function get_brands(){
  try {
    const response = await apiService.get(
      "http://127.0.0.1:8000/api/brands/"
    );

    if (response.status === 200) {
      const names = response.data.map(brand => brand.name);
      return names;
    }
  } catch (error) {
    console.error("An error occurred during fetching brands data." + error.message);
  }
}

export async function get_enginetypes(){
  try {
    const response = await apiService.get(
      "http://127.0.0.1:8000/api/enginetypes/"
    );

    if (response.status === 200) {
      const names = response.data.map(engine => engine.name);
      return names;
    }
  } catch (error) {
    console.error("An error occurred during fetching engines data." + error.message);
  }
}


export async function get_drivetypes(){
  try {
    const response = await apiService.get(
      "http://127.0.0.1:8000/api/drivetypes/"
    );

    if (response.status === 200) {
      const names = response.data.map(drive => drive.name);
      return names;
    }
  } catch (error) {
    console.error("An error occurred during fetching drive data." + error.message);
  }
}


export async function get_userdetails(username){
  try {
    const response = await apiService.get(
      `http://127.0.0.1:8000/account_api/user/${username}/`
    );
      return response.data;
  } catch (error) {
    console.error("Error submitting the form:", error);
  }
}