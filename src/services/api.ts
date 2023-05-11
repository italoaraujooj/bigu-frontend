import axios from "axios";

export const api = axios.create({
  url: 'localhost:8000',
  headers: {'Accept': 'application/json'}
});