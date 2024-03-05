import { toast } from "react-toastify";
import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserServicer,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctor,
  getAllSpecialty,
  getAllClinic,
} from "../../services/userService";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailded());
      }
    } catch (e) {
      dispatch(fetchGenderFailded());
      console.log("fetchGenderStart error", e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailded = () => ({
  type: actionTypes.FETCH_GENDER_FAILDED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailded());
      }
    } catch (e) {
      dispatch(fetchPositionFailded());
      console.log("fetchPositionStart error", e);
    }
  };
};

export const fetchPositionSuccess = (PositonData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: PositonData,
});

export const fetchPositionFailded = () => ({
  type: actionTypes.FETCH_POSITION_FAILDE,
});

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailded = () => ({
  type: actionTypes.FETCH_ROLE_FAILDE,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailded());
        toast.error("Failed to fetch roles");
      }
    } catch (e) {
      dispatch(fetchRoleFailded());
      console.log("fetchRoleStart error", e);
      toast.error("An error occurred while fetching roles");
    }
  };
};

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserServicer(data);

      if (res && res.errCode === 0) {
        toast.success("Create a new User succeed");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUserStart());
        console.log(res);
      } else {
        dispatch(saveUserFailed());
        toast.error("Failed to create a new User");
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log("saveUserFailed", e);
      toast.error("An error occurred while creating a new User");
    }
  };
};

export const deleteAllUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      console.log(res);

      if (res && res.success === true) {
        toast.success("User deleted successfully");
        dispatch(deleteUsersSuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(deleteUsersFailed());
        toast.error("Failed to delete the user");
        console.log(res.errMessage); // Log the error message if available
      }
    } catch (e) {
      dispatch(deleteUsersFailed());
      toast.error("An error occurred while deleting the user");
      console.error(e); // Log the error object for debugging
    }
  };
};

export const deleteUsersSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUsersFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("All");

      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUsersFailded());
      }
    } catch (e) {
      dispatch(fetchAllUsersFailded());
      console.log("fetchRoleStart error", e);
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});

export const fetchAllUsersFailded = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILDE,
});

export const editAllUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      console.log(res);

      if (res && res.errCode === 0) {
        toast.success("Update the user successfully");
        dispatch(editUsersSuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(editUsersFailed());
        toast.error("Failed to update the user");
      }
    } catch (e) {
      dispatch(editUsersFailed());
      toast.error("An error occurred while updating the user");
      console.error(e); // Log the error object for debugging
    }
  };
};

export const editUsersSuccess = (data) => ({
  type: actionTypes.EDIT_USER_SUCCESS,
  users: data,
});

export const editUsersFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      console.log("Error:", e);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
      });
    }
  };
};

export const fetchAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          dataDr: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      console.log("Error:", e);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
      });
    }
  };
};

export const fetchAllClinics = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllClinic();

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
          dataDr: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_CLINIC_FAILED,
        });
      }
    } catch (e) {
      console.log("Error:", e);
      dispatch({
        type: actionTypes.FETCH_ALL_CLINIC_FAILED,
      });
    }
  };
};

export const saveDetailDoctorAct = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctor(data);

      if (res && res.errCode === 0) {
        toast.success("Save Infor Detail Doctor succeed");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
          dataClinics: res.data,
        });
      } else {
        console.log("err res", res);
        toast.error("Failed to save the user");

        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      toast.error("Failed to save the user");
      console.log("Error:", e);
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
      });
    }
  };
};

export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (e) {
      console.log("Error:", e);
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
      });
    }
  };
};

export const getRequiredDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START,
      });
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resSpecialty = await getAllSpecialty();
      let resClinic = await getAllClinic();

      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0 &&
        resClinic &&
        resClinic.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data,
        };

        dispatch(fetchRequiredDoctorInforSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorFailded());
      }
    } catch (e) {
      dispatch(fetchRequiredDoctorFailded());
      console.log("fetchGenderStart error", e);
    }
  };
};

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
  data: allRequiredData,
});

export const fetchRequiredDoctorFailded = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILDED,
});
