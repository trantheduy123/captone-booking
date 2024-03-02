import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";

const FacebookCallback = () => {
  const location = useLocation();
  const navigate = useHistory();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");

    if (code) {
      fetch(`http://localhost:8080/api/facebook?code=${code}`, {
        method: "POST",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.accessToken) {
            navigate.push("/");
          } else {
            /* navigate('/login'); */
          }
        })
        .catch((error) => {
          console.error("Error during authentication:", error);
          navigate.push("/error");
        });
    } else {
      console.error("No authorization code found");
      navigate.push("/error");
    }
  }, [location, navigate]);

  return (
    <div>
      <p>Processing Facebook authentication...</p>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FacebookCallback);
