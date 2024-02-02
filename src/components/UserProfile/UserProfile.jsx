import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import UserProfileProfile from "./UserProfileProfile/UserProfileProfile";
import UserProfileAddress from "./UserProfileAdress/UserProfileAddress";
import UserProfileOrders from "./UserProfileOrders/UserProfileOrders";
import styles from "./UserProfile.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getUserInfo } from "../../redux/actions/actions";

const options = {
  profile: {
    title: "Perfil",
    component: UserProfileProfile,
  },
  address: {
    title: "Dirección",
    component: UserProfileAddress,
  },
  orders: {
    title: "Mis compras",
    component: UserProfileOrders,
  },
};

const UserProfile = () => {
  const [searchParams] = useSearchParams();
  const user = useSelector((state) => state.user);

  const [activeOption, setActiveOption] = useState(
    mapQueryToTab(searchParams.get("tab"))
  );

  function isLoading() {
    return user == null;
  }

  function mapQueryToTab(tab) {
    return Object.keys(options).find((o) => o === tab) ?? "profile";
  }

  function selectedComponent() {
    const SelectedComponent = options[activeOption].component;
    return <SelectedComponent />;
  }

  return (
    <div>
      <Navbar />
      {isLoading() ? (
        <Loading />
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.leftContent}>
            <div className={styles.menu}>
              <p>Hola,</p>

              <h2>
                {user.name} {user.lastName}!
              </h2>
              <hr />

              <ul className="nav flex-column">
                {Object.keys(options).map((optionId) => {
                  const option = options[optionId];
                  return (
                    <li key={optionId} className="nav-item">
                      <a
                        className={`nav-link ${
                          activeOption === optionId ? "active" : styles.active
                        }`}
                        aria-current="page"
                        href="#"
                        onClick={() => setActiveOption(optionId)}
                      >
                        {option.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <hr />
            </div>
          </div>
          <div className={styles.rightContent}>{selectedComponent()}</div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default UserProfile;
