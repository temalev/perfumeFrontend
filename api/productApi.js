export async function getCategory() {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;

  console.log(config);

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

  console.log(config);

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

  console.log(config);

  const queryString = new URLSearchParams(params).toString();

  try {
    const response = await fetch(`${apiUrl}/products?${queryString}`, {
      method: 'GET',
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

  try {
    const response = await fetch(`${apiUrl}/products/${params}`, {
      method: 'GET',
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

export async function getCodeFromSms(requestData) {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;

  try {
    const response = await fetch(`${apiUrl}/auth/code/sms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Указываем, что данные в формате JSON
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('Ошибка при получении кода');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCodeFromCall(requestData) {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;

  try {
    const response = await fetch(`${apiUrl}/auth/code/call`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Указываем, что данные в формате JSON
      },
      body: JSON.stringify(requestData), // Преобразуем объект data в строку JSON
    });

    if (response.status === 401) {
      // Если сервер вернул статус 401 (Unauthorized), выбрасываем свою ошибку
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    if (!response.ok) {
      throw new Error('Ошибка при получении кода');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function login(requestData) {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;

  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Ошибка авторизации');
    }

    const data = await response.json();

    if (data.accessToken) {
      const cookie = useCookie('accessToken');
      cookie.value = data.accessToken;

      return data;
    } else {
      throw new Error('Токен доступа не найден в ответе');
    }
  } catch (error) {
    console.error('Ошибка:', error.message);
    throw error;
  }
}

export async function getMe() {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;

  const cookie = useCookie('accessToken');
  const token = cookie.value;
  try {
    const response = await fetch(`${apiUrl}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка при получении данных');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка:', error.message);
    throw error;
  }
}

export async function createOrder(requestData) {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;

  const cookie = useCookie('accessToken');
  const token = cookie.value;
  try {
    const response = await fetch(`${apiUrl}/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
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

  const cookie = useCookie('accessToken');
  const token = cookie.value;
  try {
    const response = await fetch(`${apiUrl}/orders/public`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
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

  const cookie = useCookie('accessToken');
  const token = cookie.value;
  try {
    const response = await fetch(`${apiUrl}/orders`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
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

  const cookie = useCookie('accessToken');
  const token = cookie.value;
  try {
    const response = await fetch(`${apiUrl}/cdek/regions`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
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

  const cookie = useCookie('accessToken');
  const token = cookie.value;
  const queryString = new URLSearchParams(params).toString();
  try {
    const response = await fetch(`${apiUrl}/cdek/points/?${queryString}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
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
  const cookie = useCookie('accessToken');
  const token = cookie.value;

  try {
    const response = await fetch(`${apiUrl}/favorite-products/${params}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
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

export async function getFavorites(params) {
  const config = useRuntimeConfig();
  const apiUrl = config.public.URL;
  const cookie = useCookie('accessToken');
  const token = cookie.value;

  try {
    const response = await fetch(`${apiUrl}/favorite-products`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
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
