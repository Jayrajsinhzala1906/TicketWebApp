import { http } from "../config/http";

export const getAllTicket = async (skip, name, order) => {
  try {
    const orderBy = order === "asc" ? 1 : -1;

    return await http.get(
      `/ticket/all/?skip=${skip}&name=${name}&order=${orderBy}`
    );
  } catch (err) {
    return err;
  }
};

export const getSearchTicket = async (input) => {
  try {
    return await http.get(`/ticket/search/?input=${input}`);
  } catch (err) {
    return err;
  }
};

export const getTicketById = async (id) => {
  try {
    return await http.get(`ticket/${id}`);
  } catch (err) {
    return err;
  }
};

export const deleteTicketById = async (id) => {
  try {
    return await http.delete(`/ticket/${id}`);
  } catch (err) {
    return err;
  }
};

export const addTicket = async (values) => {
  try {
    return await http.post("ticket/add", values);
  } catch (err) {
    return err;
  }
};

export const updateTicket = async (editId, values) => {
  try {
    return await http.put(`ticket/${editId}`, values);
  } catch (err) {
    return err;
  }
};
