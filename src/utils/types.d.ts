export interface User {
  avgScore: number
  email: string
  name: string
  matricula: string
  phoneNumber: string
  sex: string
  userId: string
  profileImage: string
  feedbacks: string[],
  isVerified: boolean
}

export interface OfferRideFormState {
  origin_locale: string;
  destination: string;
  date: string;
  hour: string;
  available_vacancies: number;
  estimated_value: number;
  description: string;
}

type InputType =
  | "text"
  | "email"
  | "password"
  | "tel"
  | "file"
  | "search"
  | "date";
type InputColor = "light" | "extralight";
type InputSize = "sm" | "adjustable";

export interface OfferRideField {
  name: string;
  label: string;
  type: InputType;
  color: InputColor;
  sizing: InputSize;
  placeholder?: string;
  readOnly: boolean;
  mask?: any;
  defaultValue?: any;
}

interface OfferRideFormState {
  origin_locale: string;
  destination: string;
  date: string;
  hours: string;
  available_vacancies: number;
  estimated_value: number;
}

// rides service

interface PlaceBody {
  nickname: string;
  postalCode: string;
  state: string;
  city: string;
  district: string;
  street: string;
  number: string;
  complement: string;
}

export interface OfferRideBody {
  driverId: number;
  goingToCollege: boolean;
  start: PlaceBody;
  destination: PlaceBody;
  dateTime: string;
  numSeats: number;
  price: number;
  toWomen: true;
  carId: number;
  description: string;
}

type DataProps = {
  token: string;
};

export interface SignInResponse {
  data: DataProps;
}

export interface CreateCarFormState {
  brand: string;
  vehicleModel: string;
  modelYear: string;
  avgConsumption: number;
  color: string;
  plate: string;
  type: string;
}

export interface AddressFormState {
  nome: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface Address {
  _id: string;
  addressId: string
  nome: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface ChangePassword {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export interface Ride {
  car: Car,
  dateTime: string
  description: string
  destination: AddressFormState
  driver: User
  goingToCollege: boolean
  id: number
  isOver: boolean
  numSeats: number
  price: Float32Array
  riders: User[]
  start: AddressFormState
  toWomen: boolean
}