import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Alert from '../alert';

export default function Products(props) {
  const cookies = Cookies.get()
  const SellerId = cookies.SellerId
  const [ProductList, setProductList] = useState();
  const [formVisibility, setFormVisibility] = useState(false);
  const [ShowProductImage, setShowProductImage] = useState(false);
  const [errorMsg, setErrorMsg] = useState()
  const [showAlert, setShowAlert] = useState();
  const [productData, setProductData] = useState({
    productPhoto: null,
    productName: '',
    productDescription: '',
    productPrice: '',
    productCategory: props.categories.length > 0 ? props.categories[0].id : '',
  });

  useEffect(() => {
    const ProductIds = props.SellerInfo.products
    const GetProducts = async () => {
      const response = await axios.get(`http://localhost:3000/get-listed-products`, {
        params: {
          productIds: ProductIds,
        },
      });

      if (response.data.success) {
        setProductList(response.data.data)
      }

    }

    GetProducts()
  }, [showAlert])

  const handleChange = (e) => {
    const { id, files, value } = e.target;

    if (id === 'productPhoto') {
      const fileList = Array.from(files);

      previewProductPhotos(fileList);

      setProductData((prevData) => ({
        ...prevData,
        productPhoto: [...(prevData.productPhoto || []), ...fileList],
      }));
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const previewProductPhotos = (files) => {
    setShowProductImage(true)
    files.forEach((file) => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const img = document.createElement('img');
          img.src = reader.result;
          img.className = 'mt-2 img-thumbnail';
          img.alt = 'Product Preview';
          img.style.maxWidth = '200px';
          document.getElementById('productPhotoPreview').appendChild(img);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productName', productData.productName);
    formData.append('productDescription', productData.productDescription);
    formData.append('productPrice', productData.productPrice);
    formData.append('productCategory', productData.productCategory);
    formData.append('SellerId', SellerId);

    if (productData.productPhoto) {
      for (let i = 0; i < productData.productPhoto.length; i++) {
        formData.append('productPhoto', productData.productPhoto[i]);
      }
    }

    try {
      const response = await axios.post('http://localhost:3000/add-product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setShowAlert(true);
        setErrorMsg(response.data.message);
        setFormVisibility(false)
        setShowProductImage(false)
      }
    } catch (error) {
      console.error('Error while submitting:', error);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const RemoveProductFromList = async (ProductId)=> {
    
    const response = await axios.post('http://localhost:3000/remove-product-from-list', {ProductId, SellerId}, {
      headers: {'Content-Type': 'application/json'}
    })

    console.log(response)
    if(response.data.success){
      setShowAlert(true);
      setErrorMsg(response.data.msg);
    }
  }

  return (
    <>
      {ProductList && (
        <>
          {showAlert && (
            <Alert
              message={errorMsg}
              type="danger"
              onClose={handleAlertClose}
            />
          )}
          <div className='col-md-10 py-5 controller d-flex flex-column'>
            <div className='Addproduct'>
              <h3 className='text-end m-0'>
                Add Product
                <i
                  className='bi mx-3 bi-plus-square text-black'
                  onClick={() => {
                    setFormVisibility(true);
                  }}
                ></i>
              </h3>
            </div>

            {formVisibility && (
              <div className='col-md-10 mx-auto mt-4'>
                <form onSubmit={handleSubmit} encType="multipart/form-data">

                  <div className='mb-3'>
                    <label htmlFor='productPhoto' className='form-label fw-bold fs-5'>
                      Product Photo
                    </label>
                    <div className='input-group'>
                      <input
                        type='file'
                        className='form-control visually-hidden'
                        id='productPhoto'
                        onChange={handleChange}
                        accept='image/jpeg, image/png'
                        multiple
                        required
                      />
                      <label
                        className='input-group-text btn btn-secondary'
                        htmlFor='productPhoto'
                      >
                        <i className='bi bi-cloud-upload'></i> Upload Photo
                        <p className='m-0 fs-6'>( first image is the <br /> front image)</p>
                      </label>
                    </div>

                    {ShowProductImage && (
                      <div
                        id='productPhotoPreview'
                        className='mt-2 img-thumbnail'
                        alt='Product Preview'
                      ></div>
                    )}

                  </div>


                  {/* Product Name */}
                  <div className='mb-3'>
                    <label htmlFor='productName' className='form-label'>
                      Product Name
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='productName'
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Product Description */}
                  <div className='mb-3'>
                    <label htmlFor='productDescription' className='form-label'>
                      Product Description
                    </label>
                    <textarea
                      className='form-control'
                      id='productDescription'
                      rows='3'
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  {/* Product Price */}
                  <div className='mb-3'>
                    <label htmlFor='productPrice' className='form-label'>
                      Product Price
                    </label>
                    <input
                      type='number'
                      className='form-control'
                      id='productPrice'
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Product Category */}
                  <div className='mb-3'>
                    <label htmlFor='productCategory' className='form-label'>
                      Product Category
                    </label>
                    <select
                      className='form-select'
                      id='productCategory'
                      onChange={handleChange}
                      required
                    >
                      {props.categories.map((value) => (
                        <option key={value.id} value={value.id}>
                          {value.name.replace(/^\w/, (c) => c.toUpperCase())}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button type='submit' className='btn btn-primary'>
                    Add Product
                  </button>
                </form>
              </div>
            )}

            <div className='col-md-12 my-5 products d-flex flex-column align-items-center justify-content-center '>
              {ProductList.map((value, index) => {
                return (

                  <div key={value.name} id={value.id} className={`col-10 product cart-product-box ${value.name} p-3 my-3`}>
                    <div className='d-flex flex-row'>
                      <div className='img-box mx-1'>
                        <img src={value.images[0]} style={{ width: 200 }} />
                        <h3 className="cart-product-price text-center my-2">₹{value.price}</h3>
                      </div>
                      <div className='product-info mx-5 my-5'>
                        <h2 className="cart-product-title">{value.name}</h2>
                        <p className="cart-product-description">{value.description}</p>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end align-items-center mt-3">
                      <button type="button" className="btn btn-danger mx-2 fw-bold" >Edit</button>
                      <button type="button" className="btn btn-danger fw-bold" onClick={() => { RemoveProductFromList(value.id)}}>Delete</button>
                    </div>
                  </div>

                )
              })}
            </div>
          </div>
        </>
      )}
    </>
  );

};


