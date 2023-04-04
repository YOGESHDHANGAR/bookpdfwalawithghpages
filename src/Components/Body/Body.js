import React, { useEffect } from "react";
import "./Body.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllBookpdfAction } from "../../redux/actions/bookpdfAction";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, getallbookpdf } = useSelector(
    (state) => state.getallbookpdf
  );

  useEffect(() => {
    dispatch(getAllBookpdfAction());
  }, [dispatch]);

  return (
    <div className="cards_container">
      {loading === false &&
        getallbookpdf.map((elem, index) => (
          <div
            key={index}
            className="card"
            onClick={() => {
              navigate(`/bookpdfdetails/${elem._id}`);
            }}
          >
            <img src={elem.image} />
            <h2 className="name">{elem.name}</h2>
            <h2 className="price">Price: ₹{elem.price}</h2>
            <p className="decription">
              If you create a folder names images and put an image named
              mypic.jpg into it, then you can reference its path like
            </p>
          </div>
        ))}
    </div>
  );
};

export default Body;
