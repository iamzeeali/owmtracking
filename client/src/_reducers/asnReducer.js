import * as types from "../_actions/types";

const initialState = {
  asn: null,
  asns: [],
  error: {},
  filtered: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_ASN:
      return {
        ...state,
        asn: payload,
        loading: false,
      };
    case types.GET_ASNS:
      return {
        ...state,
        asns: payload,
        loading: false,
      };
    case types.ADD_ASN:
      return {
        ...state,
        asn: payload,
        loading: false,
      };
    case types.SET_CURRENT_ASN:
      return {
        ...state,
        asn: action.payload,
      };
    case types.CLEAR_ASN:
      return {
        ...state,
        asn: null,
        loading: false,
      };

    //     case types.FILTER_ASN:
    //       return {
    //         ...state,
    //         filtered: state.asns.filter((asn) => {
    //           const regex = new RegExp(`${action.payload}`, "gi");
    //           return (
    //             asn.cCode.match(regex) ||
    //             asn.name.match(regex) ||
    //             asn.email.match(regex) ||
    //             asn.contactPerson.match(regex) ||
    //             asn.address.match(regex) ||
    //             asn.type.match(regex)
    //           );
    //         }),
    //       };
    case types.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case types.DELETE_ASN:
      return {
        ...state,
        asns: state.asns.filter((asn) => asn._id !== action.payload),
        loading: false,
      };
    case types.ASN_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
