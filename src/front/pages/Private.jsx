import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getInvoices } from "../fetch";

export const Private = () => {
  const { store } = useGlobalReducer();
  const [invoices, setInvoices] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!store.isLoggedIn) return;
    
    const token = sessionStorage.getItem("token");
    if (!token) return;

    getInvoices(token)
      .then(data => {
        setInvoices(data.invoices);
      })
      .catch(err => {
        setError(err.message);
      });
  }, [store.isLoggedIn]);

  if (!store.isLoggedIn) {
    return (
      <div className="text-center mt-auto">
        You are not logged in. Please Log in!
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-auto">
        Error: {error}
      </div>
    );
  }

  if (!invoices) {
    return (
      <div className="text-center mt-auto">
        Loading your invoices…
      </div>
    );
  }

  return (
    <div className="text-center mt-auto">
      <h2>Your Invoices</h2>
      {invoices.map((inv, index) => (
        <div key={index} className="my-2">
          <div>Date: {inv.invoice_date}</div>
          <div>Amount: ${inv.invoice_amount}</div>
          <div>Number: {inv.invoice_number}</div>
        </div>
      ))}
    </div>
  );
};