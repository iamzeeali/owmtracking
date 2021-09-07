import * as types from "../_actions/types";

const initialState = {
  grn: null,
  grns: [],
  received: [],
  mrTransit: [],
  ddTransit: [],
  transDate: "",
  transDateForDirect: "",
  transDateForReceive: "",
  error: {},
  filtered: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_GRN:
      return {
        ...state,
        grn: payload,
        loading: false,
      };
    case types.GET_GRNS:
      return {
        ...state,
        grns: payload,
        loading: false,
      };
    case types.GET_FOR_RECEIVE:
      return {
        ...state,
        received: payload,
        loading: false,
        transDateForReceive: payload.data.data[0].transDate,
      };
    case types.GET_FOR_MR_TRANSIT:
      return {
        ...state,
        mrTransit: payload,
        transDate: payload.data.data[0].transDate,
        loading: false,
      };
    case types.GET_FOR_DD_TRANSIT:
      return {
        ...state,
        ddTransit: payload,
        transDateForDirect: payload.data.data[0].transDate.toString(),

        loading: false,
      };
    case types.ADD_GRN:
      return {
        ...state,
        grn: payload,
        loading: false,
      };
    case types.SET_CURRENT_GRN:
      return {
        ...state,
        grn: action.payload,
      };
    case types.CLEAR_GRN:
      return {
        ...state,
        grn: null,
        loading: false,
      };

    case types.FILTER_GRN:
      return {
        ...state,
        filtered: state.grns.data.data.filter((grn) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            grn.ecciNumber.match(regex) ||
            grn.vendorCode.match(regex) ||
            grn.vendorName.match(regex) ||
            grn.transactionType.match(regex) ||
            grn.modeOfDelivery.match(regex) ||
            grn.inDate.match(regex) ||
            grn.transDate.match(regex)
          );
        }),
      };
    case types.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case types.DELETE_GRN:
      return {
        ...state,
        grns: state.grns.filter((grn) => grn._id !== action.payload),
        loading: false,
      };
    case types.GRN_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
