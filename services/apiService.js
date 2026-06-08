import apiClient from './apiClient';

export const getFilteredPosts = async (filters, options = {}) => {
  const { signal } = options;
  const queryString = new URLSearchParams(filters).toString();
  const token = localStorage.getItem('token');
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASEURL || 'http://localhost:5000';

  const response = await fetch(`${baseUrl}/api/posts/filtered-posts?${queryString}`, {
    signal,
    headers: {
      'Accept': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`HTTP hiba: ${response.status}`);
  }

  return response;
};

// Hasonló posztok lekérdezése
export const getSimilarPosts = async (postId, filters) => {
  try {
    const response = await apiClient.get(`/posts/similar-posts/${postId}`, { params: filters });
    return response.data;
  } catch (error) {
    console.error('[getSimilarPosts] Hiba a hasonló posztok lekérdezésekor:', error);
    throw error.response?.data || error;
  }
};

export const deleteAllUserPosts = async (targetUserId = null) => {
  try {
    const params = targetUserId ? { targetUserId } : {};
    const response = await apiClient.delete('/posts/delete-all-user-posts', {
      params,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('[deleteAllUserPosts] Hiba az összes felhasználói poszt törlésekor:', error);
    throw error.response?.data || error;
  }
};


// Összes poszt lekérdezése paginációval
export const getPosts = async (page = 1, limit = 10) => {
  try {
    const response = await apiClient.get('/posts/all-posts', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error('[getPosts] Hiba a posztok lekérdezésekor:', error);
    throw error.response?.data || error;
  }
};

export const getUserPosts = async (userId, params = {}) => {
  try {
    const response = await apiClient.get(`/posts/user-posts`, {
      params: {
        userId,
        ...params,  // ← ez a kulcs: most átveszi a page, limit, search stb.
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('[getUserPosts] Hiba a felhasználói posztok lekérdezésekor:', error);
    throw error.response?.data || error;
  }
};

// Új poszt létrehozása
export const createPost = async (postData) => {
  try {
    const response = await apiClient.post('/posts/create-post', postData);
    return response.data;
  } catch (error) {
    console.error('[createPost] Hiba a poszt létrehozásakor:', error);
    throw error.response?.data || error;
  }
};

// Egyedi poszt részleteinek lekérdezése
export const getPostDetails = async (postId) => {
  try {
    const response = await apiClient.get('/posts/single-post', {
      params: { _id: postId },
    });
    return response.data;
  } catch (error) {
    console.error('[getPostDetails] Hiba a poszt részleteinek lekérdezésekor:', error);
    throw error.response?.data || error;
  }
};


// Képek feltöltése egy poszthoz
export const uploadImages = async (formData, postId) => {
  try {
    const response = await apiClient.post(`/posts/upload/${postId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('[uploadImages] Képfeltöltési válasz:', response.data);
    return response.data;
  } catch (error) {
    console.error('[uploadImages] Hiba a képek feltöltésekor:', error);
    throw error.response?.data || error;
  }
};

// Poszt frissítése
export const updatePost = async (postId, data) => {
  try {
    const response = await apiClient.put(`/posts/update-post/${postId}`, data);
    return response.data;
  } catch (error) {
    console.error('[updatePost] Hiba a poszt frissítésekor:', error);
    throw error.response?.data || error;
  }
};

// Poszt törlése
export const deletePost = async (postId) => {
  try {
    const response = await apiClient.delete('/posts/delete-post', {
      params: { _id: postId },
    });
    return response.data;
  } catch (error) {
    console.error('[deletePost] Hiba a poszt törlésekor:', error);
    throw error.response?.data || error;
  }
};


// Hiányzó helyszínek lekérdezése
export const getMissingLocations = async () => {
  try {
    const response = await apiClient.get('/posts/missing-locations');
    return response.data;
  } catch (error) {
    console.error('[getMissingLocations] Hiba a hiányzó helyszínek lekérdezésekor:', error);
    throw error.response?.data || error;
  }
};

// Új város vagy régió hozzáadása
export const addCityRegion = async (data) => {
  try {
    const response = await apiClient.post('/posts/add-city-region', data);
    return response.data;
  } catch (error) {
    console.error('[addCityRegion] Hiba a város/régió hozzáadásakor:', error);
    throw error.response?.data || error;
  }
};

export const getPostGeometry = async (postId) => {
  try {
    const response = await apiClient.get('/posts/post-geometry', {
      params: { _id: postId },
    });
    return response.data;
  } catch (error) {
    console.error('[getPostGeometry] Hiba a poszt geometriájának lekérdezésekor:', error);
    throw error.response?.data || error;
  }
};

export const getFilteredPostsList = async (filters, page = 1, limit = 30) => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (typeof value === 'object') {
        params.append(key, JSON.stringify(value));
      } else {
        params.append(key, value);
      }
    }
  });
  
  params.append('page', page);
  params.append('limit', limit);
  
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASEURL || 'http://localhost:5000';
  
  const response = await fetch(
    `${baseUrl}/api/posts/filtered-posts-list?${params.toString()}`,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  );
  
  if (!response.ok) {
    throw new Error('Hiba a hirdetések lekérésekor');
  }
  
  return response.json();
};

export const analyzePropertyAI = async (postId, question, questionKey, email = null, mode = 'preview') => {
  console.log(`[Frontend] AI hívás → mode: ${mode}, email: ${email ? 'van' : 'nincs'}, questionKey: ${questionKey}`);

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASEURL || 'http://localhost:5000';

  const response = await fetch(`${baseUrl}/api/guest/ai/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      postId, 
      question, 
      questionKey, 
      email,
      mode 
    }),
  });

  if (!response.ok) {
    console.error('[Frontend] AI hívás hiba:', response.status);
    throw new Error('AI hiba');
  }

  const data = await response.json();
  console.log(`[Frontend] AI válasz érkezett: mode=${data.mode}`);
  return data;
};