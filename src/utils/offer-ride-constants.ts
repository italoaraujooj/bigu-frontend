import { OfferRideField, } from "./types";

const fieldsFirstRow: OfferRideField[] = [
  {
    name:"origin_locale",
    label: "LOCAL DE ORIGEM",
    type: "text",
    color: "extralight",
    sizing: "adjustable",
    placeholder: "CATOLÉ",
    readOnly: true
  },
  {
    name:"destination",
    label: "LOCAL DE DESTINO",
    type: "text",
    color: "extralight",
    sizing: "adjustable",
    placeholder: "UNIVERSIDADE FEDERAL DE CAMPINA GRANDE",
    readOnly: true
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
    readOnly: true
  },
  {
    name:"hours",
    label: "HORÁRIO DA SAÍDA",
    type: "text",
    color: "extralight",
    sizing: "adjustable",
    placeholder: "6:30",
    readOnly: true
  }
]

export { fieldsFirstRow, fieldsLastRow };