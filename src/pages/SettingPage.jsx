import { useForm } from "react-hook-form";
import usericon from "/assets/settings/icon.svg";
import styles from "./SettingPage.module.css";
import useAuthentication from "../configuration/useAuthentication";
import toast from "react-hot-toast";
import { logout } from "../configuration/authSlice";
import { useDispatch } from "react-redux";
import { Logout, eye_icon } from "../data/fileImports";
import { useState } from "react";

function SettingPage() {
  const { updateUserDetails } = useAuthentication();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // State for toggling visibility
  const [showEmail, setShowEmail] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const onSubmit = async (data) => {
    const { oldPassword, password, name, email } = data;

    // Check if at least one field is filled
    if (!oldPassword && !password && !name && !email) {
      toast.error("What do you want to update?");
      return;
    }

    // If the new password is entered, the old password must be provided
    if (password && !oldPassword) {
      toast.error("Old password is required to update your password.");
      return;
    }

    // Filter out empty fields
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value)
    );

    // Prepare the data for submission
    updateUserDetails.mutate(filteredData);
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout()); // dispatch logout action
    toast.success("Logged out successfully!");
  };

  return (
    <div
      className={`w-screen h-screen flex flex-col justify-center items-center relative`}
    >
      <div>
        <h1 className={styles.header}>Settings</h1>
      </div>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <div className={`flex flex-col`}>
          <div className={`flex items-center ${styles.input_container}`}>
            <div className={`flex justify-center items-center`}>
              <img src={usericon} alt="User Icon" />
            </div>
            <input type="text" placeholder="Name" {...register("name")} />
          </div>
        </div>
        <div className={`flex flex-col`}>
          <div className={`flex items-center ${styles.input_container}`}>
            <div className={`flex justify-center items-center`}>
              <img src={usericon} alt="User Icon" />
            </div>
            <input
              type={showEmail ? "text" : "email"}
              placeholder="Update Email"
              {...register("email", {
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email is invalid",
                },
              })}
              className={errors.email ? styles.errorInput : ""}
            />
            <img
              src={eye_icon}
              alt="Toggle visibility"
              className={`${styles.eyeIcon} ${showEmail ? styles.eyeVisible : ""}`}
              onClick={() => setShowEmail(!showEmail)} // Toggle email visibility
            />
          </div>
        </div>
        <div className={`flex flex-col`}>
          <div className={`flex items-center ${styles.input_container}`}>
            <div className={`flex justify-center items-center`}>
              <img src={usericon} alt="User Icon" />
            </div>
            <input
              type={showOldPassword ? "text" : "password"}
              placeholder="Old Password"
              {...register("oldPassword", {
                required: {
                  value: false, // Optional but required if changing password
                  message: "Old password is required if updating password",
                },
              })}
              className={errors.oldPassword ? styles.errorInput : ""}
            />
            <img
              src={eye_icon}
              alt="Toggle visibility"
              className={`${styles.eyeIcon} ${showOldPassword ? styles.eyeVisible : ""}`}
              onClick={() => setShowOldPassword(!showOldPassword)} // Toggle password visibility
            />
          </div>
        </div>
        <div className={`flex flex-col`}>
          <div className={`flex items-center ${styles.input_container}`}>
            <div className={`flex justify-center items-center`}>
              <img src={usericon} alt="User Icon" />
            </div>
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              {...register("newPassword")}
            />
            <img
              src={eye_icon}
              alt="Toggle visibility"
              className={`${styles.eyeIcon} ${showNewPassword ? styles.eyeVisible : ""}`}
              onClick={() => setShowNewPassword(!showNewPassword)} 
            />

          </div>
        </div>
        <button type="submit" disabled={isSubmitting} className={styles.button}>
          Update
        </button>
      </form>

      {/* Logout Button at the bottom left */}
      <button
        onClick={handleLogout}
        className={`${styles.logoutButton} absolute bottom-4 left-4 flex items-center gap-2`}
      >
        <img src={Logout} alt="Logout" className={styles.logoutIcon} />
        Log Out
      </button>
    </div>
  );
}

export default SettingPage;
