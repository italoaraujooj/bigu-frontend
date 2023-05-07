import { OfferRideField, } from "./types";

const fieldsFirstRow: OfferRideField[] = [
  {
    name:"origin_locale",
    label: "LOCAL DE ORIGEM",
    type: "text",
    color: "extralight",
    sizing: "adjustable",
    placeholder: "CATOLÉ",
  },
  {
    name:"destination",
    label: "LOCAL DE DESTINO",
    type: "text",
    color: "extralight",
    sizing: "adjustable",
    placeholder: "UNIVERSIDADE FEDERAL DE CAMPINA GRANDE",
  },
]

const fieldsLastRow: OfferRideField[] = [
  {
    name:"date",
    label: "DATA DA CARONA",
    type: "date",
    color: "extralight",
    sizing: "adjustable",
    placeholder: "",
  },
  {
    name:"hours",
    label: "HORÁRIO DA SAÍDA",
    type: "text",
    color: "extralight",
    sizing: "adjustable",
    placeholder: "6:30",
  }
]

export { fieldsFirstRow, fieldsLastRow };