import React, { useState, useEffect } from 'react';
import '../App.css';

function ListingTool() {
  // Load saved lists from localStorage on initial render
  const [lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem('listingLists');
    return savedLists ? JSON.parse(savedLists) : [{
      id: 1,
      name: 'My List',
      items: []
    }];
  });

  const [currentListId, setCurrentListId] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [selectedMeasurement, setSelectedMeasurement] = useState('kg');
  const [measurementQuantity, setMeasurementQuantity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('grocery');
  const [showAddOptionModal, setShowAddOptionModal] = useState(false);
  const [newOptionValue, setNewOptionValue] = useState('');
  const [newOptionCategory, setNewOptionCategory] = useState('grocery');
  const [showNewListModal, setShowNewListModal] = useState(false);
  const [newListName, setNewListName] = useState('');

  // Load saved options from localStorage on initial render
  const [itemOptions, setItemOptions] = useState(() => {
    const savedOptions = localStorage.getItem('listingOptions');
    return savedOptions ? JSON.parse(savedOptions) : {
      grocery: [
        'Rice', 'Wheat', 'Sugar', 'Salt', 'Oil', 'Milk', 'Eggs', 'Bread',
        'Butter', 'Cheese', 'Yogurt', 'Fruits', 'Vegetables', 'Tea', 'Coffee'
      ],
      painting: [
        'Paint Brushes', 'Paint Rollers', 'Paint Trays', 'Drop Cloths',
        'Paint Scrapers', 'Paint Thinner', 'Primer', 'Wall Paint',
        'Ceiling Paint', 'Trim Paint', 'Paint Tape', 'Paint Stirrers'
      ],
      pulses: [
        'Red Lentils', 'Green Lentils', 'Yellow Lentils', 'Chickpeas',
        'Black Beans', 'Kidney Beans', 'Mung Beans', 'Split Peas',
        'Black Eyed Peas', 'Pigeon Peas', 'Soybeans', 'Fava Beans'
      ]
    };
  });

  // Save lists to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('listingLists', JSON.stringify(lists));
  }, [lists]);

  // Save options to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('listingOptions', JSON.stringify(itemOptions));
  }, [itemOptions]);

  const currentList = lists.find(list => list.id === currentListId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '' && measurementQuantity.trim() !== '') {
      setLists(lists.map(list => {
        if (list.id === currentListId) {
          return {
            ...list,
            items: [...list.items, {
              name: inputValue,
              measurement: selectedMeasurement,
              quantity: parseFloat(measurementQuantity),
              category: selectedCategory
            }]
          };
        }
        return list;
      }));
      setInputValue('');
      setMeasurementQuantity('');
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setInputValue('');
  };

  const handleAddOption = (e) => {
    e.preventDefault();
    if (newOptionValue.trim() !== '') {
      setItemOptions(prev => ({
        ...prev,
        [newOptionCategory]: [...prev[newOptionCategory], newOptionValue]
      }));
      setNewOptionValue('');
      setShowAddOptionModal(false);
    }
  };

  const handleMeasurementChange = (e) => {
    setSelectedMeasurement(e.target.value);
    setMeasurementQuantity('');
  };

  const handleDeleteItem = (index) => {
    setLists(lists.map(list => {
      if (list.id === currentListId) {
        return {
          ...list,
          items: list.items.filter((_, i) => i !== index)
        };
      }
      return list;
    }));
  };

  const handleCreateNewList = (e) => {
    e.preventDefault();
    if (newListName.trim() !== '') {
      const newList = {
        id: Math.max(...lists.map(l => l.id)) + 1,
        name: newListName,
        items: []
      };
      setLists([...lists, newList]);
      setCurrentListId(newList.id);
      setNewListName('');
      setShowNewListModal(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Listing Tool</h1>
        <div className="header-buttons">
          <button 
            className="new-list-button"
            onClick={() => setShowNewListModal(true)}
          >
            New List
          </button>
          <button 
            className="add-option-button"
            onClick={() => setShowAddOptionModal(true)}
          >
            Add New Option
          </button>
        </div>
      </div>

      {showNewListModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create New List</h2>
            <form onSubmit={handleCreateNewList}>
              <input
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="Enter list name"
                className="input-field"
              />
              <div className="modal-buttons">
                <button type="submit" className="submit-button">Create List</button>
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setShowNewListModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddOptionModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Option</h2>
            <form onSubmit={handleAddOption}>
              <select
                value={newOptionCategory}
                onChange={(e) => setNewOptionCategory(e.target.value)}
                className="category-dropdown"
              >
                <option value="grocery">Grocery</option>
                <option value="painting">Painting</option>
                <option value="pulses">Pulses</option>
              </select>
              <input
                type="text"
                value={newOptionValue}
                onChange={(e) => setNewOptionValue(e.target.value)}
                placeholder="Enter new item name"
                className="input-field"
              />
              <div className="modal-buttons">
                <button type="submit" className="submit-button">Add Option</button>
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setShowAddOptionModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="lists-selector">
        {lists.map(list => (
          <button
            key={list.id}
            className={`list-button ${list.id === currentListId ? 'active' : ''}`}
            onClick={() => setCurrentListId(list.id)}
          >
            {list.name}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <div className="category-select">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="category-dropdown"
          >
            <option value="grocery">Grocery</option>
            <option value="painting">Painting</option>
            <option value="pulses">Pulses</option>
          </select>
        </div>
        <div className="input-group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter item name"
            className="input-field"
            list={`${selectedCategory}-items`}
          />
          <datalist id="grocery-items">
            {itemOptions.grocery.map((item, index) => (
              <option key={index} value={item} />
            ))}
          </datalist>
          <datalist id="painting-items">
            {itemOptions.painting.map((item, index) => (
              <option key={index} value={item} />
            ))}
          </datalist>
          <datalist id="pulses-items">
            {itemOptions.pulses.map((item, index) => (
              <option key={index} value={item} />
            ))}
          </datalist>
        </div>
        <div className="measurement-group">
          <input
            type="number"
            value={measurementQuantity}
            onChange={(e) => setMeasurementQuantity(e.target.value)}
            placeholder="Quantity"
            className="quantity-input"
            min="0"
            step="0.01"
          />
          <select
            value={selectedMeasurement}
            onChange={handleMeasurementChange}
            className="measurement-select"
          >
            <option value="kg">Kilograms (kg)</option>
            <option value="g">Grams (g)</option>
            <option value="l">Liters (L)</option>
            <option value="ml">Milliliters (ml)</option>
            <option value="pcs">Pieces (pcs)</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Add Item</button>
      </form>

      <div className="items-list">
        <h2>{currentList.name}</h2>
        {currentList.items.map((item, index) => (
          <div key={index} className="item">
            <div className="item-details">
              <span className="item-name">{item.name}</span>
              <span className="item-category">{item.category}</span>
            </div>
            <div className="item-measurement">
              <span className="quantity">{item.quantity}</span>
              <span className="unit">{item.measurement}</span>
              <button 
                className="delete-button"
                onClick={() => handleDeleteItem(index)}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListingTool; 