export async function getCategory() {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;

  try {
    const response = await fetch(`${apiUrl}/categories`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Ошибка при получении категорий');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMedia() {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;

  try {
    const response = await fetch(`${apiUrl}/param/public_media`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Ошибка при получении медиа');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getBrands() {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;

  try {
    const response = await fetch(`${apiUrl}/products/brands`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Ошибка при получении брендов');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getProducts(params) {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;

  const queryString = new URLSearchParams(params).toString();

  let user = null;
  if (import.meta.client) {
    const userData = localStorage.getItem('user');
    if (userData) {
      user = JSON.parse(userData);
    }
  }

  let url = `${apiUrl}/products?${queryString}`;
  if (user) {
    url = `${apiUrl}/products/private?${queryString}`;
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      params,
    });

    if (!response.ok) {
      throw new Error('Ошибка при получении товаров');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function checkPromoCode(params) {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;
  const queryString = new URLSearchParams(params).toString();
  try {
    const response = await fetch(`${apiUrl}/promocodes?${queryString}`, {
      method: 'GET',
      params,
    });

    if (!response.ok) {
      throw new Error('Ошибка при проверке промокода');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getProduct(params) {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;

  let user = null;
  if (import.meta.client) {
    const userData = localStorage.getItem('user');
    if (userData) {
      user = JSON.parse(userData);
    }
  }

  let url = `${apiUrl}/products/${params}`;
  if (user) {
    url = `${apiUrl}/products/private/${params}`;
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка при получении карточки товара');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getGroupProduct(params) {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;

  try {
    const response = await fetch(`${apiUrl}/products/group/${params}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Ошибка при получении группы');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function authRequest(path, requestData) {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;
  const response = await fetch(`${apiUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData),
    credentials: 'include',
  });

  if (!response.ok) {
    let message = 'Ошибка авторизации';
    try {
      const data = await response.json();
      if (data?.message) message = Array.isArray(data.message) ? data.message.join(', ') : data.message;
    } catch (_) { /* ignore */ }
    throw new Error(message);
  }

  try {
    return await response.json();
  } catch (_) {
    return null;
  }
}

export function register(requestData) {
  return authRequest('/auth/register', requestData);
}

export function login(requestData) {
  return authRequest('/auth/login', requestData);
}

export function forgotPassword(email) {
  return authRequest('/auth/forgot-password', { email });
}

export function resetPassword(requestData) {
  return authRequest('/auth/reset-password', requestData);
}

export async function logOut(requestData) {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;

  try {
    const response = await fetch(`${apiUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.text(); // Используем text() для обработки пустого ответа
      throw new Error(`Ошибка: ${errorData || response.statusText}`);
    }

    // Если сервер возвращает пустое тело при статусе 201
    let responseData;
    if (response.status !== 204) {
      // 204 No Content или любой другой статус, где нет контента
      responseData = await response.json().catch(() => null); // Ловим ошибку, если JSON пустой
    }

    return responseData || {}; // Возвращаем пустой объект, если данных нет
  } catch (error) {
    console.error('Ошибка при логауте:', error.message);
    throw error;
  }
}

export async function getMe() {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;

  try {
    const response = await fetch(`${apiUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка при получении данных');
    }

    const data = await response.json();
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  } catch (error) {
    localStorage.removeItem('user');

    console.error('Ошибка:', error.message);
    throw error;
  }
}

export async function createOrder(requestData) {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;

  try {
    const response = await fetch(`${apiUrl}/orders`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('Ошибка при создании заказа');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка:', error.message);
    throw error;
  }
}

export async function createOrderPublic(requestData) {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;

  try {
    const response = await fetch(`${apiUrl}/orders/public`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('Ошибка при создании заказа');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка:', error.message);
    throw error;
  }
}

export async function getOrders() {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;

  try {
    const response = await fetch(`${apiUrl}/orders`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка получения заказов');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка:', error.message);
    throw error;
  }
}

export async function getRegions() {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;

  try {
    const response = await fetch(`${apiUrl}/cdek/regions`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка при регионов');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка:', error.message);
    throw error;
  }
}

export async function getSdekPoints(params) {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;

  const queryString = new URLSearchParams(params).toString();
  try {
    const response = await fetch(`${apiUrl}/cdek/points/?${queryString}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка при регионов');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка:', error.message);
    throw error;
  }
}

export async function addToFavorites(params) {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;

  try {
    const response = await fetch(`${apiUrl}/favorite-products/${params}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка при выполнении запроса');
    }

    if (response.status === 201) {
      return null;
    }

    const responseText = await response.text();
    if (responseText) {
      return JSON.parse(responseText);
    }

    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteFavorite(id) {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;

  try {
    const response = await fetch(`${apiUrl}/favorite-products/${id}`, {
      method: 'delete',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка при выполнении запроса');
    }

    if (response.status === 201) {
      return null;
    }

    const responseText = await response.text();
    if (responseText) {
      return JSON.parse(responseText);
    }

    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postProductsRequests(requestData) {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;

  try {
    const response = await fetch(`${apiUrl}/product-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('Ошибка при выполнении запроса');
    }

    if (response.status === 201) {
      return null;
    }

    const responseText = await response.text();
    if (responseText) {
      return JSON.parse(responseText);
    }

    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getFavorites(params) {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;

  try {
    const response = await fetch(`${apiUrl}/favorite-products`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка при получении избранных товаров');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
