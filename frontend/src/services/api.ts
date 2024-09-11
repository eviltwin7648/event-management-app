import axios from "axios";
interface LoginDataType {
  email: string;
  password: string;
}

// interface CreateEventType {
//   eventTitle: string;
//   description: string;
//   date: string;
//   category: string;
//   price: number;
// }
interface SignUpDataType {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface UpdateUserType {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

const token = localStorage.getItem("token");
const fulltoken = `Bearer ${token}`;
const APIURL = "http://localhost:3000";

export const loginCall = async ({ email, password }: LoginDataType) => {
  const response = await axios.post("http://localhost:3000/user/login", {
    email,
    password,
  });

  localStorage.setItem("token", response.data.token);
};

export const createEventCall = async (formData: FormData) => {
  const response = await axios.post(`${APIURL}/events`, formData, {
    headers: {
      authorization: fulltoken,
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response.data);
  return response.data;
};

export const getAllEvents = async () => {
  const response = await axios.get(`${APIURL}/events`);

  return response.data;
};

export const signUpCall = async ({
  username,
  email,
  password,
  firstName,
  lastName,
}: SignUpDataType) => {
  const response = await axios.post(`${APIURL}/user/register`, {
    username,
    email,
    password,
    firstName,
    lastName,
  });
  localStorage.setItem("token", response.data.token);
  return response;
};

export const updateUserCall = async ({
  username,
  password,
  firstName,
  lastName,
}: UpdateUserType) => {
  const response = await axios.put(
    `${APIURL}/user/edit`,
    {
      username,
      password,
      firstName,
      lastName,
    },
    {
      headers: {
        authorization: fulltoken,
      },
    }
  );
  return response;
};

export const registerEventCall = async (eventId: string) => {
  const response = await axios.post(
    `${APIURL}/events/${eventId}/rsvp`,
    {},
    {
      headers: {
        authorization: fulltoken,
      },
    }
  );
  return response.data;
};

export const unRegisterEventCall = async (eventId: string) => {
  const response = await axios.post(
    `${APIURL}/events/${eventId}/unrsvp`,
    {},
    {
      headers: {
        authorization: fulltoken,
      },
    }
  );
  return response.data;
};

export const getRegisteredEventsCall = async () => {
  const response = await axios.get(`${APIURL}/user/rsvp`, {
    headers: {
      authorization: fulltoken,
    },
  });
  return response.data;
};

export const deleteEventCall = async (eventId: number) => {
  const response = await axios.delete(`${APIURL}/events/${eventId}`, {
    headers: {
      authorization: fulltoken,
    },
  });
  console.log(response);
  return response.data;
};

export const getEventsByUserCall = async () => {
  const response = await axios.get(`${APIURL}/user/alluserevents`, {
    headers: {
      authorization: fulltoken,
    },
  });
  return response.data;
};

export const getEventDetailsCall = async (eventId: string) => {
  console.log(eventId);
  const response = await axios.get(`${APIURL}/events/${eventId}`, {
    headers: {
      authorization: fulltoken,
    },
  });
  console.log("something", response);
  return response.data;
};
