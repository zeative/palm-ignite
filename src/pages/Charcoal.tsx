import { Outlet } from "react-router-dom";

export default function Product() {
  return (
    <div>
      <h1>Product Page</h1>

      {/* detail product tampil di sini */}
      <Outlet />
    </div>
  );
}
