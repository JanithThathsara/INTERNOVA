import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JobApplication.css";

const API_ROOT = "http://localhost:5000";

export default function JobApplication() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    birth: "",
    education: "",
    jobCategory: "",
    experiences: "",
    years: "",
    certifications: [],
    cv: null,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      if (name === "certifications") {
        setFormData((p) => ({ ...p, certifications: Array.from(files) }));
      } else {
        setFormData((p) => ({ ...p, [name]: files[0] }));
      }
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  // Validation for each step
  const validateStep = () => {
    const newErrors = {};
    const nameRegex = /^[A-Z][a-zA-Z]*$/;
    const phoneRegex = /^[0-9]{10}$/; // exactly 10 digits

    if (step === 1) {
      if (!formData.firstName.trim())
        newErrors.firstName = "First name is required";
      else if (!nameRegex.test(formData.firstName))
        newErrors.firstName =
          "First letter must be capital and only letters allowed";

      if (!formData.lastName.trim())
        newErrors.lastName = "Last name is required";
      else if (!nameRegex.test(formData.lastName))
        newErrors.lastName =
          "First letter must be capital and only letters allowed";

      if (!formData.phone.trim()) newErrors.phone = "Phone is required";
      else if (!phoneRegex.test(formData.phone))
        newErrors.phone = "Phone must be exactly 10 digits";

      if (!formData.email.trim()) newErrors.email = "Email is required";

      if (!formData.birth.trim()) newErrors.birth = "Date of Birth is required";

      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.gender.trim()) newErrors.gender = "Gender is required";
    }

    if (step === 2) {
      if (formData.years && parseInt(formData.years, 10) < 0) {
        newErrors.years = "Years of experience cannot be negative";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setSubmitting(true);

    try {
      const fd = new FormData();
      const fields = [
        "firstName",
        "lastName",
        "gender",
        "address",
        "city",
        "phone",
        "email",
        "birth",
        "education",
        "jobCategory",
        "experiences",
        "years",
      ];
      fields.forEach((f) => fd.append(f, formData[f] ?? ""));

      if (formData.cv) fd.append("cv", formData.cv);
      if (formData.certifications && formData.certifications.length) {
        formData.certifications.forEach((file) =>
          fd.append("certifications", file)
        );
      }

      const res = await fetch(`${API_ROOT}/api/applications`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create");
      }

      navigate("/applications");
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to submit application. See console.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="jobapp-page">
      <div className="multi-form-container">
        <h2>Job Application Form</h2>
        <form onSubmit={handleSubmit}>
          {/* STEP 1: Personal & Contact */}
          {step === 1 && (
            <>
              <label>First Name</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <div className="error">{errors.firstName}</div>
              )}

              <label>Last Name</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <div className="error">{errors.lastName}</div>
              )}

              <label>Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <div className="error">{errors.phone}</div>}

              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">-- Select Gender --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <div className="error">{errors.gender}</div>}

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="error">{errors.email}</div>}

              <label>Address</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <div className="error">{errors.address}</div>}

              <label>City</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <div className="error">{errors.city}</div>}

              <label>Date of Birth</label>
              <input
                type="date"
                name="birth"
                value={formData.birth}
                onChange={handleChange}
              />
              {errors.birth && <div className="error">{errors.birth}</div>}

              <div className="form-buttons">
                <button type="button" onClick={nextStep}>
                  Next
                </button>
              </div>
            </>
          )}

          {/* STEP 2: Professional Info */}
          {step === 2 && (
            <>
              <label>Education Qualifications</label>
              <input
                name="education"
                value={formData.education}
                onChange={handleChange}
              />

              <label>Job is Looking For</label>
              <select
                name="joblookingfor"
                value={formData.joblookingfor}
                onChange={handleChange}
              >
                <option value="">-- Select Category --</option>
                <option value="Graduate Student">Graduate Student</option>
                <option value="Undergraduate Student">Undergraduate Student</option>
              </select>

              <label>Previous Job Experiences</label>
              <textarea
                name="experiences"
                value={formData.experiences}
                onChange={handleChange}
                rows="3"
              />

              <label>Years of Experience</label>
              <input
                type="number"
                name="years"
                value={formData.years}
                onChange={handleChange}
                min="0"
              />
              {errors.years && <div className="error">{errors.years}</div>}

              <div className="form-buttons">
                <button type="button" onClick={prevStep}>
                  Previous
                </button>
                <button type="button" onClick={nextStep}>
                  Next
                </button>
              </div>
            </>
          )}

          {/* STEP 3: Uploads */}
          {step === 3 && (
            <>
              <label>Upload Certifications</label>
              <input
                type="file"
                name="certifications"
                onChange={handleChange}
                accept=".pdf,.jpg,.png"
                multiple
              />

              <label>Upload CV</label>
              <input
                type="file"
                name="cv"
                onChange={handleChange}
                accept=".pdf,.doc,.docx"
              />

              <div className="form-buttons">
                <button type="button" onClick={prevStep}>
                  Previous
                </button>
                <button type="submit" disabled={submitting}>
                  {submitting ? "Submitting…" : "Submit Application"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
