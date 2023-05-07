export interface OfferRideFormState {
  origin_locale: string;
  destination: string;
  date: string;
  hour: string;
  available_vacancies: number;
  estimated_value: number;
}

type InputType = "text" | "email" | "password" | "tel" | "file" | "search" | "date";
type InputColor = "light" | "extralight";
type InputSize = "sm" | "adjustable";

export interface OfferRideField {
  name: string;
  label: string;
  type: InputType;
  color: InputColor;
  sizing: InputSize;
  placeholder: string;
  readOnly: boolean
}

interface OfferRideFormState {
  origin_locale: string;
  destination: string;
  date: string;
  hour: string;
  available_vacancies: number;
  estimated_value: number;
}
