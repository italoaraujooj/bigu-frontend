import { timeMask } from "./masks";
import { OfferRideField, } from "./types";

const fieldsFirstRow: OfferRideField[] = [
  {
    name:"origin_locale",
    label: "LOCAL DE ORIGEM",
    type: "text",
    color: "extralight",
    sizing: "adjustable",
    placeholder: "CATOLÉ",
    readOnly: false
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
    readOnly: false
  },
  {
    name:"hours",
    label: "HORÁRIO DA SAÍDA",
    type: "text",
    color: "extralight",
    sizing: "adjustable",
    placeholder: "6:30",
    readOnly: false,
    mask: timeMask
  }
]

const checkboxesOptions = [
  {
    id: 1,
    label: "estou indo para a universidade",
    value: "going",
    checked: true,
  },
  {
    id: 2,
    label: "estou saindo da universidade",
    value: "leaving",
    checked: false,
  },
]

export { fieldsFirstRow, fieldsLastRow, checkboxesOptions };