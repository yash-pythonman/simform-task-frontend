import { useEffect, useState } from "react";
import ApiHandler from "../helpers/ApiHandler";
import { Button } from "react-bootstrap";

const FamilyDetail = ({ id }) => {
  const token = sessionStorage.getItem("token");
  const [familyDetail, setFamilyDetail] = useState([]);
  const [tempData, setTempData] = useState([]);
  const cenetCss = {
    marginLeft: "25%",
    marginRight: " 25%",
    width: "50%",
    marginTop: "12.5%",
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await ApiHandler(`person/${id}/`, "get", {}, token);
      if (response && response.status === 200 && response.data) {
        setFamilyDetail(response.data);
      }
    };

    fetch();
  }, []);

  const filterData = (id) => {
    for (let i = 0; i < familyDetail.length; i++) {
      if (familyDetail[i].id == id) {
        setTempData(familyDetail[i]);
      } else {
        continue;
      }
    }
  };

  const handelOnClick = (e) => {
    let value = "";
    
    value = tempData[e.target.value];
    
    let x = `NO ${e.target.value} found for the user.`;
    if (Array.isArray(value)) {
      x = value.map((v, i) => {
        return v.first_name + "<br/>";
      });
    } else if (value) {
      x = value.first_name;
    }
    document.getElementById("demo").innerHTML = x;
  };

  return (
    <div style={cenetCss}>
      <select
        className="form-control"
        onChange={(e) => {
          filterData(e.target.value);
        }}
      >
        <option selected disabled>
          {" "}
          --select person--
        </option>{" "}
        {familyDetail.map((v, i) => {
          return (
            <option key={v.id} value={v.id}>
              {v.first_name}
            </option>
          );
        })}
      </select>
      <br />
      <Button onClick={handelOnClick} className="m-3" value="children">
        {" "}
        Children{" "}
      </Button>
      <Button className="btn-success m-3" onClick={handelOnClick} value="parent">
        {" "}
        Parent{" "}
      </Button>
      <Button className="btn-info m-3" onClick={handelOnClick} value="grand_father">
        {" "}
        Grand Parents{" "}
      </Button>
      <Button className="btn-danger m-3" onClick={handelOnClick} value="sibling">
        {" "}
        Siblings{" "}
      </Button>
      <Button className="btn-warning m-3" onClick={handelOnClick} value="cousins">
        {" "}
        Cousins{" "}
      </Button>
      <div id="demo"> </div>
    </div>
  );
};

export default FamilyDetail;
