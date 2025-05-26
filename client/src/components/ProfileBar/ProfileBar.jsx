import React from "react";
import "./ProfileBar.css";

const ProfileBar = () => {

  const docente = JSON.parse(localStorage.getItem("usuario"));
  return (
    <div className="profileBarContainer">
      <div id="imageProfileContainer">
        <img
          id="imageProfile"
          src={
            docente?.imagen ||
            "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cc8bb2d6-8a6a-4e7d-b62c-8e88db643e6a/dg0vrzb-7d9a27d6-5b8f-49ee-9feb-f84eb2ca6057.jpg/v1/fill/w_894,h_894,q_70,strp/2d___gorillaz__by_pastalune_dg0vrzb-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTkyMCIsInBhdGgiOiJcL2ZcL2NjOGJiMmQ2LThhNmEtNGU3ZC1iNjJjLThlODhkYjY0M2U2YVwvZGcwdnJ6Yi03ZDlhMjdkNi01YjhmLTQ5ZWUtOWZlYi1mODRlYjJjYTYwNTcuanBnIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.5ZQz-kdyw4e1XNdc-hCqNqtQIx_4MRe1eCE6ipAOsqM"
          }
          alt="Foto Docente"
        />
      </div>
      <div id="profileInfoContainer">
        <h1 id="profileName">
          {docente?.nombre || "Nombre del docente"} {docente?.apellido || "Nombre del docente"}
        </h1>
        <h2 id="infoProfile">
          Institución: {docente?.institucion || "No definida"}
          </h2>
        <p id="rol">
          <strong>Rol:</strong> {docente?.rol || "Docente"}
        </p>
      </div>
    </div>
  );
};

export default ProfileBar;
