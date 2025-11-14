import { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"

export const Private = () => {
    const { store } = useGlobalReducer()
    const [invoices, setInvoices] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [message, setMessage] = useState("")

    useEffect(() => {
        if (store.isLoginSuccessful && store.token) {
            fetchInvoices()
        }
    }, [store.isLoginSuccessful, store.token])

    const fetchInvoices = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/invoices`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${store.token}`
                }
            })
            
            if (!response.ok) {
                throw new Error("Failed to fetch invoices")
            }
            
            const data = await response.json()
            setInvoices(data.invoices || [])
            setMessage(data.message || "")
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (!store.isLoginSuccessful) {
        return (
            <div className="text-center mt-5">
                <h3>You are not logged in. Please Log in!</h3>
            </div>
        )
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Your Invoices</h2>
            
            {loading && (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            
            {error && (
                <div className="alert alert-danger" role="alert">
                    Error: {error}
                </div>
            )}
            
            {!loading && !error && message && (
                <div className={`alert ${invoices.length === 0 ? 'alert-info' : 'alert-success'}`}>
                    {message}
                </div>
            )}
            
            {!loading && !error && invoices.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Invoice #</th>
                                <th>Date</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map(invoice => (
                                <tr key={invoice.id}>
                                    <td>{invoice.invoice_number}</td>
                                    <td>{new Date(invoice.invoice_date).toLocaleDateString()}</td>
                                    <td>${parseFloat(invoice.invoice_amount).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-3 p-3 bg-light rounded">
                        <strong>Total Amount: </strong>
                        ${invoices.reduce((sum, inv) => sum + parseFloat(inv.invoice_amount), 0).toFixed(2)}
                    </div>
                </div>
            )}
        </div>
    )
}