export interface OfferRideFormState {
  origin_locale: string;
  destination: string;
  date: string;
  hour: string;
  available_vacancies: number;
  estimated_value: number;
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
  placeholder: string;
  readOnly: boolean;
  mask?: any;
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
  model: string;
  modelYear: string;
  color: string;
  plate: string;
}

export interface AddressFormState {
  nickname: string;
  postalCode: string;
  state: string;
  city: string;
  district: string;
  street: string;
  number: string;
  complement: string;
}

export interface ChangePassword {
  actualPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}
