import { useState } from "react";
import "./App.css";

function App() {
  const initialFormData = {
    gender: "Female",
    SeniorCitizen: 0,
    Partner: "No",
    Dependents: "No",
    tenure: 2,
    PhoneService: "Yes",
    MultipleLines: "No",
    InternetService: "Fiber optic",
    OnlineSecurity: "No",
    OnlineBackup: "No",
    DeviceProtection: "No",
    TechSupport: "No",
    StreamingTV: "Yes",
    StreamingMovies: "Yes",
    Contract: "Month-to-month",
    PaperlessBilling: "Yes",
    PaymentMethod: "Electronic check",
    MonthlyCharges: 90,
    TotalCharges: 180,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Local backend for now.
  // Later we can set VITE_API_URL when the backend is deployed.
  const API_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          SeniorCitizen: Number(formData.SeniorCitizen),
          tenure: Number(formData.tenure),
          MonthlyCharges: Number(formData.MonthlyCharges),
          TotalCharges: Number(formData.TotalCharges),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      console.log("Prediction:", data);

      setResult(data);
    } catch (err) {
      console.error("Prediction error:", err);

      setError(
        "Unable to connect to the prediction server. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setResult(null);
    setError("");
  };

  return (
    <div className="app">

      {/* Header */}

      <header className="hero">

        <div className="project-badge">
          MACHINE LEARNING PROJECT
        </div>

        <div className="model-status">
          <span className="status-dot"></span>
          Model Online
        </div>

        <h1>Customer Churn Prediction</h1>

        <p>
          Predict the likelihood of a customer leaving your service
          using machine learning.
        </p>

      </header>

      {/* Main */}

      <main className="main-container">

        <section className="card">

          <div className="section-heading">
            <h2>Customer Information</h2>

            <p>
              Enter the customer's details and service information.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Personal Information */}

            <div className="form-section">

              <h3>Personal Information</h3>

              <div className="form-grid">

                <div className="form-group">
                  <label>Gender</label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Senior Citizen</label>

                  <select
                    name="SeniorCitizen"
                    value={formData.SeniorCitizen}
                    onChange={handleChange}
                  >
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Partner</label>

                  <select
                    name="Partner"
                    value={formData.Partner}
                    onChange={handleChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Dependents</label>

                  <select
                    name="Dependents"
                    value={formData.Dependents}
                    onChange={handleChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Tenure (months)</label>

                  <input
                    type="number"
                    name="tenure"
                    min="0"
                    value={formData.tenure}
                    onChange={handleChange}
                  />
                </div>

              </div>

            </div>

            {/* Services */}

            <div className="form-section">

              <h3>Services</h3>

              <div className="form-grid">

                <div className="form-group">
                  <label>Phone Service</label>

                  <select
                    name="PhoneService"
                    value={formData.PhoneService}
                    onChange={handleChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Multiple Lines</label>

                  <select
                    name="MultipleLines"
                    value={formData.MultipleLines}
                    onChange={handleChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No phone service">
                      No phone service
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Internet Service</label>

                  <select
                    name="InternetService"
                    value={formData.InternetService}
                    onChange={handleChange}
                  >
                    <option value="DSL">DSL</option>
                    <option value="Fiber optic">Fiber optic</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Online Security</label>

                  <select
                    name="OnlineSecurity"
                    value={formData.OnlineSecurity}
                    onChange={handleChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No internet service">
                      No internet service
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Online Backup</label>

                  <select
                    name="OnlineBackup"
                    value={formData.OnlineBackup}
                    onChange={handleChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No internet service">
                      No internet service
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Device Protection</label>

                  <select
                    name="DeviceProtection"
                    value={formData.DeviceProtection}
                    onChange={handleChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No internet service">
                      No internet service
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Tech Support</label>

                  <select
                    name="TechSupport"
                    value={formData.TechSupport}
                    onChange={handleChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No internet service">
                      No internet service
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Streaming TV</label>

                  <select
                    name="StreamingTV"
                    value={formData.StreamingTV}
                    onChange={handleChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No internet service">
                      No internet service
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Streaming Movies</label>

                  <select
                    name="StreamingMovies"
                    value={formData.StreamingMovies}
                    onChange={handleChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No internet service">
                      No internet service
                    </option>
                  </select>
                </div>

              </div>

            </div>

            {/* Billing */}

            <div className="form-section">

              <h3>Billing Information</h3>

              <div className="form-grid">

                <div className="form-group">
                  <label>Contract</label>

                  <select
                    name="Contract"
                    value={formData.Contract}
                    onChange={handleChange}
                  >
                    <option value="Month-to-month">
                      Month-to-month
                    </option>

                    <option value="One year">
                      One year
                    </option>

                    <option value="Two year">
                      Two year
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Paperless Billing</label>

                  <select
                    name="PaperlessBilling"
                    value={formData.PaperlessBilling}
                    onChange={handleChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Payment Method</label>

                  <select
                    name="PaymentMethod"
                    value={formData.PaymentMethod}
                    onChange={handleChange}
                  >
                    <option value="Electronic check">
                      Electronic check
                    </option>

                    <option value="Mailed check">
                      Mailed check
                    </option>

                    <option value="Bank transfer (automatic)">
                      Bank transfer (automatic)
                    </option>

                    <option value="Credit card (automatic)">
                      Credit card (automatic)
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Monthly Charges</label>

                  <input
                    type="number"
                    name="MonthlyCharges"
                    min="0"
                    step="0.01"
                    value={formData.MonthlyCharges}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Total Charges</label>

                  <input
                    type="number"
                    name="TotalCharges"
                    min="0"
                    step="0.01"
                    value={formData.TotalCharges}
                    onChange={handleChange}
                  />
                </div>

              </div>

            </div>

            {/* Buttons */}

            <div className="button-container">

              <button
                type="button"
                className="reset-button"
                onClick={handleReset}
              >
                Reset
              </button>

              <button
                type="submit"
                className="predict-button"
                disabled={loading}
              >
                {loading ? "Predicting..." : "Predict Churn"}
              </button>

            </div>

          </form>

        </section>

        {/* Error */}

        {error && (
          <div className="error-card">
            <h3>Connection Error</h3>
            <p>{error}</p>
          </div>
        )}

        {/* Prediction */}

        {result && (
          <section className="result-card">

            <div className="result-header">

              <div>
                <span className="result-label">
                  PREDICTION RESULT
                </span>

                <h2>Customer Churn Analysis</h2>
              </div>

              <span
                className={`risk-badge ${
                  result.risk_level === "High"
                    ? "high"
                    : result.risk_level === "Medium"
                    ? "medium"
                    : "low"
                }`}
              >
                {result.risk_level} Risk
              </span>

            </div>

            <div className="result-content">

              <div className="probability-section">

                <span className="result-label">
                  CHURN PROBABILITY
                </span>

                <div className="probability">
                  {Number(result.churn_probability).toFixed(2)}%
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${Math.min(
                        Number(result.churn_probability),
                        100
                      )}%`,
                    }}
                  ></div>
                </div>

              </div>

              <div className="prediction-box">

                <div className="warning-icon">
                  !
                </div>

                <div>

                  <span className="result-label">
                    MODEL PREDICTION
                  </span>

                  <h3>{result.result}</h3>

                  <p>
                    Based on the customer's current profile
                    and service information.
                  </p>

                </div>

              </div>

            </div>

          </section>
        )}

      </main>

      <footer>
        Customer Churn Prediction • Machine Learning Project
      </footer>

    </div>
  );
}

export default App;