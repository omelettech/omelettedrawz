import './SmartForm.css';
import React, { useState } from "react";

const SmartForm = () => {
  const [formData, setFormData] = useState({
    text: '',
    password: '',
    email: '',
    number: '',
    checkbox: false,
    radio: '',
    select: '',
    textarea: '',
    file: null,
    range: 50,
    color: '#ff0000',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <div className="form-container">
      <h2>Form with All Input Types</h2>
      <form onSubmit={handleSubmit}>

        {/* Text input */}
        <label>
          Text Input:
          <input type="text" name="text" value={formData.text} onChange={handleChange} placeholder={"asdf"}/>
        </label>

        {/* Password input */}
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>

        {/* Email input */}
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>

        {/* Number input */}
        <label>
          Number:
          <input type="number" name="number" value={formData.number} onChange={handleChange} />
        </label>

        {/* Checkbox */}
        <label>
          Checkbox:
          <input type="checkbox" name="checkbox" checked={formData.checkbox} onChange={handleChange} />
        </label>

        {/* Radio buttons */}
        <fieldset>
          <legend>Radio Group:</legend>
          <label>
            <input type="radio" name="radio" value="Option 1" checked={formData.radio === "Option 1"} onChange={handleChange} />
            Option 1
          </label>
          <label>
            <input type="radio" name="radio" value="Option 2" checked={formData.radio === "Option 2"} onChange={handleChange} />
            Option 2
          </label>
        </fieldset>

        {/* Select input */}
        <label>
          Select:
          <select name="select" value={formData.select} onChange={handleChange}>
            <option value="">Choose an option</option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
          </select>
        </label>

        {/* Textarea */}
        <label>
          Textarea:
          <textarea name="textarea" value={formData.textarea} onChange={handleChange} />
        </label>

        {/* File input */}
        <label>
          File:
          <input type="file" name="file" onChange={handleChange} />
        </label>

        {/* Range input */}
        <label>
          Range:
          <input type="range" name="range" value={formData.range} onChange={handleChange} min="0" max="100" />
        </label>

        {/* Color input */}
        <label>
          Color:
          <input type="color" name="color" value={formData.color} onChange={handleChange} />
        </label>

        {/* Date input */}
        <label>
          Date:
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
        </label>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SmartForm;
