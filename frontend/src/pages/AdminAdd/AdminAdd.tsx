// src/pages/AdminAdd/AdminAdd.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

export default function AdminAdd() {
  const navigate = useNavigate();

  return (
    <main style={{ padding: "1.5rem" }}>
      <h1>Add new menu item</h1>
      <p>This is the add-item page (create form to be implemented).</p>

      {/* Temporär knapp för att gå tillbaka till admin-menu */}
      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <Button
          text="Back to Admin Menu"
          type="button"
          onClick={() => navigate("/admin-menu")}
        />
      </div>
    </main>
  );
}
